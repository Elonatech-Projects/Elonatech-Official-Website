import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Pagination from './../../../components/Pagination/Pagination'
import './shop.css'
import { BASEURL } from '../../../BaseURL/BaseURL'
import Loading from '../../../components/Loading/Loading'
import axios from 'axios'
import {
  LazyLoadImage,
  trackWindowScroll
} from 'react-lazy-load-image-component'
import { useCart } from 'react-use-cart'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Helmet } from 'react-helmet-async'
import 'rc-slider/assets/index.css'
import ShopFilter from './shopFilter'
import { startTransition } from 'react'
import Slider from '@mui/material/Slider'

const Shop = () => {
  const [filteredProducts, setFilteredProducts] = useState([])
  const [data, setData] = useState([])
  const [records, setRecords] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(12)
  const [pageNumberLimit, setpageNumberLimit] = useState(4)
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(4)
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0)
  const [activeItem, setActiveItem] = useState('Item 1')
  const [noResultsMessage, setNoResultsMessage] = useState(false)
  const [isFiltering, setIsFiltering] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()

  const handleClick = item => {
    setActiveItem(item)
  }

  const formatPrice = price => {
    return price.toLocaleString()
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get(`${BASEURL}/api/v1/product/filter/all`)
        const products = response.data.data.reverse()
        console.log(products)
        setData(products)
        setRecords(products)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1', 10)
    setCurrentPage(page)
  }, [searchParams])

  useEffect(() => {
    if (filteredProducts.length > 0) {
      setRecords(filteredProducts)
      setNoResultsMessage(false)
      console.log(filteredProducts)
    } else if (filteredProducts.length === 0 && isFiltering) {
      setRecords([])
      setNoResultsMessage(true)
    } else {
      setRecords(data)
      setNoResultsMessage(false)
    }
  }, [filteredProducts, isFiltering, data])

  const Filter = event => {
    const searchTerm = event.target.value.toLowerCase()

    if (searchTerm === '') {
      setFilteredProducts([])
      setIsFiltering(false)
      setNoResultsMessage(false)
    } else {
      const filtered = data.filter(product =>
        product.name.toLowerCase().includes(searchTerm)
      )

      setFilteredProducts(filtered)
      setIsFiltering(true)
      if (filtered.length === 0) {
        setNoResultsMessage(true)
      } else {
        setNoResultsMessage(false)
      }
    }
  }

  const paginate = pageNumber => {
    setCurrentPage(pageNumber)
    setSearchParams({ page: pageNumber.toString() })
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentPosts = records.slice(indexOfFirstItem, indexOfLastItem)

  const handleNextbtn = () => {
    const nextPage = currentPage + 1
    setCurrentPage(nextPage)
    setSearchParams({ page: nextPage.toString() })

    if (nextPage > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit)
    }
  }

  const handlePrevbtn = () => {
    const prevPage = currentPage - 1
    setCurrentPage(prevPage)
    setSearchParams({ page: prevPage.toString() })

    if ((prevPage - 1) % pageNumberLimit == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit)
    }
  }
  const displayedProducts =
    currentPosts.length > 0 ? currentPosts : records.slice(0, itemsPerPage)

  const { addItem } = useCart()

  const [displayPopUp, setDisplayPopUp] = useState(true)

  const closePopUp = () => {
    //myactivity.google.com/product/youtube_live_chat?hl=en&utm_medium=web&utm_source=youtube
    https: localStorage.setItem('ToastPop', true)
    setDisplayPopUp(false)
  }

  useEffect(() => {
    let returningUser = localStorage.getItem('ToastPop')
    function showPopUp () {
      if (!returningUser) {
        toast.warn(
          'Please Note That Prices Are Subject to Change Without Prior Notice Due to The Fluctuation in Exchange Rate, Kindly Confirm Every Price at Readiness for Purchase',
          {
            position: 'top-center',
            autoClose: 20000,
            className: 'pop-up-message'
          },
          closePopUp()
        )
      }
    }
    setInterval(showPopUp(), 604800000)
  }, [])

  const [filters, setFilters] = useState({
    brand: [],
    price: [0, 1000000000]
  })

  const [brands, setBrands] = useState([])
  const [defaultPriceRange, setDefaultPriceRange] = useState([0, 1000000000])
  const [priceRange, setPriceRange] = useState([0, 1000000000])

  useEffect(() => {
    axios
      .get(`${BASEURL}/api/v1/product/brand`)
      .then(response => {
        if (response.data.success) {
          const { brands: fetchedBrands, minPrice, maxPrice } = response.data

          // Normalize, remove duplicates, and convert to uppercase
          const normalizedBrands = fetchedBrands.map(brand =>
            brand.trim().toUpperCase()
          )
          const uniqueBrands = [...new Set(normalizedBrands)]

          setBrands(uniqueBrands)
          setDefaultPriceRange([minPrice, maxPrice])
          setPriceRange([minPrice, maxPrice])
        }
      })
      .catch(error => {
        console.error('Error fetching brands:', error)
      })
  }, [])

  const resetBrands = async () => {
    // Clear the selected brands
    setFilters(prevFilters => ({
      ...prevFilters,
      brand: []
    }))

    // Clear filtered products
    setFilteredProducts([])
  }

  const handleBrandChange = async brand => {
    const updatedBrands = filters.brand.includes(brand)
      ? filters.brand.filter(b => b !== brand)
      : [...filters.brand, brand]

    setFilters(prevFilters => ({ ...prevFilters, brand: updatedBrands }))
    startTransition(() => {
      applyFilters(updatedBrands, filters.price)
    })
  }

  const handleInputChange = (e, index) => {
    const rawValue = e.target.value.replace(/,/g, '')
    if (rawValue === '') {
      const updatedPriceRange = [...priceRange]
      updatedPriceRange[index] = ''
      setPriceRange(updatedPriceRange)
      return
    }
    const newValue = Number(rawValue)
    if (!isNaN(newValue)) {
      const updatedPriceRange = [...priceRange]
      updatedPriceRange[index] = newValue
      setPriceRange(updatedPriceRange)
    }
  }

  const applyPriceFilter = async () => {
    setFilters(prevFilters => ({ ...prevFilters, price: priceRange }))
    await applyFilters(filters.brand, priceRange)
  }

  const resetPriceRange = () => {
    setPriceRange(defaultPriceRange)
    setFilters(prevFilters => ({ ...prevFilters, price: defaultPriceRange }))
    setFilteredProducts([])
  }

  const applyFilters = async (brands, price) => {
    try {
      const formattedBrands = brands
        .map(brand => brand.trim().toUpperCase())
        .join(',')

      const params = {
        brand: formattedBrands || undefined
      }

      // If the user has specified a price range, add it to the query
      if (
        price[0] !== defaultPriceRange[0] ||
        price[1] !== defaultPriceRange[1]
      ) {
        params.minPrice = price[0]
        params.maxPrice = price[1]
      }

      const response = await axios.get(`${BASEURL}/api/v1/product/filter/all`, {
        params
      })

      if (response.data.success) {
        setFilteredProducts(response.data.data)
      }
    } catch (error) {
      console.error('Error filtering products:', error)
    }
  }

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue)
  }

  return (
    <>
      <Helmet>
        <title>Shop for Laptops, Printers, POS Systems & Office Equipment at Elonatech</title>
        <meta name='robots' content='index,follow' />
        <meta
          name='description'
          content='Shop through a wide selection of laptops, printers, office equipment, pos system, network devices products at Elonatech.'
        />
        <link rel='canonical' href='/shop' />
        <meta
          name='keywords'
          content='printers, network devices, laptops, office equipment, pos system, Elonatech'
        />
      </Helmet>

      {/* Header Section */}
      <div className='container-fluid shop-products-section'>
        <div className='text-content'>
          <h2>Shop Products</h2>
          <h5>Get what you need to run your business</h5>
          <p className='lead'>
            Smart business people need quality and reliable hardware, software,
            service, and support for the day to day running of their businesses
          </p>
        </div>
      </div>

      <main className='container-fluid custom-container'>
        <div className='row g-0'>
          <div className='col-lg-9 col-md-7'>
            <section className='ftco-section' id='skills-section'>
              <div className='custom-container'>
                <div className='row justify-content-center pt-3 pb-4'>
                  <div className='col-md-8 pt-4'>
                    <h6>
                      SHOWING <span className='text-danger'>{currentPage}</span>{' '}
                      –{' '}
                      <span className='text-danger'>
                        {currentPage * itemsPerPage}
                      </span>{' '}
                      OF <span className='text-danger'>{data.length}</span>{' '}
                      RESULTS
                    </h6>
                  </div>
                  <div className='col-md-4 pt-3'>
                    <input
                      className='form-control'
                      type='search'
                      onChange={Filter}
                      placeholder='Search'
                      aria-label='Search'
                    />
                  </div>
                </div>

                {/* Product Display or No Results */}
                <div className='row g-1 progress-circle'>
                  {isLoading ? ( // Show the loader when isLoading is true
                    <Loading />
                  ) : displayedProducts.length > 0 ? (
                    displayedProducts.map(product => {
                      return (
                        <div
                          className='col-lg-3 col-md-6 mb-4'
                          key={product.id}
                        >
                          <div className='mx-1 shadow-lg p-3 bg-body rounded showbutton'>
                            <Link
                              className='text-decoration-none text-dark'
                              to={`/product/${product.slug}/${product._id}?fromPage=${currentPage}`}
                            >
                              <div className='text-center take'>
                                <LazyLoadImage
                                  src={product.images[0]?.url}
                                  placeholderSrc='https://res.cloudinary.com/elonatech/image/upload/v1710241889/loaderImage/blurred_o4delz.avif'
                                  className='lazyload'
                                  width='130'
                                  height='130'
                                  alt=''
                                />
                              </div>
                              <h5 className='fw-normal pt-3 product-name'>
                                {product.name.slice(0, 23)}...
                              </h5>
                              {/* <p className='lead fs-6'>{product.category}</p> */}
                              <p className='lead fs-6'>
                                {product.category === 'Office'
                                  ? 'Office Equipment'
                                  : product.category === 'Pos'
                                  ? 'POS'
                                  : product.category === 'Network'
                                  ? 'Network Device' // Use 'POS' for the POS category
                                  : product.category}
                              </p>

                              {/* Star Rating */}
                              <div
                                className='stars'
                                style={{ color: 'black', marginBottom: '10px' }}
                              >
                                {[...Array(5)].map((star, index) => {
                                  return (
                                    <i
                                      key={index}
                                      className={
                                        index < Math.floor(5)
                                          ? 'bi bi-star-fill'
                                          : 'bi bi-star'
                                      }
                                      style={{ color: '#f4be1d' }}
                                    ></i>
                                  )
                                })}
                              </div>

                              <div className='d-flex justify-content-between'>
                                <p className='mt-2 px-1 text-danger'>
                                  <strong>
                                    ₦ {Number(product.price).toLocaleString()}
                                    .00
                                  </strong>
                                </p>
                                <i
                                  className='bi bi-cart p-1'
                                  style={{
                                    fontSize: '20px',
                                    cursor: 'pointer'
                                  }}
                                ></i>
                              </div>
                            </Link>
                            <div className='d-grid gap-2' key={product.id}>
                              <div
                                className='btn btn-outline add-to-cart'
                                onClick={() => addItem(product)}
                              >
                                <h6 className='text-danger'>ADD TO CART</h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <h4>No products match your search criteria.</h4>
                  )}
                </div>
                {/*============================================== Pagination ================================================*/}
                <div className='mt-5'>
                  <Pagination
                    totalPosts={records.length}
                    itemsPerPage={itemsPerPage}
                    maxPageNumberLimit={maxPageNumberLimit}
                    minPageNumberLimit={minPageNumberLimit}
                    currentPage={currentPage}
                    id
                    handleNextbtn={handleNextbtn}
                    handlePrevbtn={handlePrevbtn}
                    paginate={paginate}
                  />
                </div>
              </div>
            </section>
          </div>

          <div class='col-lg-3 col-md-5 pad'>
            <div className='thix'>
              <div className='browse'>
                <form class='d-flex'></form>
                <h4 class='fw-bold tyu'>Browse Categories</h4>
                <ul className='list-unstyled'>
                  <li>
                    <Link
                      to={'/shop'}
                      className={`item ${
                        activeItem === 'Item 1' ? 'active-category' : ''
                      }`}
                      onClick={() => handleClick('Item 1')}
                    >
                      All Products
                    </Link>
                  </li>

                  <li>
                    <Link
                      to={'/computers'}
                      className='text-dark'
                      style={{ textDecoration: 'none' }}
                      onMouseEnter={e =>
                        (e.currentTarget.style.textDecoration = 'underline')
                      }
                      onMouseLeave={e =>
                        (e.currentTarget.style.textDecoration = 'none')
                      }
                    >
                      Computers
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={'/office-equipment'}
                      className='text-dark'
                      style={{ textDecoration: 'none' }}
                      onMouseEnter={e =>
                        (e.currentTarget.style.textDecoration = 'underline')
                      }
                      onMouseLeave={e =>
                        (e.currentTarget.style.textDecoration = 'none')
                      }
                    >
                      Office Equipment
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={'/pos-system'}
                      className='text-dark'
                      style={{ textDecoration: 'none' }}
                      onMouseEnter={e =>
                        (e.currentTarget.style.textDecoration = 'underline')
                      }
                      onMouseLeave={e =>
                        (e.currentTarget.style.textDecoration = 'none')
                      }
                    >
                      POS System
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={'/printers'}
                      className='text-dark'
                      style={{ textDecoration: 'none' }}
                      onMouseEnter={e =>
                        (e.currentTarget.style.textDecoration = 'underline')
                      }
                      onMouseLeave={e =>
                        (e.currentTarget.style.textDecoration = 'none')
                      }
                    >
                      Printers
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={'/network-devices'}
                      className='text-dark'
                      style={{ textDecoration: 'none' }}
                      onMouseEnter={e =>
                        (e.currentTarget.style.textDecoration = 'underline')
                      }
                      onMouseLeave={e =>
                        (e.currentTarget.style.textDecoration = 'none')
                      }
                    >
                      Network Devices
                    </Link>
                  </li>
                </ul>
              </div>
              <div
                className='price-mobile1'
              >
                <h4 className='fw-bold'>
                  Filter by Price(₦)
                </h4>
                <Slider
                  className='slider'
                  value={priceRange}
                  min={defaultPriceRange[0]}
                  max={defaultPriceRange[1]}
                  step={50}
                  onChange={handlePriceRangeChange}
                  pearling
                  minDistance={10}
                />

                <div className='price-range-values'>
                  <div>
                    <input
                      style={{ width: '100%', borderRadius: '5px' }}
                      type='text'
                      value={
                        priceRange[0] !== undefined
                          ? priceRange[0].toLocaleString()
                          : ''
                      }
                      onChange={e => handleInputChange(e, 0)}
                      className='price-input'
                    />
                  </div>
                  <span className='separator'>-</span>
                  <div>
                    <input
                      style={{ width: '100%', borderRadius: '5px' }}
                      type='text'
                      value={
                        priceRange[1] !== undefined
                          ? priceRange[1].toLocaleString()
                          : ''
                      }
                      onChange={e => handleInputChange(e, 1)}
                      className='price-input'
                    />
                  </div>
                </div>
                <div className='btnd'>
                  <button
                    style={{ width: '100%' }}
                    onClick={applyPriceFilter}
                    className='apply-btn'
                  >
                    Apply Price Range
                  </button>
                  <button
                    style={{ width: '100%' }}
                    onClick={resetPriceRange}
                    className='reset-btn'
                  >
                    Reset Price Range
                  </button>
                </div>
              </div>
            </div>
            <div
              style={{
                width: '60%',
                display: isLoading ? 'none' : 'block'
              }}
              className='filter-section pt-2 rounded shadow-sm'
            >
              <h4 style={{ marginTop: '-8px' }} class='fw-bold shopyy'>
                Sort Products by
              </h4>
              <div className="fillt">
              <ShopFilter setFilteredProducts={setFilteredProducts} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default trackWindowScroll(Shop)
