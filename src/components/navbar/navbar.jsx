import { Link } from 'react-router-dom'
import logo from './captions/elonatech.png'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import { FiPlus } from 'react-icons/fi'
import { HiOutlineXMark } from 'react-icons/hi2'
import { useCart } from 'react-use-cart'
import './navbar.css'
import { useAuth } from '../admin/AuthContext'

// Tech
import hardwareComputer from './icons/Tech/Hardware/computer.png'
import hardwareMaintenance from './icons/Tech/Hardware/maintaince.png'
import hardwarePhone from './icons/Tech/Hardware/phone.png'
import hardwareOffice from './icons/Tech/Hardware/office.png'

// Network Admin
import networkAdmin from './icons/Tech/Network Admin/networking-manager.png'
import networkServer from './icons/Tech/Network Admin/server admin.png'
import networkInfastructure from './icons/Tech/Network Admin/infastructure.png'
import networkCabling from './icons/Tech/Network Admin/cabling.png'
import networkCctv from './icons/Tech/Network Admin/cctv.png'
import networkInternet from './icons/Tech/Network Admin/internet.png'
import networkSecurity from './icons/Tech/Network Admin/network-security.png'

// System Security
import systemAccess from './icons/Tech/System Security/behavior-blocker.png'
import systemSurveillnance from './icons/Tech/System Security/surveillance.png'
import systemTime from './icons/Tech/System Security/time.png'

// Telecoms
import telecomsIp from './icons/Tech/Telecoms/ip.jpg'
import telecomsVoip from './icons/Tech/Telecoms/voip.jpg'

// Software Solution
import softwareSystem from './icons/Tech/Software Solution/System2-compressed.jpg'
import softwareApplication from './icons/Tech/Software Solution/Application.png'
import softwareBusiness from './icons/Tech/Software Solution/business.png'

// Web solution

import webDev from './icons/Digitial//web-programming-12709.png'
import appDev from './icons/Digitial/Web Solution/developer-mode.png'
import webDomain from './icons/Digitial/Web Solution/domain-compressed.jpg'
import WebHost from './icons/Digitial/Web Solution/hosting-compressed.jpg'

// Graphics

import graphicsGraphics from './icons/Digitial/Graphics/graphics.png'
import graphicsBrand from './icons/Digitial/Graphics/brand.png'
import graphicsUiux from './icons/Digitial/Graphics/uiux.png'

// Video

import video3d from './icons/Digitial/Video/3d-select.png'
import videoMotion from './icons/Digitial/Video/motion.png'
import videoEdit from './icons/Digitial/Video/video-editing.png'

// Tele

import teleLivestream from './icons/Digitial/Tele/livestreaming.png'
import teleVideo from './icons/Digitial/Tele/videoconferencing.png'

import digitalDigital from './icons/Digitial/Digital/digital.png'
import digitalSocial from './icons/Digitial/Digital/social.png'
import digitalEmail from './icons/Digitial/Digital/email.png'
import digitalSeo from './icons/Digitial/Digital/seo.png'
import digitalContent from './icons/Digitial/Digital/content.png'
import digitalPpc from './icons/Digitial/Digital/external-ppc.png'

// Sales Supply
import Salehardware from './icons/Sales/workstation.png'
import SaleSoftware from './icons/Sales/software.png'
import SaleConsumbles from './icons/Sales/home-office.png'

