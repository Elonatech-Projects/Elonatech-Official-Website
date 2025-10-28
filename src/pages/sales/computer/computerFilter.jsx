import "./computerFilter.css"; 
import React, { useState, useEffect } from "react";
import Slider from "@mui/material/Slider";
import { BASEURL } from "../../../BaseURL/BaseURL";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const ComputerFilter = ({ setFilteredProducts }) => {
  const [filters, setFilters] = useState({
    ram: "",
    brand: "",
    drive: "",
    price: [0, 1000000]
  
  });
  const [noResultsMessage, setNoResultsMessage] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000000]); 
  const [defaultPriceRange, setDefaultPriceRange] = useState([0, 1000000]); 
  const [brands, setBrands] = useState([]);
  const [rams, setRams] = useState([]); 
  const [drives, setDrives] = useState([]);
  const [allProducts, setAllProducts] = useState([]); 
  const [showNoResultsDialog, setShowNoResultsDialog] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);

  const normalizeRam = (ramString) => {
    if (!ramString) return null;
    const ram = ramString.toUpperCase().trim();
    const match = ram.match(/(\d+)\s*(?:GB|G)?/i);
    if (match) {
      const number = match[1];
      return `${number}GB RAM`;
    }
    return null;
  };

  const normalizeDrive = (driveString) => {
    if (!driveString) return null;
    const drive = driveString.toUpperCase().trim();
    
    if (drive.includes('PCIE') || drive.includes('RAM,')) {
      return null;
    }
    
    const matchSSD = drive.match(/(\d+)\s*(?:GB|G|TB|T)?\s*(?:SSD)?/i);
    const matchHDD = drive.match(/(\d+)\s*(?:GB|G|TB|T)?\s*(?:HDD)?/i);
    
    if (matchSSD || matchHDD) {
      const match = matchSSD || matchHDD;
      const number = parseInt(match[1]);
      const isTerabyte = drive.includes('TB') || drive.includes('T');
      const capacityGB = isTerabyte ? number * 1024 : number;
      
      const type = drive.includes('HDD') ? 'HDD' : 'SSD';
      
      if (type === 'SSD' && (capacityGB < 128 || capacityGB > 4096)) {
        return null;
      }
      if (type === 'HDD' && (capacityGB < 500 || capacityGB > 18432)) {
        return null;
      }
      
      if (capacityGB >= 1024) {
        return `${(capacityGB / 1024)}TB ${type}`;
      }
      return `${capacityGB}GB ${type}`;
    }
    return null;
  };

  useEffect(() => {
    fetch(`${BASEURL}/api/v1/product/filter?category=Computer`)
      .then((response) => response.json())
      .then((data) => {
        // Store all products for local filtering
        setAllProducts(data.data);

        if (data.minPrice !== undefined && data.maxPrice !== undefined) {
          const fetchedMinPrice = data.minPrice;
          const fetchedMaxPrice = data.maxPrice;
          setDefaultPriceRange([fetchedMinPrice, fetchedMaxPrice]);
          setPriceRange([fetchedMinPrice, fetchedMaxPrice]);
          setFilters((prevFilters) => ({
            ...prevFilters,
            price: [fetchedMinPrice, fetchedMaxPrice] 
          }));
        }

        // Set up filter options
        const uniqueBrands = Array.from(new Set(data.data
          .map(product => product.brand.toUpperCase().trim())))
          .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
        setBrands(uniqueBrands);

        const uniqueRams = Array.from(new Set(data.data
          .filter(product => product.computerProperty && 
                           product.computerProperty[0] && 
                           product.computerProperty[0].ram)
          .map(product => normalizeRam(product.computerProperty[0].ram))
          .filter(ram => ram !== null)))
          .sort((a, b) => {
            const aSize = parseInt(a.match(/\d+/)[0]);
            const bSize = parseInt(b.match(/\d+/)[0]);
            return aSize - bSize;
          });
        setRams(uniqueRams);

        const uniqueDrives = Array.from(new Set(data.data
          .filter(product => product.computerProperty && 
                           product.computerProperty[0] && 
                           product.computerProperty[0].drive)
          .map(product => normalizeDrive(product.computerProperty[0].drive))
          .filter(drive => drive !== null)))
          .sort((a, b) => {
            const aMatch = a.match(/(\d+)(TB|GB)/);
            const bMatch = b.match(/(\d+)(TB|GB)/);
            if (aMatch && bMatch) {
              const aSize = parseInt(aMatch[1]) * (aMatch[2] === 'TB' ? 1000 : 1);
              const bSize = parseInt(bMatch[1]) * (bMatch[2] === 'TB' ? 1000 : 1);
              return aSize - bSize;
            }
            return a.localeCompare(b);
          });
        setDrives(uniqueDrives);

        setFilteredProducts(data.data);
        setNoResultsMessage("");
      })
      .catch((error) => console.error("Error fetching initial data:", error));
  }, [setFilteredProducts]);


  const getActiveFilters = (currentFilters) => {
    const active = [];
    if (currentFilters.brand) active.push(`Brand: ${currentFilters.brand}`);
    if (currentFilters.ram) active.push(`RAM: ${currentFilters.ram}`);
    if (currentFilters.drive) active.push(`Drive: ${currentFilters.drive}`);
    if (currentFilters.price[0] !== defaultPriceRange[0] || 
        currentFilters.price[1] !== defaultPriceRange[1]) {
      active.push(`Price Range: ₦${formatPrice(currentFilters.price[0])} - ₦${formatPrice(currentFilters.price[1])}`);
    }
    return active;
  };

  const applyFilters = (currentFilters) => {
    let filteredResults = [...allProducts];

    // Apply brand filter
    if (currentFilters.brand) {
      filteredResults = filteredResults.filter(
        product => product.brand.toUpperCase().trim() === currentFilters.brand
      );
    }

    // Apply RAM filter
    if (currentFilters.ram) {
      filteredResults = filteredResults.filter(product => 
        product.computerProperty?.[0]?.ram &&
        normalizeRam(product.computerProperty[0].ram) === currentFilters.ram
      );
    }

    // Apply drive filter
    if (currentFilters.drive) {
      filteredResults = filteredResults.filter(product =>
        product.computerProperty?.[0]?.drive &&
        normalizeDrive(product.computerProperty[0].drive) === currentFilters.drive
      );
    }

    // Apply price filter
    filteredResults = filteredResults.filter(product =>
      product.price >= currentFilters.price[0] &&
      product.price <= currentFilters.price[1]
    );

    // Update active filters
    const currentActiveFilters = getActiveFilters(currentFilters);
    setActiveFilters(currentActiveFilters);

    // Check if we have any results
    if (filteredResults.length === 0 && currentActiveFilters.length > 0) {
      setNoResultsMessage("No products match your selected filters.");
      setShowNoResultsDialog(true);
      setFilteredProducts([]);
    } else {
      setNoResultsMessage("");
      setShowNoResultsDialog(false);
      setFilteredProducts(filteredResults);
    }
  };

  const handleApplyClick = () => {
    applyFilters(filters);
  };

  const resetFilters = () => {
    const resetFilters = {
      ram: "",
      brand: "",
      drive: "",
      price: defaultPriceRange
    };
    setFilters(resetFilters);
    setPriceRange(defaultPriceRange);
    setShowNoResultsDialog(false);
    applyFilters(resetFilters);
  };

  const resetPriceRange = () => {
    setPriceRange(defaultPriceRange);
    const updatedFilters = {
      ...filters,
      price: defaultPriceRange
    };
    setFilters(updatedFilters);
    applyFilters(updatedFilters);
  };

  const handleCheckboxChange = (event) => {
    const { name, value, checked } = event.target;
    const updatedFilters = {
      ...filters,
      [name]: checked ? value : ""
    };
    setFilters(updatedFilters);
    applyFilters(updatedFilters);
  };

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  // const handlePriceChange = (event, newValue) => {
  //   const updatedFilters = {
  //     ...filters,
  //     price: newValue
  //   };
  //   setFilters(updatedFilters);
  //   applyFilters(updatedFilters);
  // };

  const handlePriceChange = (event, newValue) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      price: newValue,
    }));
  };

  const formatPrice = (price) => {
    return price.toLocaleString();
  };

  const handleInputPriceChange = (event, index) => {
    const value = event.target.value.replace(/[^0-9]/g, "");
    const newPrice = [...filters.price];
    newPrice[index] = parseFloat(value) || 0;
    const updatedFilters = {
      ...filters,
      price: newPrice
    };
    setFilters(updatedFilters);
  };

  const handleCloseDialog = () => {
    setShowNoResultsDialog(false);
  };

  return (
    <div className="computer-filter">
      {/* No Results Dialog */}
      <Dialog
        open={showNoResultsDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          No Products Found
        </DialogTitle>
        <DialogContent>
          <div id="alert-dialog-description">
            <p style={{ marginBottom: '10px' }}>No products match your current filter criteria:</p>
            <ul style={{ paddingLeft: '20px', marginBottom: '10px' }}>
              {activeFilters.map((filter, index) => (
                <li key={index} style={{ marginBottom: '5px' }}>{filter}</li>
              ))}
            </ul>
            <p>Would you like to reset your filters and try again?</p>
          </div>
        </DialogContent>
        <DialogActions style={{ padding: '16px' }}>
          <Button 
            onClick={resetFilters} 
            variant="contained" 
            color="primary"
          >
            Reset All Filters
          </Button>
          <Button 
            onClick={handleCloseDialog} 
            variant="outlined"
          >
            Keep Filters
          </Button>
        </DialogActions>
      </Dialog>

      {/* Existing warning message */}
      {noResultsMessage && (
        <div className="no-results-message alert alert-info">
          <p>{noResultsMessage}</p>
          <p>
            Please adjust your filters or go back to the <a href="/computers">Computer page</a> to explore
            more products.
          </p>
        </div>
      )}
      <form>
        {/* Brand Filter */}
        <div className="filter-section brand-mobile">
          <label className="form-label">Brand:</label>
          <div className="filter-options">
            {brands.map((brand) => (
              <div className="form-check" key={brand}>
                <input
                  type="checkbox"
                  name="brand"
                  value={brand}
                  onChange={handleCheckboxChange}
                  checked={filters.brand === brand}
                  className="form-check-input"
                />
                <label className="form-check-label">{brand}</label>
              </div>
            ))}
          </div>
        </div>

        {/* RAM Filter */}
        <div className="filter-section ram-mobile">
          <label className="form-label">RAM:</label>
          <div className="filter-options">
            {rams.map((ram) => (
              <div className="form-check" key={ram}>
                <input
                  type="checkbox"
                  name="ram"
                  value={ram}
                  onChange={handleCheckboxChange}
                  checked={filters.ram === ram}
                  className="form-check-input"
                />
                <label className="form-check-label">{ram}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Drive Filter */}
        <div className="filter-section drive-mobile">
          <label className="form-label">Drive:</label>
          <div className="filter-options">
            {drives.map((drive) => (
              <div className="form-check" key={drive}>
                <input
                  type="checkbox"
                  name="drive"
                  value={drive}
                  onChange={handleCheckboxChange}
                  checked={filters.drive === drive}
                  className="form-check-input"
                />
                <label className="form-check-label">{drive}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Filter */}
        <div className="price-filter price-mobile">
          <h4 className="form-label">Filter by Price(₦)</h4>
          <Slider
            className="custom-slider"
            value={filters.price}
            onChange={handlePriceChange}
            min={priceRange[0]}
            max={priceRange[1]}
            step={5}
          />
          
          <div className="price-range-values">
            <input
              style={{ width: "50%", borderRadius: "5px" }}
              type="text"
              value={formatPrice(filters.price[0])}
              onChange={(e) => handleInputPriceChange(e, 0)}
              className="price-input"
            />
            <span className="separator">-</span>
            <input
              style={{ width: "50%", borderRadius: "5px" }}
              type="text"
              value={formatPrice(filters.price[1])}
              onChange={(e) => handleInputPriceChange(e, 1)}
              className="price-input"
            />
          </div>
          <div className="expand">
            <button
              type="button"
              onClick={handleApplyClick}
              className="apply-btn"
              style={{ width: "100%" }}
            >
              Apply Price Range
            </button>
            <button
              type="button"
              onClick={resetPriceRange}
              className="reset-btn"
              style={{ width: "100%" }}
            >
              Reset Price Range
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ComputerFilter;