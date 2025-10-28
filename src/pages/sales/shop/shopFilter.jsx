import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASEURL } from '../../../BaseURL/BaseURL'
import Slider from '@mui/material/Slider'
import './shopFilter.css'
import { GoDash } from 'react-icons/go'

const ShopFilter = ({ setFilteredProducts }) => {
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
    await applyFilters(updatedBrands, filters.price)
  }

  const handleInputChange = (e, index) => {
    const rawValue = e.target.value.replace(/,/g, '') // Remove commas

    // If the input is empty, set the value to an empty string
    if (rawValue === '') {
      const updatedPriceRange = [...priceRange]
      updatedPriceRange[index] = '' // Or use null if you prefer
      setPriceRange(updatedPriceRange)
      return
    }

    // Convert to number and handle invalid cases
    const newValue = Number(rawValue)

    // Only update if it's a valid number
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

  const formatPrice = value => {
    return value === '' || value === 0
      ? '0'
      : new Intl.NumberFormat().format(value)
  }

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue)
  }

  return (
    <div
      style={{ boxShadow: '0px 1px 0px rgba(0, 0, 0, 0.1)' }}
      className='mb-3'
    >
      {/* Filter by Brand */}
      <label className='form-label'>Brand:</label>
      <div style={{ maxHeight: '200px', overflowY: 'scroll' }}>
        {brands
          .sort((a, b) => a.localeCompare(b))
          .map(brand => (
            <div key={brand} className='text-dark'>
              <input
                type='checkbox'
                id={brand}
                name='brand'
                value={brand}
                checked={filters.brand.includes(brand)}
                onChange={() => handleBrandChange(brand)}
              />
              <label htmlFor={brand}>{brand}</label>
            </div>
          ))}
      </div>

      {/* Filter by Price */}
      <div className='price-filter price-mobile'>
        <h4 className='form-label'>Filter by Price(₦)</h4>
        <Slider
          className='slider'
          value={priceRange}
          min={defaultPriceRange[0]}
          max={defaultPriceRange[1]}
          step={5}
          onChange={handlePriceRangeChange}
          pearling
          minDistance={5}
        />

        <div className='price-range-values'>
          <div style={{ width: '100%' }}>
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
          {/* <GoDash className='dash' /> */}
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

      {/* Add custom CSS for better visuals */}
      <style jsx>{`
        .shop-filter {
          margin-bottom: 1rem;
        }
        .price-filter {
          margin-top: 1rem;
        }
        .slider {
          margin: 10px 0;
        }
        .price-range-values {
          display: flex;
          justify-content: space-between;
        }
        .apply-btn,
        .reset-btn {
          margin: 5px;
          padding: 5px 10px;
          cursor: pointer;
          border: none;
          border-radius: 5px;
        }
        .apply-btn {
          background-color: rgb(52, 84, 140);
          color: white;
        }
        .reset-btn {
          background-color: rgb(220, 53, 69);
          color: white;
        }
        .no-products-message {
          color: red;
          font-size: 18px;
          margin-top: 20px;
        }

        .btnd {
          width: 100%;
          max-width: 100%;
          padding: 0;
          margin: 5px 0 0 -8px;
        }
      `}</style>
    </div>
  )
}

export default ShopFilter