const Navbar = () => {
  const [currentAdmin, setCurrentAdmin] = useState('')
  const { logout } = useAuth()

  let navigate = useNavigate()

  useEffect(() => {
  const storedToken = localStorage.getItem('token');
  if (storedToken) {
    try {
      const auth = JSON.parse(storedToken);
      setCurrentAdmin(auth);
    } catch (err) {
      console.error("Invalid token in localStorage:", err);
      localStorage.removeItem('token'); // clean up bad data
    }
  } else {
    console.log("No token found in localStorage");
  }
  }, []);


  const { totalUniqueItems } = useCart()

  // const logout = () =>{
  //     const auth = localStorage.removeItem('token');
  //     toast.success('Admin Successfully Logout');
  //     setTimeout(() =>{
  //       navigate(0)
  //     }, 8000)
  //     navigate('/')
  // };

  ////////////////////////////////////////////////////////////////////////////////////////
  const [techMouseEnter, setTechMouseEnter] = useState(true)
  const [digitalMouseEnter, setDigitalMouseEnter] = useState(false)
  const [salesMouseEnter, setSalesMouseEnter] = useState(false)

  const [hardwareMouseOver, setHardwareMouseOver] = useState(true)
  const [hardwareMouseClick, setHardwareMouseClick] = useState(false)

  const [networkMouseOver, setNetworkMouseOver] = useState(false)
  const [networkMouseClick, setNetworkMouseClick] = useState(false)

  const [systemMouseOver, setSystemMouseOver] = useState(false)
  const [systemMouseClick, setSystemMouseClick] = useState(false)

  const [telecomMouseOver, setTelecomMouseOver] = useState(false)
  const [telecomMouseClick, setTelecomMouseClick] = useState(false)

  const [softwareMouseOver, setSoftwareMouseOver] = useState(false)
  const [softwareMouseClick, setSoftwareMouseClick] = useState(false)

  const [webMouseOver, setWebMouseOver] = useState(false)
  const [webMouseClick, setWebMouseClick] = useState(false)

  const [digitalMarketMouseOver, setDigitalMarketMouseOver] = useState(false)
  const [digitalMarketMouseClick, setDigitalMarketMouseClick] = useState(false)

  const [graphicsMouseOver, setGraphicsMouseOver] = useState(false)
  const [graphicsMouseClick, setGraphicsMouseClick] = useState(false)

  const [videoMouseOver, setVideoMouseOver] = useState(false)
  const [videoMouseClick, setVideoMouseClick] = useState(false)

  const [teleMouseOver, setTeleMouseOver] = useState(false)
  const [teleMouseClick, setTeleMouseClick] = useState(false)

  const [productsSlideNav1, setProductsSlideNav1] = useState(false)
  const [productsSlideNav2, setProductsSlideNav2] = useState(false)
  const [productsSlideNav3, setProductsSlideNav3] = useState(false)
  const [productsSlideNav4, setProductsSlideNav4] = useState(false)

  const [productHover, setProductHover] = useState(false)
  const [productClick, setProductClick] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)

  // SAMPLE
  const isSmallScreen = window.innerWidth < 1236
  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 1236)

  //

  const [initialLoad, setInitialLoad] = useState(true)

  useEffect(() => {
    if (initialLoad) {
      handleTechMouseEnter()
      setInitialLoad(false)
    }
  }, [])

  const handleHardwareMouseOver = () => {
    if (!isSmallScreen) {
      setActiveDropdown('hardware')
    }
  }

  const handleHardwareMouseClick = () => {
    if (isSmallScreen) {
      setActiveDropdown(activeDropdown === 'hardware' ? null : 'hardware')
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1236) // Adjust the breakpoint as needed
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // NETWORK
  const handleNetworkMouseOver = () => {
    if (!isSmallScreen) {
      setActiveDropdown('network')
    }
  }

  const handleNetworkMouseClick = () => {
    if (isSmallScreen) {
      setActiveDropdown(activeDropdown === 'network' ? null : 'network')
    }
  }

  // SYSTEM
  const handleSystemMouseOver = () => {
    if (!isSmallScreen) {
      setActiveDropdown('system')
    }
  }

  const handleSystemMouseClick = () => {
    if (isSmallScreen) {
      setActiveDropdown(activeDropdown === 'system' ? null : 'system')
    }
  }

  // TELECOM
  const handleTelecomMouseOver = () => {
    if (!isSmallScreen) {
      setActiveDropdown('telecom')
    }
  }

  const handleTelecomMouseClick = () => {
    if (isSmallScreen) {
      setActiveDropdown(activeDropdown === 'telecom' ? null : 'telecom')
    }
  }

  // SOFTWARE
  const handleSoftwareMouseOver = () => {
    if (!isSmallScreen) {
      setActiveDropdown('software')
    }
  }

  const handleSoftwareMouseClick = () => {
    if (isSmallScreen) {
      setActiveDropdown(activeDropdown === 'software' ? null : 'software')
    }
  }

  const resetAllStates = () => {
    setWebMouseOver(false)
    setWebMouseClick(false)
    setDigitalMarketMouseOver(false)
    setDigitalMarketMouseClick(false)
    setGraphicsMouseOver(false)
    setGraphicsMouseClick(false)
    setVideoMouseOver(false)
    setVideoMouseClick(false)
    setTeleMouseOver(false)
    setTeleMouseClick(false)
  }

  const handleWebMouseOver = () => {
    if (!isSmallScreen) {
      resetAllStates()
      setWebMouseOver(true)
    }
  }

  const handleWebMouseClick = () => {
    if (isSmallScreen) {
      resetAllStates()
      setWebMouseClick(!webMouseClick)
    }
  }

  const handleDigitalMarketMouseOver = () => {
    if (!isSmallScreen) {
      resetAllStates()
      setDigitalMarketMouseOver(true)
    }
  }

  const handleDigitalMarketMouseClick = () => {
    if (isSmallScreen) {
      resetAllStates()
      setDigitalMarketMouseClick(!digitalMarketMouseClick)
    }
  }

  const handleGraphicsMouseClick = () => {
    if (isSmallScreen) {
      resetAllStates()
      setGraphicsMouseClick(!graphicsMouseClick)
    }
  }

  const handleGraphicsMouseOver = () => {
    if (!isSmallScreen) {
      resetAllStates()
      setGraphicsMouseOver(true)
    }
  }

  const handleVideoMouseClick = () => {
    if (isSmallScreen) {
      resetAllStates()
      setVideoMouseClick(!videoMouseClick)
    }
  }

  const handleVideoMouseOver = () => {
    if (!isSmallScreen) {
      resetAllStates()
      setVideoMouseOver(true)
    }
  }

  const handleTeleMouseClick = () => {
    if (isSmallScreen) {
      resetAllStates()
      setTeleMouseClick(!teleMouseClick)
    }
  }

  const handleTeleMouseOver = () => {
    if (!isSmallScreen) {
      resetAllStates()
      setTeleMouseOver(true)
    }
  }

  const handleSupportClick = () => {
    if (isSmallScreen) {
      let x = document.getElementById('myDIV')
      if (x.style.display === 'block') {
        x.style.display = 'none'
      }
    }
  }

  const handleProductHover = () => {
    if (!isSmallScreen) {
      setProductHover(true)
    }
  }

  const handleProductLeave = () => {
    if (!isSmallScreen) {
      setProductHover(false)
    }
  }

  const handleProductClick = () => {
    if (isSmallScreen) {
      let x = document.getElementById('myDIV')
      if (x.style.display === 'none' || x.style.display === '') {
        x.style.display = 'block'
      } else {
        x.style.display = 'none'
      }
    } else {
      setDropdownOpen(!isDropdownOpen)
      setProductHover(!productHover)
    }
  }

  const handleTechMouseEnter = () => {
    setTechMouseEnter(true)
    setDigitalMouseEnter(false)
    setSalesMouseEnter(false)
    if (!isMobileView) {
      setActiveDropdown('hardware')
    }
  }

  const handleDigitalMouseEnter = () => {
    setDigitalMouseEnter(true)
    setSalesMouseEnter(false)
    setTechMouseEnter(false)
    if (!isMobileView) {
      setActiveDropdown('web')
    }
  }
  const handleSalesMouseEnter = () => {
    setSalesMouseEnter(true)
    setTechMouseEnter(false)
    setDigitalMouseEnter(false)
  }

  //============================================================================= //
  const [scroll, setScroll] = useState(false)

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY

    setScroll(scrollY >= 420)

    if (scrollY >= 50 && scrollY < 12000) {
      setScroll(true)
    } else {
      setScroll(false)
    }
  }, [])

  // useEffect(() => {
  //   if (!isMobileView && initialLoad) {
  //     handleTechMouseEnter();
  //     setInitialLoad(false);
  //   }
  // }, [isMobileView]);

  // ============================================================= //
  // useEffect(() => {
  //   const dropdown = document.getElementById("myDIV");
  //   if (isSmallScreen && productHover) {
  //     dropdown.style.display = "block";
  //   } else if (!isSmallScreen && productHover) {
  //     dropdown.style.display = "block";
  //   } else {
  //     dropdown.style.display = "none";
  //   }
  // }, [isSmallScreen, productHover]);

  // // ================================================================== //

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // ==================== ===================================
  useEffect(() => {
    $('.solutions-items li').on('mouseenter', function () {
      $('.solutions-items li').removeClass('solutions-items-active')
      $(this).addClass('solutions-items-active')
    })
  })
  // =======================================================
  useEffect(() => {
    $('.strategic-items li').on('mouseenter', function () {
      $('.strategic-items li').removeClass('strategic-items-active')
      $(this).addClass('strategic-items-active')
    })
  })
  // =======================================================
  useEffect(() => {
    $('.productss-items li').on('mouseenter', function () {
      $('.productss-items li').removeClass('productss-items-active')
      $(this).addClass('productss-items-active')
    })
  })
  // =======================================================
  useEffect(() => {
    $('.whoo-items li').on('mouseenter', function () {
      $('.whoo-items li').removeClass('whoo-items-active')
      $(this).addClass('whoo-items-active')
    })
  })

  // ========================================================================= //

  useEffect(() => {
    let classList = document.getElementById('here').classList
    let minWidth769 = window.matchMedia('(min-width: 769px)')

    const match = e => {
      minWidth769.matches
        ? classList.add('drop-show')
        : classList.remove('drop-show')
    }
    match()
  })

  // =================== third drop down   ====================================

  useEffect(() => {
    let classList = document.getElementById('here3').classList
    let minWidth769 = window.matchMedia('(min-width: 769px)')

    const match = e => {
      minWidth769.matches
        ? classList.add('drop-show')
        : classList.remove('drop-show')
    }
    match()
  })

  // =================== fourth drop down   ====================================

  useEffect(() => {
    let classList = document.getElementById('here4').classList
    let minWidth769 = window.matchMedia('(min-width: 769px)')

    const match = e => {
      minWidth769.matches
        ? classList.add('drop-show')
        : classList.remove('drop-show')
    }
    match()
  })
  // =================== fifth drop down   ====================================

  useEffect(() => {
    let classList = document.getElementById('here5').classList
    var minWidth769 = window.matchMedia('(min-width: 769px)')

    const match = e => {
      minWidth769.matches
        ? classList.add('drop-show')
        : classList.remove('drop-show')
    }
    match()
  })

  // const [scroll, setScroll] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 50) // Adjust the scroll threshold as needed
    }

    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)

    return () => {
      // Clean up event listeners
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <nav
  id='navbarShow'
  className={`navbar navbar-dark fixed-top ${
    scroll ? 'NAVbar' : 'NAVba'
  } ${windowWidth > 1236 ? 'navbar-expand-lg' : ''}`}
>
  <div className='container-fluid'>
    <Link to={'/'} className='navbar-brand border-0'>
      <img
        src={logo}
        id='elonatech-logo-home'
        className='lazyload border-0'
        alt='Elonatech Logo'
      />
    </Link>
    <button
      className='navbar-toggler custom-toggler'
      type='button'
      data-bs-toggle='offcanvas'
      data-bs-target='#offcanvasNavbar2'
      aria-controls='offcanvasNavbar2'
      aria-label='Toggle navigation'
    >
      <span className='navbar-toggler-icon'></span>
    </button>
    <div
      className='offcanvas offcanvas-end navbar-bg-change'
      style={{ width: '350px', height: '608px' }}
      tabIndex='-1'
      id='offcanvasNavbar2'
      aria-labelledby='offcanvasNavbar2Label'
    >
      <div className='offcanvas-header'>
        <h5
          className='offcanvas-title text-dark'
          id='offcanvasNavbar2Label'
        ></h5>
        <div
          className='btn-close btn-close-white active dismiss-nav-man'
          data-bs-dismiss='offcanvas'
          aria-label='Close'
        ></div>
      </div>
      <div className='offcanvas-body'>
        <ul className='navbar-nav mx-auto'>
          {/*============================================  first drop down ===============================================*/}
          <li className='nav-item pe-4'>
            <Link
              to={'/'}
              className='nav-link fw-bold active dismiss-nav-man'
              data-bs-dismiss='offcanvas'
            >
              <i className='bi bi-house-fill'></i>
            </Link>
          </li>
          <li
            className='nav-item mx-0   pe-2 my-md-0 active elonatechlistItem'
            onMouseEnter={handleProductHover}
          >
            <a
              onClick={handleProductClick}
              style={{ fontWeight: 'bold' }}
              className='nav-link e-fonte text-white dropdown-toggle'
            >
              Solutions
            </a>
            <ul
              id='myDIV'
              className={
                productHover
                  ? 'elonatechinnerListContainer '
                  : 'elonatechmainDropdownDone'
              }
            >
              <li className='elonatechinnerListItemLeft'>
                <ul className='elonatechinnerListContentLeft'>
                  <li
                    className={
                      techMouseEnter
                        ? 'elonatechinnerListItemContentLeftActive'
                        : 'elonatechinnerListItemContentLeft'
                    }
                    onMouseEnter={handleTechMouseEnter}
                  >
                    {' '}
                    <h6 className='techCenter'>Tech Solutions</h6>
                  </li>
                  <li
                    className={
                      digitalMouseEnter
                        ? 'elonatechinnerListItemContentLeftActive'
                        : 'elonatechinnerListItemContentLeft'
                    }
                    onMouseEnter={handleDigitalMouseEnter}
                  >
                    <h6 className='techCenter'>Digital Solutions</h6>
                  </li>
                  <li
                    className={
                      salesMouseEnter
                        ? 'elonatechinnerListItemContentLeftActive'
                        : 'elonatechinnerListItemContentLeft'
                    }
                    onMouseEnter={handleSalesMouseEnter}
                  >
                    <h6 className='techCenter'>Sales/ Supply</h6>
                  </li>
                </ul>
              </li>
              {/* <hr className='elonatechline' /> */}
              <div className='elonatechline'></div>
              <li className='elonatechinnerListItemRight'>
                <ul className='elonatechinnerListContentRight'>
                  {/*=========================================== TECH SOLUTIONS ( RIGHTSIDE) ===========================================*/}
                  <li className='elonatechinnerListContentRight'>
                    <ul
                      className={
                        techMouseEnter
                          ? 'elonatechinnerListItemContentRightTechListActive'
                          : 'elonatechinnerListItemContentRightTechList'
                      }
                    >
                      {/*===================================== HARDWARE SOLUTIONS =============================================================*/}
                      <li
                        className={
                          'elonatechinnerListItemContentRightTechListItem'
                        }
                        onMouseEnter={() => setActiveDropdown('hardware')}
                      >
                        <div className='elonatechtest'>
                          <h6
                            onClick={() =>
                              setActiveDropdown(
                                activeDropdown === 'hardware'
                                  ? null
                                  : 'hardware'
                              )
                            }
                            className={
                              activeDropdown === 'hardware'
                                ? 'elonatechinnerListItemContentRightTechListTitleActive elonatechSolutionsTitle'
                                : 'elonatechinnerListItemContentRightTechListTitle elonatechSolutionsTitle'
                            }
                          >
                            Hardware Solutions
                          </h6>
                          <i className='bi bi-plus text-dark fs-3'></i>
                        </div>
                        <ul
                          className={
                            activeDropdown === 'hardware'
                              ? 'elonatechhardwareSolutionsListActive'
                              : 'elonatechhardwareSolutionsList'
                          }
                        >
                          <Link
                            to={'/hardware-engineering'}
                            className='text-decoration-none text-dark dismiss-nav-man'
                            data-bs-dismiss='offcanvas'
                          >
                            <li
                              className={
                                'elonatechhardwareSolutionsListItem'
                              }
                            >
                              <img
                                data-src={hardwareComputer}
                                className='lazyload'
                                alt=''
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  objectFit: 'contain',
                                  alignSelf: 'center'
                                }}
                              />
                              Computer Engineering
                            </li>
                          </Link>
                          <Link
                            to={'/printer-repair'}
                            className='text-decoration-none text-dark dismiss-nav-man'
                            data-bs-dismiss='offcanvas'
                          >
                            <li
                              className={
                                'elonatechhardwareSolutionsListItem'
                              }
                            >
                              <img
                                data-src={hardwareOffice}
                                className='lazyload'
                                alt=''
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  objectFit: 'contain',
                                  alignSelf: 'center'
                                }}
                              />
                              Printers
                            </li>
                          </Link>
                          <Link
                            to={'/mobile-repair'}
                            className='text-decoration-none text-dark dismiss-nav-man'
                            data-bs-dismiss='offcanvas'
                          >
                            <li
                              className={
                                'elonatechhardwareSolutionsListItem'
                              }
                            >
                              <img
                                data-src={hardwarePhone}
                                className='lazyload'
                                alt=''
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  objectFit: 'contain',
                                  alignSelf: 'center'
                                }}
                              />
                              Mobile Devices
                            </li>
                          </Link>
                          <Link
                            to={'/network'}
                            className='text-decoration-none text-dark dismiss-nav-man'
                            data-bs-dismiss='offcanvas'
                          >
                            <li
                              className={
                                'elonatechhardwareSolutionsListItem'
                              }
                            >
                              <img
                                data-src={hardwareMaintenance}
                                className='lazyload'
                                alt=''
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  objectFit: 'contain',
                                  alignSelf: 'center'
                                }}
                              />
                              Networking Equipment
                            </li>
                          </Link>
                        </ul>
                      </li>

                      {/*=============================================== NETWORK SOLUTIONS ====================================================*/}
                      <li
                        className={
                          'elonatechinnerListItemContentRightTechListItem'
                        }
                        onMouseEnter={() => setActiveDropdown('network')}
                      >
                        <div className='elonatechtest'>
                          <h6
                            onClick={() =>
                              setActiveDropdown(
                                activeDropdown === 'network'
                                  ? null
                                  : 'network'
                              )
                            }
                            className={
                              activeDropdown === 'network'
                                ? 'elonatechinnerListItemContentRightTechListTitleActive elonatechSolutionsTitle'
                                : 'elonatechinnerListItemContentRightTechListTitle elonatechSolutionsTitle'
                            }
                          >
                            Network Solutions
                          </h6>
                          <i className='bi bi-plus text-dark fs-3'></i>
                        </div>
                        <ul
                          className={
                            activeDropdown === 'network'
                              ? 'elonatechnetworkAdministrationListActive'
                              : 'elonatechnetworkAdministrationList'
                          }
                        >
                          <Link
                            to={'/network-administration-implementation'}
                            className='text-decoration-none text-dark dismiss-nav-man'
                            data-bs-dismiss='offcanvas'
                          >
                            <li
                              className={
                                'elonatechnetworkAdministrationListItem'
                              }
                            >
                              <img
                                data-src={networkAdmin}
                                className='lazyload'
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  objectFit: 'contain',
                                  alignSelf: 'center'
                                }}
                              />
                              Network Admin/Implementation
                            </li>
                          </Link>
                          <Link
                            to={'/network-security'}
                            className='text-decoration-none text-dark dismiss-nav-man'
                            data-bs-dismiss='offcanvas'
                          >
                            <li
                              className={
                                'elonatechnetworkAdministrationListItem'
                              }
                            >
                              <img
                                data-src={networkSecurity}
                                className='lazyload'
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  objectFit: 'contain',
                                  alignSelf: 'center'
                                }}
                              />
                              Network Security
                            </li>
                          </Link>
                          <Link
                            to={'/server-administration'}
                            className='text-decoration-none text-dark dismiss-nav-man'
                            data-bs-dismiss='offcanvas'
                          >
                            <li
                              className={
                                'elonatechnetworkAdministrationListItem'
                              }
                            >
                              <img
                                data-src={networkServer}
                                className='lazyload'
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  objectFit: 'contain',
                                  alignSelf: 'center'
                                }}
                              />
                              Server Administration
                            </li>
                          </Link>
                          <Link
                            to={'/system-integration'}
                            className='text-decoration-none text-dark dismiss-nav-man'
                            data-bs-dismiss='offcanvas'
                          >
                            <li
                              className={
                                'elonatechnetworkAdministrationListItem'
                              }
                            >
                              <img
                                data-src={networkInfastructure}
                                className='lazyload'
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  objectFit: 'contain',
                                  alignSelf: 'center'
                                }}
                              />
                              Infrastructure / System Integration
                            </li>
                          </Link>
                          <Link
                            to={'/structure-cabling'}
                            className='text-decoration-none text-dark dismiss-nav-man'
                            data-bs-dismiss='offcanvas'
                          >
                            <li
                              className={
                                'elonatechnetworkAdministrationListItem'
                              }
                            >
                              <img
                                data-src={networkCabling}
                                className='lazyload'
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  objectFit: 'contain',
                                  alignSelf: 'center'
                                }}
                              />
                              Structured Cabling
                            </li>
                          </Link>
                          <Link
                            to={'/cctv'}
                            className='text-decoration-none text-dark dismiss-nav-man'
                            data-bs-dismiss='offcanvas'
                          >
                            <li
                              className={
                                'elonatechnetworkAdministrationListItem'
                              }
                            >
                              <img
                                data-src={networkCctv}
                                className='lazyload'
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  objectFit: 'contain',
                                  alignSelf: 'center'
                                }}
                              />
                              CCTV Installation
                            </li>
                          </Link>
                          <Link
                            to={'/internet'}
                            className='text-decoration-none text-dark dismiss-nav-man'
                            data-bs-dismiss='offcanvas'
                          >
                            <li
                              className={
                                'elonatechnetworkAdministrationListItem'
                              }
                            >
                              <img
                                data-src={networkInternet}
                                className='lazyload'
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  objectFit: 'contain',
                                  alignSelf: 'center'
                                }}
                              />
                              Internet Solutions
                            </li>
                          </Link>
                        </ul>
                      </li>

                      {/*================================================ SOFTWARE SOLUTIONS =================================================*/}
                      <li
                        className={
                          'elonatechinnerListItemContentRightTechListItem'
                        }
                        onMouseEnter={() => setActiveDropdown('software')}
                      >
                        <div className='elonatechtest'>
                          <h6
                            onClick={() =>
                              setActiveDropdown(
                                activeDropdown === 'software'
                                  ? null
                                  : 'software'
                              )
                            }
                            className={
                              activeDropdown === 'software'
                                ? 'elonatechinnerListItemContentRightTechListTitleActive elonatechSolutionsTitle'
                                : 'elonatechinnerListItemContentRightTechListTitle elonatechSolutionsTitle'
                            }
                          >
                            Software Solutions
                          </h6>
                          <i className='bi bi-plus text-dark fs-3'></i>
                        </div>
                        <ul
                          className={
                            activeDropdown === 'software'
                              ? 'elonatechsoftwareSolutionsListActive'
                              : 'elonatechsoftwareSolutionsList'
                          }
                        >
                          <Link
                            to={'/system-software'}
                            className='text-decoration-none text-dark dismiss-nav-man'
                            data-bs-dismiss='offcanvas'
                          >
                            <li
                              className={
                                'elonatechsoftwareSolutionsListListItem'
                              }
                            >
                              <img
                                data-src={softwareSystem}
                                className='lazyload'
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  objectFit: 'contain',
                                  alignSelf: 'center'
                                }}
                              />
                              System Software
                            </li>
                          </Link>
                          <Link
                            to={'/application-software'}
                            className='text-decoration-none text-dark dismiss-nav-man'
                            data-bs-dismiss='offcanvas'
                          >
                            <li
                              className={
                                'elonatechsoftwareSolutionsListListItem'
                              }
                            >
                              <img
                                data-src={softwareApplication}
                                className='lazyload'
                                alt=''
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  objectFit: 'contain',
                                  alignSelf: 'center'
                                }}
                              />
                              Application Software
                            </li>
                          </Link>
                          <Link
                            to={'/business-software'}
                            className='text-decoration-none text-dark dismiss-nav-man'
                            data-bs-dismiss='offcanvas'
                          >
                            <li
                              className={
                                'elonatechsoftwareSolutionsListListItem'
                              }
                            >
                              <img
                                data-src={softwareBusiness}
                                className='lazyload'
                                alt=''
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  objectFit: 'contain',
                                  alignSelf: 'center'
                                }}
                              />
                              Business Application Software
                            </li>
                          </Link>
                        </ul>
                      </li>

                      {/*=================================================== COMMUNICATION ================================================*/}
                      <li
                        className={
                          'elonatechinnerListItemContentRightTechListItem'
                        }
                        onMouseEnter={() => setActiveDropdown('telecom')}
                      >
                        <div className='elonatechtest'>
                          <h6
                            onClick={() =>
                              setActiveDropdown(
                                activeDropdown === 'telecom'
                                  ? null
                                  : 'telecom'
                              )
                            }
                            className={
                              activeDropdown === 'telecom'
                                ? 'elonatechinnerListItemContentRightTechListTitleActive elonatechSolutionsTitle'
                                : 'elonatechinnerListItemContentRightTechListTitle elonatechSolutionsTitle'
                            }
                          >
                            Communication
                          </h6>
                          <i className='bi bi-plus text-dark fs-3'></i>
                        </div>
                        <ul
                          className={
                            activeDropdown === 'telecom'
                              ? 'elonatechtelecomsListActive'
                              : 'elonatechtelecomsList'
                          }
                        >
                          <Link
                            to={'/ip-telephony'}
                            className='text-decoration-none text-dark dismiss-nav-man'
                            data-bs-dismiss='offcanvas'
                          >
                            <li
                              className={'elonatechtelecomsListListItem'}
                            >
                              <img
                                data-src={telecomsIp}
                                className='lazyload'
                                alt=''
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  objectFit: 'contain',
                                  alignSelf: 'center'
                                }}
                              />
                              IP Telephony & PBX Systems
                            </li>
                          </Link>
                          <Link
                            to={'/voip'}
                            className='text-decoration-none text-dark dismiss-nav-man'
                            data-bs-dismiss='offcanvas'
                          >
                            <li
                              className={'elonatechtelecomsListListItem'}
                            >
                              <img
                                data-src={telecomsVoip}
                                className='lazyload'
                                alt=''
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  objectFit: 'contain',
                                  alignSelf: 'center'
                                }}
                              />
                              VoIP
                            </li>
                          </Link>
                        </ul>
                      </li>

                      {/*======================================================== ACCESS & SECURITY ==========================================*/}
                      <li
                        className={
                          'elonatechinnerListItemContentRightTechListItem'
                        }
                        onMouseEnter={() => setActiveDropdown('system')}
                      >
                        <div className='elonatechtest'>
                          <h6
                            onClick={() =>
                              setActiveDropdown(
                                activeDropdown === 'system'
                                  ? null
                                  : 'system'
                              )
                            }
                            className={
                              activeDropdown === 'system'
                                ? 'elonatechinnerListItemContentRightTechListTitleActive elonatechSolutionsTitle'
                                : 'elonatechinnerListItemContentRightTechListTitle elonatechSolutionsTitle'
                            }
                          >
                            Access & Security
                          </h6>
                          <i className='bi bi-plus text-dark fs-3'></i>
                        </div>
                        <ul
                          className={
                            activeDropdown === 'system'
                              ? 'elonatechsystemSecurityListActive'
                              : 'elonatechsystemSecurityList'
                          }
                        >
                          <Link
                            to={'/access-control'}
                            className='text-decoration-none text-dark dismiss-nav-man'
                            data-bs-dismiss='offcanvas'
                          >
                            <li
                              className={
                                'elonatechsystemSecurityListListItem'
                              }
                            >
                              <img
                                data-src={systemAccess}
                                className='lazyload'
                                alt=''
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  objectFit: 'contain',
                                  alignSelf: 'center'
                                }}
                              />
                              Access Control
                            </li>
                          </Link>
                          <Link
                            to={'/time-management'}
                            className='text-decoration-none text-dark dismiss-nav-man'
                            data-bs-dismiss='offcanvas'
                          >
                            <li
                              className={
                                'elonatechsystemSecurityListListItem'
                              }
                            >
                              <img
                                data-src={systemTime}
                                className='lazyload'
                                alt=''
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  objectFit: 'contain',
                                  alignSelf: 'center'
                                }}
                              />
                              Time Management Solutions
                            </li>
                          </Link>
                          <Link
                            to={'/surveillance'}
                            className='text-decoration-none text-dark dismiss-nav-man'
                            data-bs-dismiss='offcanvas'
                          >
                            <li
                              className={
                                'elonatechsystemSecurityListListItem'
                              }
                            >
                              <img
                                data-src={systemSurveillnance}
                                className='lazyload'
                                alt=''
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  objectFit: 'contain',
                                  alignSelf: 'center'
                                }}
                              />
                              Surveillance
                            </li>
                          </Link>
                        </ul>
                      </li>
                    </ul>
                  </li>

                  {/*================================================= DIGITAL SOLUTION CONTENT ( RIGHTSIDE) ===============================*/}
                  <li className='elonatechinnerListContentRight'>
                    <ul
                      className={
                        digitalMouseEnter
                          ? 'elonatechinnerListItemContentRightDigitalListActive'
                          : 'elonatechinnerListItemContentRightDigitalList'
                      }
                    >
                      {/*============================================================ web solution ==============================================*/}
                      <li
                        className={
                          'elonatechinnerListItemContentRightDigitalListItem'
                        }
                        onMouseEnter={() => setActiveDropdown('web')}
                      >
                        {' '}
                        <div className='elonatechtest'>
                          {' '}
                          <h6
                            onClick={() =>
                              setActiveDropdown(
                                activeDropdown === 'web' ? null : 'web'
                              )
                            }
                            className={
                              activeDropdown === 'web'
                                ? 'elonatechinnerListItemContentRightTechListTitleActive elonatechSolutionsTitle'
                                : 'elonatechinnerListItemContentRightTechListTitle elonatechSolutionsTitle'
                            }
                          >
                            Web & App Solutions{' '}
                          </h6>{' '}
                          <i className='bi bi-plus text-dark fs-3'></i>{' '}
                        </div>
                        <ul
                          className={
                            activeDropdown === 'web'
                              ? 'elonatechwebSolutionsListActive'
                              : 'elonatechwebSolutionsList'
                          }
                        >
                          <Link
                            to={'/web-design'}
                            className='text-decoration-none text-dark dismiss-nav-man'
                            data-bs-dismiss='offcanvas'
                          >
                            <li className='elonatechwebSolutionsListItem'>
                              {' '}
                              <img
                                data-src={webDev}
                                className='lazyload'
                                alt=''
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  objectFit: 'contain',
                                  alignSelf: 'center'
                                }}
                              />
                              Web Design/Dev.
                            </li>
                          </Link>
                          <Link
                            to={'/app-development'}
                            className='text-decoration-none text-dark dismiss-nav-man'
                            data-bs-dismiss='offcanvas'
                          >
                            <li className='elonatechwebSolutionsListItem'>
                              {' '}
                              <img
                                data-src={appDev}
                                className='lazyload'
                                alt=''
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  objectFit: 'contain',
                                  alignSelf: 'center'
                                }}
                              />
                              App Design/Dev.
                            </li>
                          </Link>
                          <Link
                            to={'/domain'}
                            className='text-decoration-none text-dark dismiss-nav-man'
                            data-bs-dismiss='offcanvas'
                          >
                            <li className='elonatechwebSolutionsListItem'>
                              {' '}
                              <img
                                data-src={webDomain}
                                className='lazyload'
                                alt=''
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  objectFit: 'contain',
                                  alignSelf: 'center'
                                }}
                              />{' '}
                              Domain Reg./DNS Mgt{' '}
                            </li>
                          </Link>
                          <Link
                            to={'/hosting'}
                            className='text-decoration-none text-dark dismiss-nav-man'
                            data-bs-dismiss='offcanvas'
                          >
                            <li className='elonatechwebSolutionsListItem '>
                              {' '}
                              <img
                                data-src={WebHost}
                                className='lazyload'
                                alt=''
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  objectFit: 'contain',
                                  alignSelf: 'start'
                                }}
                              />{' '}
                              <span className='text-'>Web Hosting</span>{' '}
                            </li>
                          </Link>
                        </ul>
                      </li>
                      {/*============================================================  digital marketing =====================================*/}
                      <li
                        className={
                          'elonatechinnerListItemContentRightDigitalListItem'
                        }
                        onMouseEnter={() =>
                          setActiveDropdown('digitalMarketing')
                        }
                      >
                        <div className='elonatechtest'>
                          <h6
                            onClick={() =>
                              setActiveDropdown(
                                activeDropdown === 'digitalMarketing'
                                  ? null
                                  : 'digitalMarketing'
                              )
                            }
                            className={
                              activeDropdown === 'digitalMarketing'
                                ? 'elonatechinnerListItemContentRightTechListTitleActive elonatechSolutionsTitle'
                                : 'elonatechinnerListItemContentRightTechListTitle elonatechSolutionsTitle'
                            }
                          >
                            Digital Marketing
                          </h6>
                          <i className='bi bi-plus text-dark fs-3'></i>
                        </div>
                        <ul
                          className={
                            activeDropdown === 'digitalMarketing'
                              ? 'elonatechdigitalMarketingListActive'
                              : 'elonatechdigitalMarketingList'
                          }
                        >
                          <Link
                            to={'/digital-marketing'}
                            className='text-decoration-none text-dark dismiss-nav-man'
                            data-bs-dismiss='offcanvas'
                          >
                            <li
                              className={
                                'elonatechdigitalMarketingListItem'
                              }
                            >
                              {' '}
                              <img
                                data-src={digitalDigital}
                                className='lazyload'
                                alt=''
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  objectFit: 'contain',
                                  alignSelf: 'center'
                                }}
                              />{' '}
                              Digital Marketing
                            </li>
                          </Link>
                          <Link
                            to={'/social-media-marketing'}
                            className='text-decoration-none text-dark dismiss-nav-man'
                            data-bs-dismiss='offcanvas'
                          >
                            <li
                              className={
                                'elonatechdigitalMarketingListItem'
                              }
                            >
                              {' '}
                              <img
                                data-src={digitalSocial}
                                className='lazyload'
                                alt=''
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  objectFit: 'contain',
                                  alignSelf: 'center'
                                }}
                              />{' '}
                              Social Media Marketing
                            </li>
                          </Link>
                          <Link
                            to={'/email-marketing'}
                            className='text-decoration-none text-dark dismiss-nav-man'
                            data-bs-dismiss='offcanvas'
                          >
                            <li
                              className={
                                'elonatechdigitalMarketingListItem'
                              }
                            >
                              {' '}
                              <img
                                data-src={digitalEmail}
                                className='lazyload'
                                alt=''
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  objectFit: 'contain',
                                  alignSelf: 'center'
                                }}
                              />{' '}
                              Email Marketing
                            </li>
                          </Link>
                          <Link
                            to={'/seo'}
                            className='text-decoration-none text-dark dismiss-nav-man'
                            data-bs-dismiss='offcanvas'
                          >
                            <li
                              className={
                                'elonatechdigitalMarketingListItem'
                              }
                            >
                              {' '}
                              <img
                                data-src={digitalSeo}
                                className='lazyload'
                                alt=''
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  objectFit: 'contain',
                                  alignSelf: 'center'
                                }}
                              />{' '}
                              SEO
                            </li>
                          </Link>
                          <Link
                            to={'/content-marketing'}
                            className='text-decoration-none text-dark dismiss-nav-man'
                            data-bs-dismiss='offcanvas'
                          >
                            <li
                              className={
                                'elonatechdigitalMarketingListItem'
                              }
                            >
                              {' '}
                              <img
                                data-src={digitalContent}
                                className='lazyload'
                                alt=''
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  objectFit: 'contain',
                                  alignSelf: 'center'
                                }}
                              />{' '}
                              Content Marketing
                            </li>
                          </Link>
                          <Link
                            to={'/ppc'}
                            className='text-decoration-none text-dark dismiss-nav-man'
                            data-bs-dismiss='offcanvas'
                          >
                            <li
                              className={
                                'elonatechdigitalMarketingListItem'
                              }
                            >
                              {' '}
                              <img
                                data-src={digitalPpc}
                                className='lazyload'
                                alt=''
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  objectFit: 'contain',
                                  alignSelf: 'center'
                                }}
                              />{' '}
                              PPC/CPI
                            </li>
                          </Link>
                        </ul>
                      </li>
                      {/*======================================================== graphic =======================================================*/}
                      <li
                        className={
                          'elonatechinnerListItemContentRightDigitalListItem'
                        }
                        onMouseEnter={() => setActiveDropdown('graphics')}
                      >
                        <div className='elonatechtest'>
                          <h6
                            onClick={() =>
                              setActiveDropdown(
                                activeDropdown === 'graphics'
                                  ? null
                                  : 'graphics'
                              )
                            }
                            className={
                              activeDropdown === 'graphics'
                                ? 'elonatechinnerListItemContentRightTechListTitleActive elonatechSolutionsTitle'
                                : 'elonatechinnerListItemContentRightTechListTitle elonatechSolutionsTitle'
                            }
                          >
                            Graphics
                          </h6>
                          <i className='bi bi-plus text-dark fs-3'></i>
                        </div>
                        <ul
                          className={
                            activeDropdown === 'graphics'
                              ? 'elonatechgraphicsListActive'
                              : 'elonatechgraphicsList'
                          }
                        >
                          <Link
                            to={'/graphics-design'}
                            className='text-decoration-none text-dark dismiss-nav-man'
                            data-bs-dismiss='offcanvas'
                          >
                            {' '}
                            <li className='elonatechgraphicsListListItem'>
                              {' '}
                              <img
                                data-src={graphicsGraphics}
                                className='lazyload'
                                alt=''
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  objectFit: 'contain',
                                  alignSelf: 'center'
                                }}
                              />{' '}
                              Graphic
                            </li>
                          </Link>
                          <Link
                            to={'/brand-identity'}
                            className='text-decoration-none text-dark dismiss-nav-man'
                            data-bs-dismiss='offcanvas'
                          >
                            {' '}
                            <li className='elonatechgraphicsListListItem'>
                              {' '}
                              <img
                                data-src={graphicsBrand}
                                className='lazyload'
                                alt=''
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  objectFit: 'contain',
                                  alignSelf: 'center'
                                }}
                              />{' '}
                              Brand Development
                            </li>
                          </Link>
                          <Link
                            to={'/uiux'}
                            className='text-decoration-none text-dark dismiss-nav-man'
                            data-bs-dismiss='offcanvas'
                          >
                            <li className='elonatechgraphicsListListItem'>
                              {' '}
                              <img
                                data-src={graphicsUiux}
                                className='lazyload'
                                alt=''
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  objectFit: 'contain',
                                  alignSelf: 'center'
                                }}
                              />{' '}
                              UI/UX & Prototyping
                            </li>
                          </Link>
                        </ul>
                      </li>
                      {/*================================================================== video animation ========================================*/}
                      <li
                        className={
                          'elonatechinnerListItemContentRightDigitalListItem'
                        }
                        onMouseEnter={() =>
                          setActiveDropdown('videoAnimations')
                        }
                      >
                        <div className='elonatechtest'>
                          <h6
                            onClick={() =>
                              setActiveDropdown(
                                activeDropdown === 'videoAnimations'
                                  ? null
                                  : 'videoAnimations'
                              )
                            }
                            className={
                              activeDropdown === 'videoAnimations'
                                ? 'elonatechinnerListItemContentRightTechListTitleActive elonatechSolutionsTitle'
                                : 'elonatechinnerListItemContentRightTechListTitle elonatechSolutionsTitle'
                            }
                          >
                            Video Animations
                          </h6>
                          <i className='bi bi-plus text-dark fs-3'></i>
                        </div>
                        <ul
                          className={
                            activeDropdown === 'videoAnimations'
                              ? 'elonatechvideoAnimationsListActive'
                              : 'elonatechvideoAnimationsList'
                          }
                        >
                          <Link
                            to={'/animation'}
                            className='text-decoration-none text-dark dismiss-nav-man'
                            data-bs-dismiss='offcanvas'
                          >
                            <li className='elonatechvideoAnimationsListListItem'>
                              {' '}
                              <img
                                data-src={video3d}
                                className='lazyload'
                                alt=''
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  objectFit: 'contain',
                                  alignSelf: 'center'
                                }}
                              />{' '}
                              2D/3D Animations
                            </li>
                          </Link>
                          <Link
                            to={'/motion-graphics'}
                            className='text-decoration-none text-dark dismiss-nav-man'
                            data-bs-dismiss='offcanvas'
                          >
                            <li className='elonatechvideoAnimationsListListItem'>
                              {' '}
                              <img
                                data-src={videoMotion}
                                className='lazyload'
                                alt=''
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  objectFit: 'contain',
                                  alignSelf: 'center'
                                }}
                              />{' '}
                              Motion Graphics
                            </li>
                          </Link>
                          <Link
                            to={'/video-editing'}
                            className='text-decoration-none text-dark dismiss-nav-man'
                            data-bs-dismiss='offcanvas'
                          >
                            <li className='elonatechvideoAnimationsListListItem'>
                              {' '}
                              <img
                                data-src={videoEdit}
                                className='lazyload'
                                alt=''
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  objectFit: 'contain',
                                  alignSelf: 'center'
                                }}
                              />{' '}
                              Video Editing
                            </li>
                          </Link>
                        </ul>
                      </li>
                      {/*============================================== teleconferencing ============================================================*/}
                      <li
                        className={
                          'elonatechinnerListItemContentRightDigitalListItem'
                        }
                        onMouseEnter={() =>
                          setActiveDropdown('teleconferencing')
                        }
                      >
                        <div className='elonatechtest'>
                          <h6
                            onClick={() =>
                              setActiveDropdown(
                                activeDropdown === 'teleconferencing'
                                  ? null
                                  : 'teleconferencing'
                              )
                            }
                            className={
                              activeDropdown === 'teleconferencing'
                                ? 'elonatechinnerListItemContentRightTechListTitleActive elonatechSolutionsTitle'
                                : 'elonatechinnerListItemContentRightTechListTitle elonatechSolutionsTitle'
                            }
                          >
                            Teleconferencing
                          </h6>
                          <i className='bi bi-plus text-dark fs-3'></i>
                        </div>
                        <ul
                          className={
                            activeDropdown === 'teleconferencing'
                              ? 'elonatechteleconferencingListActive'
                              : 'elonatechteleconferencingList'
                          }
                        >
                          <Link
                            to={'/livestreaming'}
                            className='text-decoration-none text-dark dismiss-nav-man'
                            data-bs-dismiss='offcanvas'
                          >
                            <li className='elonatechteleconferencingListListItem'>
                              {' '}
                              <img
                                data-src={teleLivestream}
                                className='lazyload'
                                alt=''
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  objectFit: 'contain',
                                  alignSelf: 'center',
                                  marginBottom: '1rem'
                                }}
                              />{' '}
                              Livestreaming
                            </li>
                          </Link>
                          <Link
                            to={'/videoconferencing'}
                            className='text-decoration-none text-dark dismiss-nav-man'
                            data-bs-dismiss='offcanvas'
                          >
                            <li className='elonatechteleconferencingListListItem'>
                              {' '}
                              <img
                                data-src={teleVideo}
                                className='lazyload'
                                alt=''
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  objectFit: 'contain',
                                  alignSelf: 'center',
                                  marginBottom: '1rem'
                                }}
                              />{' '}
                              Videoconferencing
                            </li>
                          </Link>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  {/*========================================== SALE CONTENT ( RIGHTSIDE) =========================================*/}
                  <li className='elonatechinnerListContentRight'>
                    <ul
                      className={
                        salesMouseEnter
                          ? 'elonatechinnerListItemContentRightSalesListActive'
                          : 'elonatechinnerListItemContentRightSalesList'
                      }
                    >
                      <Link
                        to={'/hardware-supply'}
                        className='text-decoration-none text-dark salePad dismiss-nav-man'
                        data-bs-dismiss='offcanvas'
                      >
                        <li className='elonatechinnerListItemContentRightSalesListItem'>
                          {' '}
                          <img
                            data-src={Salehardware}
                            className='lazyload'
                            alt=''
                            style={{
                              width: '50px',
                              height: '50px',
                              objectFit: 'contain',
                              alignSelf: 'center',
                              marginBottom: '1rem'
                            }}
                          />
                          Hardware{' '}
                        </li>
                      </Link>
                      <Link
                        to={'/software-supply'}
                        className='text-decoration-none text-dark salePad dismiss-nav-man'
                        data-bs-dismiss='offcanvas'
                      >
                        <li className='elonatechinnerListItemContentRightSalesListItem'>
                          {' '}
                          <img
                            data-src={SaleSoftware}
                            className='lazyload'
                            alt=''
                            style={{
                              width: '50px',
                              height: '50px',
                              objectFit: 'contain',
                              alignSelf: 'center',
                              marginBottom: '1rem'
                            }}
                          />
                          Software
                        </li>
                      </Link>
                      <Link
                        to={'/consumables'}
                        className='text-decoration-none text-dark salePad dismiss-nav-man'
                        data-bs-dismiss='offcanvas'
                      >
                        <li className='elonatechinnerListItemContentRightSalesListItem'>
                          {' '}
                          <img
                            data-src={SaleConsumbles}
                            className='lazyload'
                            alt=''
                            style={{
                              width: '50px',
                              height: '50px',
                              objectFit: 'contain',
                              alignSelf: 'center',
                              marginBottom: '1rem'
                            }}
                          />
                          Consumables
                        </li>
                      </Link>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          {/*==================================================================================================  second drop down ===============================================*/}
          <li id='here' className='nav-item   drop-show dropdown  pe-1'>
            <a
              className='nav-link active e-fonte active  dropdown-toggle'
              role='button'
              onClick={handleSupportClick}
              data-bs-toggle='dropdown'
              aria-expanded='false'
            >
              Support
            </a>
            <ul className='dropdown-menu drop-menu border-0 text-center p-4'>
              <ul className='solutions-items list-unstyled'>
                <Link
                  to={'/technical-support'}
                  className='text-decoration-none text-dark'
                >
                  <li
                    className='solutions-items-active dropdown-item  mt-1 p-2 dismiss-nav-man'
                    data-bs-dismiss='offcanvas'
                    aria-label='Close'
                  >
                    Technical Support{' '}
                  </li>
                </Link>
                <Link
                  to={'/network-support'}
                  className='text-decoration-none text-dark'
                >
                  <li
                    className='dropdown-item  mt-1 p-2  dismiss-nav-man'
                    data-bs-dismiss='offcanvas'
                    aria-label='Close'
                  >
                    Network Support
                  </li>
                </Link>
                <Link
                  to={'/remote-support'}
                  className='text-decoration-none text-dark'
                >
                  <li
                    className='dropdown-item  mt-1 p-2 dismiss-nav-man'
                    data-bs-dismiss='offcanvas'
                    aria-label='Close'
                  >
                    Remote Support
                  </li>
                </Link>
              </ul>
            </ul>
          </li>
          {/*=====================================================================================================  third drop down =============================================*/}
          <li id='here3' className='nav-item dropdown drop-show  pe-1'>
            <a
              className='nav-link active e-fonte   dropdown-toggle'
              role='button'
              onClick={handleSupportClick}
              data-bs-toggle='dropdown'
              aria-expanded='false'
            >
              Strategic Services
            </a>
            <ul className='dropdown-menu border-0 drop-menu  text-center p-4'>
              <ul className='strategic-items  list-unstyled'>
                <Link
                  to={'/consulting'}
                  className='text-decoration-none text-dark'
                >
                  <li
                    className='strategic-items-active dropdown-item mt-1 p-2 dismiss-nav-man'
                    data-bs-dismiss='offcanvas'
                  >
                    Consulting
                  </li>
                </Link>
                <Link
                  to={'/retainer-partnership'}
                  className='text-decoration-none text-dark'
                >
                  <li
                    className='dropdown-item  mt-1 p-2 dismiss-nav-man'
                    data-bs-dismiss='offcanvas'
                  >
                    Retainership
                  </li>
                </Link>
                <Link
                  to={'/training'}
                  className='text-decoration-none text-dark'
                >
                  <li
                    className='dropdown-item  mt-1 p-2 dismiss-nav-man'
                    data-bs-dismiss='offcanvas'
                  >
                    Training
                  </li>
                </Link>
              </ul>
            </ul>
          </li>
          {/*=========================================================================================================  fourth drop down ==================================================*/}
          <li id='here4' className='nav-item  dropdown drop-show pe-1'>
            <a
              className='nav-link active  e-fonte  dropdown-toggle'
              onClick={handleSupportClick}
              role='button'
              data-bs-toggle='dropdown'
              aria-expanded='false'
            >
              Products
            </a>
            <ul className='dropdown-menu border-0 drop-menu text-center p-4'>
              <ul className='productss-items list-unstyled'>
                <Link to={'/products'} className='text-decoration-none text-dark'>
                  <li
                    className='productss-items-active dropdown-item  mt-1 p-2 dismiss-nav-man'
                    data-bs-dismiss='offcanvas'
                  >
                    Products
                  </li>
                </Link>
                <Link
                  to={'/computers'}
                  className='text-decoration-none text-dark'
                >
                  <li
                    className='dropdown-item  mt-1 p-2 dismiss-nav-man'
                    data-bs-dismiss='offcanvas'
                  >
                    Computers
                  </li>
                </Link>
                <Link
                  to={'/printers'}
                  className='text-decoration-none text-dark'
                >
                  <li
                    className='dropdown-item  mt-1 p-2 dismiss-nav-man'
                    data-bs-dismiss='offcanvas'
                  >
                    Printers
                  </li>
                </Link>
                <Link
                  to={'/office-equipment'}
                  className='text-decoration-none text-dark'
                >
                  <li
                    className='dropdown-item  mt-1 p-2 dismiss-nav-man'
                    data-bs-dismiss='offcanvas'
                  >
                    Office Equipment
                  </li>
                </Link>
                <Link
                  to={'/pos-system'}
                  className='text-decoration-none text-dark'
                >
                  <li
                    className='dropdown-item  mt-1 p-2 dismiss-nav-man'
                    data-bs-dismiss='offcanvas'
                  >
                    POS Systems
                  </li>
                </Link>
                <Link
                  to={'/network-devices'}
                  className='text-decoration-none text-dark'
                >
                  <li
                    className='dropdown-item  mt-1 p-2 dismiss-nav-man'
                    data-bs-dismiss='offcanvas'
                  >
                    Network Devices
                  </li>
                </Link>
              </ul>
            </ul>
          </li>
          {/*======================================================================================================================  fifth drop down  ===============================================*/}
          <li id='here5' className='nav-item  dropdown drop-show pe-1'>
            <a
              className='nav-link active e-fonte  dropdown-toggle'
              role='button'
              onClick={handleSupportClick}
              data-bs-toggle='dropdown'
              aria-expanded='false'
            >
              Who we are
            </a>
            <ul
              className='dropdown-menu border-0 drop-menu drop-menu text-center p-2'
              style={{ transition: '0.3s' }}
            >
              <ul className='whoo-items list-unstyled'>
                <Link
                  to={'/who-we-are'}
                  className='text-decoration-none text-dark'
                >
                  <li
                    className='whoo-items-active dropdown-item  mt-1 p-2 dismiss-nav-man'
                    data-bs-dismiss='offcanvas'
                  >
                    Company
                  </li>
                </Link>
                <Link
                  to={'/our-team'}
                  className='text-decoration-none text-dark'
                >
                  <li
                    className='dropdown-item  mt-1 p-2 dismiss-nav-man'
                    data-bs-dismiss='offcanvas'
                  >
                    Team
                  </li>
                </Link>
                <Link
                  to={'/portfolio'}
                  className='text-decoration-none text-dark'
                >
                  <li
                    className='dropdown-item  mt-1 p-2 dismiss-nav-man'
                    data-bs-dismiss='offcanvas'
                  >
                    Portfolio
                  </li>
                </Link>
                <Link to={'/blog'} className='text-decoration-none text-dark'>
                  <li
                    className='dropdown-item  mt-1 p-2 dismiss-nav-man'
                    data-bs-dismiss='offcanvas'
                  >
                    Blog
                  </li>
                </Link>
                <Link
                  to={'/career'}
                  className='text-decoration-none text-dark'
                >
                  <li
                    className='dropdown-item  mt-1 p-2 dismiss-nav-man'
                    data-bs-dismiss='offcanvas'
                  >
                    Career
                  </li>
                </Link>
              </ul>
            </ul>
          </li>
          {/*==================================================================================*/}
          <li className='nav-item pe-1'>
            <Link
              to={'/get-in-touch'}
              className='nav-link e-fonte hopper-color text-decoration-none active pe- dismiss-nav-man'
              data-bs-dismiss='offcanvas'
            >
              Get in touch
            </Link>
          </li>
          {currentAdmin === null ? (
            <div></div>
          ) : (
            <li className='nav-item pe-4'>
              <a
                className='nav-link fw-bold active'
                aria-current='page'
                style={{ cursor: 'pointer' }}
                href=''
                onClick={logout}
              >
                <i
                  className='bi bi-box-arrow-right dismiss-nav-man'
                  data-bs-dismiss='offcanvas'
                ></i>
              </a>
            </li>
          )}
        </ul>
        <div className='d-flex ps-0'>
          <div className='social-links d-flex justify-content-center mx-auto pe-3'>
            <Link
              to={'/cart'}
              className='linkedin text-white nav-link fw-bold pe-3 ps-0'
            >
              <i className='fas fa-shopping-cart  position-relative'>
                <span
                  className='position-absolute top-0 start-120 translate-middle badge cart-badge rounded-pill bg-danger dismiss-nav-man'
                  data-bs-dismiss='offcanvas'
                >
                  {totalUniqueItems}
                </span>
              </i>
            </Link>
            <Link
              className='linkedin text-white nav-link fw-bold pe-0 ps-0'
              target='_blank'
              rel='noopener noreferrer'
              to={'https://www.linkedin.com/company/elonatech/'}
            >
              <i className='bi bi-linkedin i-fonte'></i>
            </Link>
            <Link
              className='facebook text-white nav-link fw-bold pe-0'
              target='_blank'
              rel='noopener noreferrer'
              to={'https://www.facebook.com/elonatech'}
            >
              <i className='bi bi-facebook i-fonte'></i>
            </Link>
            <Link
              className='instagram text-white nav-link fw-bold pe-0 '
              target='_blank'
              rel='noopener noreferrer'
              to={'https://www.instagram.com/elonatech'}
            >
              <i className='bi bi-instagram i-fonte'></i>
            </Link>
            <Link
              className='twitter text-white nav-link fw-bold pe-0'
              target='_blank'
              rel='noopener noreferrer'
              to={'https://twitter.com/Elonatech'}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='17'
                height='17'
                fill='currentColor'
                className='bi bi-twitter-x  t-fonte'
                viewBox='0 0 16 16'
              >
                <path d='M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z' />
              </svg>
            </Link>
            <Link
              className='linkedin text-white nav-link fw-bold pe-0'
              target='_blank'
              rel='noopener noreferrer'
              to={'https://www.youtube.com/@elonatech'}
            >
              <i className='bi bi-youtube i-fonte'></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>
    </>
  )
}

export default Navbar