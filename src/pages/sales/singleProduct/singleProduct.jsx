import { useEffect, useState, useCallback, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
// import { BASEURL } from '../../../BaseURL/BaseURL'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import Loading from '../../../components/Loading/Loading'
import DOMPurify from 'dompurify'
import { useCart } from 'react-use-cart'
import { IoArrowBackOutline, IoArrowForwardOutline } from 'react-icons/io5'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import sanitizeHtml from 'sanitize-html'
import SocialShareButtons from './socialShareButton'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import './singleProduct.css'

// import required modules
import {
  FreeMode,
  Navigation,
  EffectFade,
  Thumbs,
  Pagination
} from 'swiper/modules'

import { Helmet } from 'react-helmet-async'

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}


// git remote add origin https://github.com/Elonatech/Elonatech-Official-Website.git


const SingleProduct = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState()
  const [data, setData] = useState({})
  const [currentAdmin, setCurrentAdmin] = useState('')
  const [category, setCategory] = useState('')
  const [computer, setComputer] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState([])
  const [recentlyViewed, setRecentlyViewed] = useState([])
  const { slug, id } = useParams()
  const [relatedProducts, setRelatedProducts] = useState([])
  const [nextProductId, setNextProductId] = useState(null)
  const [nextProductSlug, setNextProductSlug] = useState(null);
  const [product, setProduct] = useState(null)
  const [allProductsInCategory, setAllProductsInCategory] = useState([])
  const [productUrl, setProductUrl] = useState('')

  const navigate = useNavigate()
  const location = useLocation()

  const windowSize = useWindowSize() 
  const isMobile = windowSize.width < 768


  let currentProductCat;
  
  const useScrollResetNavigation = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const isNavigatingRef = useRef(false)
    const [previousUrl, setPreviousUrl] = useState(null)
  
    useEffect(() => {
      setPreviousUrl(window.location.href)
    }, [location])

    useEffect(() => {
      setProductUrl(window.location.href)
    }, [])
  
    const scrollToTop = useCallback(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }, [])
  
    useEffect(() => {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual'
      }
  
      return () => {
        if ('scrollRestoration' in window.history) {
          window.history.scrollRestoration = 'auto'
        }
      }
    }, [])
  
    const handleGoBack = () => {
      if (window.history.state && window.history.state.idx > 0) {
        navigate(-1)
        scrollToTop()
      } else {
        navigate('/shop')
        scrollToTop()
      }
    }
  
    const handleGoToShop = () => {
      navigate('/shop')
      scrollToTop()
    }
  
    const handleNavigateNext = useCallback(() => {
      if (!isNavigatingRef.current && nextProductId && nextProductSlug) {
        isNavigatingRef.current = true;
        navigate(`/product/${nextProductSlug}/${nextProductId}`);
        setTimeout(() => {
          isNavigatingRef.current = false;
        }, 500);
      }
    }, [nextProductId, nextProductSlug, navigate, isNavigatingRef]);
  
    return { previousUrl, handleGoBack, scrollToTop, handleNavigateNext, handleGoToShop }
  }
  

  switch (category) {
    case 'Computer':
      currentProductCat = 'computers';
      break;
    case 'Office':
      currentProductCat = 'office-equipment';
      break;
    case 'Network':
      currentProductCat = 'network-devices';
      break;
    case 'Printer':
      currentProductCat = 'printers';
      break;
    case 'Pos':
      currentProductCat = 'pos-system';
      break;
    default:
      currentProductCat = category.toLowerCase();
  }


  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('token'))
    setCurrentAdmin(auth)
  }, [])

  const { handleGoBack, handleNavigateNext} = useScrollResetNavigation()

  const [previousUrl, setPreviousUrl] = useState(null)

  useEffect(() => {
    setPreviousUrl(document.referrer || localStorage.getItem('previousUrl') || '/shop')
    localStorage.setItem('previousUrl', 'yegduyewgduwdiuwduw', window.location.href)
  }, [])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/v1/product/${id}`)
        setData(res.data.product)
        setImage(res.data.product.images)
        setCategory(res.data.product.category)
        setComputer(res.data.product.computerProperty)
        setProduct(res.data.product)
        setIsLoading(true)

        updateRecentlyViewedInLocalStorage()


        // Fetch next product
        // const nextRes = await axios.get(`${BASEURL}/api/v1/product/${res.data.product._id}/next`)
        // setNextProductId(nextRes.data.nextProduct._id)

        const nextRes = await axios.get(`http://localhost:4000/api/v1/product/${res.data.product._id}/next`);
        if (nextRes.data.nextProduct) {
          setNextProductId(nextRes.data.nextProduct._id);
          setNextProductSlug(nextRes.data.nextProduct.slug);
        } else {
          setNextProductId(null);
          setNextProductSlug(null);
        }

        await fetchAllProductsInCategory()
        console.log('allProductsInCategory:', allProductsInCategory);
        // Fetch related products
        await fetchRelatedProducts()

        await fetchRecentlyViewedProducts()

      } catch (error) {
        setIsLoading(true)
        navigate('/shop')
      }
    }
    fetchData()
  }, [id])

  const fetchAllProductsInCategory = () => {
    fetch(`http://localhost:4000/api/v1/product/filter?category=${category}`)
      .then(response => response.json())
      .then(data => {
        setAllProductsInCategory(data.data.reverse());
        console.log('allProductsInCategory:', allProductsInCategory);
      })
      .catch(error => {
        console.error('Error fetching products in the same category:', error);
      });
  };

  const calculatePageNumber = () => {
    if (allProductsInCategory.length > 0 && category) {
      const productIndex = allProductsInCategory.findIndex(product => product._id === id)
      return Math.floor((productIndex + 1) / 12) + 1
    }
    return 1
  }

  const handleGoToShop = () => {
    const pageNumber = calculatePageNumber()
    navigate(`/${currentProductCat}?page=${pageNumber}`)
  }

  const updateRecentlyViewedInLocalStorage = () => {
    if (!id) {
      console.warn("Invalid product ID, cannot update recently viewed.");
      return;
    }
  
    const storedRecentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
  
    if (!storedRecentlyViewed.includes(id)) {
      const updatedRecentlyViewed = [id, ...storedRecentlyViewed.slice(0, 4)];
      localStorage.setItem('recentlyViewed', JSON.stringify(updatedRecentlyViewed));
      setRecentlyViewed(updatedRecentlyViewed);
    } else {
      setRecentlyViewed(storedRecentlyViewed);
    }
  };
  

  const fetchRecentlyViewedProducts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/v1/product/products/recently-viewed`
      )
      const recentlyViewedProducts = res.data.recentlyViewedProducts.slice(0, 6)
      setRecentlyViewed(
        recentlyViewedProducts.filter(product => product._id !== id).slice(0, 5)
      )
    } catch (error) {
      console.error('Error fetching recently viewed products:', error)
    }
  }


  const fetchRelatedProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/v1/product/${id}/related`)
      setRelatedProducts(res.data.relatedProducts)
    } catch (error) {
      console.error('Error fetching related products:', error)
    }
  }


  const ProductCard = ({ product }) => {
    // Add null check for product
    if (!product) {
      return null; // Or return a placeholder/loading state
    }
  
    // Destructure with default values to prevent null/undefined errors
    const { 
      name = '',
      price = 0,
      images = [],
      slug = ''
    } = product;
  
    return (
      <div className='col-custom-5 mb-4'>
        <div className='card h-100 d-flex flex-column'>
          <LazyLoadImage
            alt={name}
            src={
              images && images.length > 0
                ? images[0].url
                : 'placeholder-image-url.jpg'
            }
            effect='blur'
            className='card-img-top'
            style={{ height: '160px', objectFit: 'cover' }}
            placeholderSrc='https://res.cloudinary.com/elonatech/image/upload/v1710241889/loaderImage/blurred_o4delz.avif'
          />
          <div className='card-body d-flex flex-column'>
          <h6 className='card-title'>{name}</h6>
            <p className='card-text'>
              ₦ {Number(price).toLocaleString()}.00
            </p>
            <div className='mt-auto'>
            <Link to={`/product/${product._id}/${product.slug}`}  className='btn btn-dark btn-sm w-100' style={{ backgroundColor: 'black', borderColor: 'black' }}>View Product</Link>
            </div>
          </div>
        </div>
      </div>
    );
  };


  const ProductSection = ({ title, products }) => {
    // Add null check for products array
    if (!products || !Array.isArray(products)) {
      return null; // Or return a placeholder/loading state
    }
  
    return (
      <div className='container mt-5'>
        <h2 className='mb-4'>{title}</h2>
        <div className='row product-grid'>
          {products.slice(0, 5).map((product, index) => (
            <ProductCard 
              key={product?._id || index} 
              product={product} 
              index={index} 
            />
          ))}
        </div>
      </div>
    );
  };

  const handleDelete = async () => {
    const res = await axios.delete(`http://localhost:4000/api/v1/product/${id}`)
    navigate('/shop')
  }

  const { addItem } = useCart()

  const prepareSEOData = () => {
    if (!product) return null;

    const fallbackImage = "https://res.cloudinary.com/elonatech/image/upload/v1729523978/product_computer_qq8vkk.jpg";
    const productImage = product.images?.[0]?.url || fallbackImage;
    const productUrl = `https://elonatech.com.ng/product/${slug}`;
    
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": product?.name || "",
      "description": product?.description || "",
      "image": productImage,
      "url": productUrl,
      "brand": {
        "@type": "Brand",
        "name": product?.brand || ""
      },
      "offers": {
        "@type": "Offer",
        "price": product?.price || "",
        "priceCurrency": "NGN",
        "availability": product?.quantity > 0 ? "InStock" : "OutOfStock",
        "url": productUrl
      }
    };

    return {
      title: `${product.name} - Elonatech Nigeria`,
      description: product.description || "Product description unavailable",
      image: productImage,
      url: productUrl,
      structuredData
    };
  };

  const seoData = prepareSEOData();

  return (
    <>
       {seoData && (
        <Helmet>
          <title>{seoData.title}</title>
          <meta name="description" content={seoData.description} />
          
          {/* Open Graph Tags */}
          <meta property="og:title" content={seoData.title} />
          <meta property="og:description" content={seoData.description} />
          <meta property="og:image" content={seoData.image} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:url" content={seoData.url} />
          <meta property="og:type" content="product" />
          <meta property="og:site_name" content="Elonatech Nigeria" />

          {/* Twitter Card Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@elonatech" />
          <meta name="twitter:title" content={seoData.title} />
          <meta name="twitter:description" content={seoData.description} />
          <meta name="twitter:image" content={seoData.image} />

          {/* Product Schema */}
          <script type="application/ld+json">
            {JSON.stringify(seoData.structuredData)}
          </script>
        </Helmet>
      )}

      {/*================================================================ header ==============================================*/}
      <div class='container-fluid shop-section'>
        <div class='py-5 mt-5'></div>
      </div>
      <section class='mt-0' id='product' style={{ backgroundColor: '#f1f1f2' }}>
        {isLoading ? (
          <>
            <div className='container mt-4'>
              <button
                onClick={handleGoToShop}
                className='btn btn-outline-dark back-btn'
              >
                <IoArrowBackOutline className='me-2' />
                Back
              </button>
            </div>
            <div class='container py-5 mb-'>
              <div class='row border-0 '>
                <div class='col-lg-8 '>
                  {/* <div className="container"> */}
                  <div className='row g-0  '>
                    <div className='col-2' style={{ backgroundColor: 'white' }}>
                      <div className='card border-0'>
                        <Swiper
                          direction='vertical'
                          onSwiper={setThumbsSwiper}
                          spaceBetween={10}
                          slidesPerView={10}
                          freeMode={true}
                          watchSlidesProgress={true}
                          modules={[FreeMode, Navigation, Thumbs, Pagination]}
                          className='swiper-container gallery-thumbs pb-5'
                        >
                          <ul
                            className='list-unstyled text-start'
                            style={{ paddingLeft: '0' }}
                          >
                            {image.map(item => (
                              <li
                                key={item.id}
                                className='pb-3'
                                style={{
                                  display: 'flex',
                                  justifyContent: 'flex-start'
                                }}
                              >
                                <SwiperSlide
                                  className='pb- mt-2'
                                  style={{
                                    paddingBottom: '60px',
                                    display: 'flex',
                                    justifyContent: 'flex-start'
                                  }}
                                >
                                  <img
                                    src={item.url}
                                    className='img-fluid hto rounded border border-dark'
                                    style={{
                                      height: '60px',
                                      width: '60px',
                                      objectFit: 'cover',
                                      cursor: 'pointer'
                                    }}
                                  />
                                </SwiperSlide>
                              </li>
                            ))}
                          </ul>
                        </Swiper>
                      </div>
                    </div>
                    <div className='col-md-10'>
                      <div className='card border-0'>
                        {/* #fff  */}
                        <div className='gall'>
                          <Swiper
                            style={{
                              '--swiper-navigation-color': '#080808',
                              '--swiper-pagination-color': '#080808'
                            }}
                            spaceBetween={0}
                            // effect={'fade'}
                            navigation={true}
                            loop={true}
                            pagination={{
                              clickable: true
                            }}
                            thumbs={{
                              swiper:
                                thumbsSwiper && !thumbsSwiper.destroyed
                                  ? thumbsSwiper
                                  : null
                            }}
                            modules={[
                              FreeMode,
                              Navigation,
                              EffectFade,
                              Thumbs,
                              Pagination
                            ]}
                            className='swiper-container gallery-top border-0'
                          >
                            {image.map(item => (
                              <div key={item.id}>
                                <SwiperSlide className='border-0'>
                                  {/* <img  src={item.url} className='img-fluid' style={{height:"400px", width:"770px", objectFit:"cover"}} /> */}
                                  <div className='text-center'>
                                    <img
                                      alt=''
                                      class='img-fluid'
                                      src={item.url}
                                    ></img>
                                  </div>
                                </SwiperSlide>
                              </div>
                            ))}
                          </Swiper>
                        </div>
                        {/* </div> */}
                      </div>
                    </div>
                  </div>
                </div>

                <div class='col-lg-4 mb-5'>
                  <div class=''>
                    <div className='container' style={{ display: 'none' }}>
                      <h1>{data.name}</h1>
                      <img src={product.images[0].url} alt={data.name} />
                      <p>Price: ₦{Number(data.price).toLocaleString()}.00</p>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: product.description
                        }}
                      ></div>
                    </div>
                    <h4 className='fw-bold'>{data.name}</h4>
                    <hr />
                    <div class=' mt-0'>
                      <p className=''>
                        <span className='text-dark fw-bold pe-2'>Brand:</span>
                        {data.brand}
                      </p>
                    </div>
                    <div class='d-flex'>
                      <h4 className='mt-'>
                        Total: ₦ {Number(data.price).toLocaleString()}.00
                      </h4>
                      <p className='ms-5 mt-1'>
                        {' '}
                        <del className=''>₦ {data.odd}.00</del>
                      </p>
                    </div>
                    <p className='text-danger'>
                      {data.quantity <= '0' ? 'Out of Stock' : 'In Stock'}
                    </p>
                    <p>shipping from ₦ 2,500 and Above </p>
                    <ul class='list-unstyled d-flex mt-3'>
                      <li>
                        <i class='fa fa-star' style={{ color: '#f4be1d' }}></i>
                      </li>
                      <li>
                        <i class='fa fa-star' style={{ color: '#f4be1d' }}></i>
                      </li>
                      <li>
                        <i class='fa fa-star' style={{ color: '#f4be1d' }}></i>
                      </li>
                      <li>
                        <i class='fa fa-star' style={{ color: '#f4be1d' }}></i>
                      </li>
                      <li>
                        <i class='fa fa-star' style={{ color: '#f4be1d' }}></i>
                      </li>
                    </ul>
                    <div className='row justify-content-md-end mt-3'>
                      <div className='col-6'>
                        <div className='' key={data.id}>
                          <button
                            className='btn btn-dark mt-3'
                            onClick={() => addItem(data)}
                          >
                            <b>Add To Cart</b>
                          </button>
                        </div>
                      </div>

                      <div className='col-6'>
                        {currentAdmin ? (
                          <div className='text-end'>
                            <div className='d-flex justify-content-md-end mt-3 '>
                              <Link to={`/product/${id}/update`}>
                                <i
                                  class='bi bi-pencil-square text-warning fs-3 me-4'
                                  style={{ cursor: 'pointer' }}
                                ></i>
                              </Link>
                              <i
                                class='bi bi-trash3 text-danger fs-3'
                                style={{ cursor: 'pointer' }}
                                onClick={handleDelete}
                              ></i>
                            </div>
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                      <h6 className='mt-3 fw-bold'>PROMOTIONS</h6>
                      <div className='d-flex mt-2'>
                        <i class='bi bi-telephone-fill fs-3'></i>
                        <p className='text-dark mt-2 ms-4'>
                          Call{' '}
                          <a
                            className='text-decoration-none text-red '
                            href='tel:234 901 454 452'
                          >
                            +234 901 454 4520
                          </a>{' '}
                          To Order
                        </p>
                      </div>
                    </div>
                  </div>
                  <SocialShareButtons
                    url={`https://elonatech.com.ng/product/${product.slug}/${product._id}`}
                    title={product.name}
                    image={product.images[0].url}
                  />
                </div>
              </div>

              {data.category !== 'Computer' ? (
                <div className='container mt-5  mb-5'>
                  <div className='row '>
                    <div className='col-lg-12'>
                      <h4 className='fw-bold mb-3 mt-3'>Product Detail</h4>
                      <hr className='text-danger' />
                      <div className='border-0'>
                        <div
                          class='description mt-2 mb-5 p-'
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(data.description)
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div
                    className='container mt-5'
                    style={{ backgroundColor: '#f1f1f2' }}
                  >
                    <div className='row '>
                      <div className='col-lg-12'>
                        <h4 className='fw-bold mb-3 mt-3'>Overview</h4>
                        <hr className='text-danger' />
                        <div
                          className='card border-0'
                          style={{ backgroundColor: '#f1f1f2' }}
                        >
                          <div
                            class='description mt-2 mb-5'
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(data.description)
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*  */}
                  <div>
                    {computer.map(com => (
                      <div key={com.id}>
                        <h4 className='fw-bold mb-3'>Description</h4>
                        <table
                          class='table table-bordered'
                          style={{ width: '100%' }}
                        >
                          <thead>
                            <tr></tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope='row' style={{ width: '30%' }}>
                                Brand
                              </th>
                              <td style={{ width: '60%' }}>{data.brand} </td>
                            </tr>
                            <tr>
                              <th scope='row'>Series</th>
                              <td colspan='2'>{com.series}</td>
                            </tr>
                            <tr>
                              <th scope='row'>Item model number</th>
                              <td colspan='2'>{com.model}</td>
                            </tr>
                            <tr>
                              <th scope='row'>Item Weight</th>
                              <td>{com.weight}</td>
                            </tr>
                            <tr>
                              <th scope='row'>Product Dimensions</th>
                              <td>{com.dimension}</td>
                            </tr>
                            <tr>
                              <th scope='row'>Item Dimensions LxWxH</th>
                              <td>{com.item}</td>
                            </tr>
                            <tr>
                              <th scope='row'>Color</th>
                              <td>{com.color}</td>
                            </tr>
                            <tr>
                              <th scope='row'>Hardware Platform</th>
                              <td>{com.hardware}</td>
                            </tr>
                            <tr>
                              <th scope='row'>Operating System</th>
                              <td>{com.os}</td>
                            </tr>
                            <tr>
                              <th scope='row'>Processor Brand</th>
                              <td>{com.processor}</td>
                            </tr>
                            <tr>
                              <th scope='row'>Number of Processors</th>
                              <td>{com.number}</td>
                            </tr>
                            <tr>
                              <th scope='row'>Computer Memory Type</th>
                              <td>{com.memory}</td>
                            </tr>
                            <tr>
                              <th scope='row'>RAM</th>
                              <td>{com.ram}</td>
                            </tr>
                            <tr>
                              <th scope='row'>Hard Drive</th>
                              <td>{com.drive}</td>
                            </tr>
                            <tr>
                              <th scope='row'>Screen display size</th>
                              <td>{com.display}</td>
                            </tr>
                            <tr>
                              <th scope='row'>Screen Resolution</th>
                              <td>{com.resolution}</td>
                            </tr>
                            <tr>
                              <th scope='row'>Graphics Coprocessor</th>
                              <td>{com.graphics}</td>
                            </tr>
                            <tr>
                              <th scope='row'>Voltage</th>
                              <td>{com.voltage}</td>
                            </tr>
                            <tr>
                              <th scope='row'>Batteries</th>
                              <td>{com.battery}</td>
                            </tr>
                            <tr>
                              <th scope='row'>Wireless Type</th>
                              <td>{com.wireless}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className='container'>
            <div className='row'>
              <div className='col-md-12'>
                <div className='d-flex justify-content-center'>
                  <div className='my-5 py-5'>
                    <Loading />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className='container mt-4 mb-4'>
          <div className='d-flex justify-content-center align-items-center'>
            <button
              onClick={handleGoBack}
              className='btn btn-outline-dark nav-button'
            >
              <IoArrowBackOutline className='me-2' />
              Previous
            </button>
            {nextProductId && nextProductSlug && (
              <button
                onClick={handleNavigateNext}
                className='btn btn-outline-dark nav-button'
              >
                Next
                <IoArrowForwardOutline className='ms-2' />
              </button>
            )}
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <ProductSection
            title={<h4 className='fw-bold mb-3 mt-3'>Related Products</h4>}
            products={relatedProducts}
          />
        )}
        {recentlyViewed.length > 0 && (
          <ProductSection
            title={
              <h4 className='fw-bold mb-3 mt-3'>Recently Viewed Products</h4>
            }
            products={recentlyViewed}
          />
        )}
      </section>
    </>
  )
}
export default SingleProduct
