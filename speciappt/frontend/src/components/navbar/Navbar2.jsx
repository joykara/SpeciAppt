import React, { useState, useEffect, useReducer } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { RiMenuLine, RiCloseLine, RiSearchLine } from 'react-icons/ri';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { SlArrowRight, SlArrowLeft } from 'react-icons/sl';
import './navbar.css';
import { Link } from 'react-router-dom';
import List from '../../data/List';
import { IndustriesMenu, ServicesMenu, InsightsMenu, AboutMenu, MobileIndustriesMenu, MobileAboutMenu, MobileInsightsMenu, MobileServicesMenu} from '../../container';
import logo from '../../hemllinLogo.png'

const Navbar = () => {
  //show data on typing in the input
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  // SEARCH FUNCTIONALITY
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'inputText':
        return {
        ...state,
          inputText: action.payload,
        };
      case'showData':
        return {
        ...state,
          showData: action.payload,
        };
      default:
        return state;
    }
  }, {
    inputText: '',
    showData: '',
  });

  const { inputText, showData } = state;

  const handleInputText = (e) => {
    dispatch({ type: 'inputText', payload: e.target.value });
  };
  
  const handleShowData = (e) => {
    dispatch({ type: 'showData', payload: e.target.value });
  };
  
  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    dispatch({ type: 'inputText', payload: lowerCase });
  };
  // SEARCHBAR DISPLAY FUNCTION
  const [showSearchBar, setShowSearchBar] = useState(false);
  const handleShowSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  useEffect(() => {
    AOS.init({
        duration: 1200,
        delay: 1000,
    });
}, []
); //onscroll animation

  // TOOGLE MENU STATES
  const [toggleMenu, setToggleMenu] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);

  const handleToggle = () => {
    setToggleMenu(!toggleMenu);
    handleContent('industries', true);
  };

  // NAVBAR MENU CONTENT FOR DEVICES <768PX
  const [industriesContentVisible, setIndustriesContentVisible] = useState(false);
  const [servicesContentVisible, setServicesContentVisible] = useState(false);
  const [insightsContentVisible, setInsightsContentVisible] = useState(false);
  const [aboutContentVisible, setAboutContentVisible] = useState(false);

  const [mobileInsightsVisible, setMobileInsightsVisible] = useState(false);
  const [mobileAboutVisible, setMobileAboutVisible] = useState(false);
  const [mobileServicesVisible, setMobileServicesVisible] = useState(false);
  const [mobileIndustriesVisible, setMobileIndustriesVisible] = useState(false);


  const handleContentVisible = (section, flag) => {
    const contentStates = {
      industries: setIndustriesContentVisible,
      services: setServicesContentVisible,
      insights: setInsightsContentVisible,
      about: setAboutContentVisible,
    };

    for (const [key, setter] of Object.entries(contentStates)) {
      if (key === section) {
        setter(flag);
        setActiveMenu(section); // Set the active menu item
      } else {
        setter(false);
      }
    }
  };


  // Navbar menu content for devices >768px
  const [industriesContent, setIndustriesContent] = useState(false);
  const [servicesContent, setServicesContent] = useState(false);
  const [insightsContent, setInsightsContent] = useState(false);
  const [aboutContent, setAboutContent] = useState(false);

  const handleContent = (section, flag) => {
  const contentStates = {
    industries: setIndustriesContent,
    services: setServicesContent,
    insights: setInsightsContent,
    about: setAboutContent,
  };

  for (const [key, setter] of Object.entries(contentStates)) {
    if (key === section) {
      setter(flag);
      setActiveMenu(section); // Set the active menu item
      if (section === 'insights') {
        setMobileInsightsVisible(flag); // Set the visibility of MobileInsightsMenu
      }
      else if (section === 'about') {
        setMobileAboutVisible(flag); // Set the visibility of MobileAboutMenu
      }
      else if (section === 'services') {
        setMobileServicesVisible(flag); // Set the visibility of MobileServicesMenu
      }
      else if (section === 'industries') {
        setMobileIndustriesVisible(flag); // Set the visibility of MobileIndustriesMenu
      }
    } else {
      setter(false);
    }
  }
};


  const handleIndustriesContent = () => {
    setActiveDropdown('industries');
  };

  const handleServicesContent = () => {
    setActiveDropdown('services');
  };

  const handleInsightsContent = () => {
    setActiveDropdown('insights');
  };

  const handleAboutContent = () => {
    setActiveDropdown('about');
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <div className="navbar">
      <div className="navbar__logo">
        <button onClick={handleToggle}>
          {toggleMenu ? <RiCloseLine size={50} /> : <RiMenuLine size={40} />}
        </button>
        <div className='navbar-hm__logo'>
          <Link to="/"><img src={logo} alt="" /></Link>
        </div>
      </div>
      {toggleMenu && (
        <div className={`navbar__menu-links ${toggleMenu ? 'show' : ''}`}>
          <div className="navbar__menu-links__container">
            <div className="navbar__menu-links-top">
              <button onClick={handleToggle}>
                {toggleMenu ? (
                  <RiCloseLine color="#fff" size={45} />
                ) : (
                  <RiMenuLine color="#fff" size={30} />
                )}
              </button>
              <div className="navbar-hm__logo">
                <Link to="/"><img src={logo} alt="" /></Link>
              </div>
            </div>
            <div className="menu">
              <div className="show-menu">
                <p
                  onClick={() =>
                    handleContent('industries', true) ||
                    handleContentVisible('industries', !industriesContentVisible)
                  }
                  className={activeMenu === 'industries' ? 'active-link' : ''}
                >
                  <span>Industries</span>
                  <span>{industriesContentVisible ? (  <SlArrowRight color="white" size={15} />) : (  <SlArrowRight color="white" size={15} />)}
                  </span>
                </p>
                {/* Display menu for devices <768px */}
                <div className={`navbar__mini-menu-content ${mobileIndustriesVisible ? 'active' : ''}`} data-aos='slide-left'>
                  <h4>
                    <span onClick={() => handleContent('industries', false)}>
                      <SlArrowLeft color="black" size={15} />
                    </span>
                    Industries
                  </h4>
                  {mobileIndustriesVisible && <MobileIndustriesMenu />}
                </div>
                <p
                  onClick={() =>
                    handleContent('services', true) ||
                    handleContentVisible('services', !servicesContentVisible)
                  }
                  className={activeMenu === 'services' ? 'active-link' : ''}
                >
                  <span>Services</span>
                  <span>{servicesContentVisible ? (  <SlArrowRight color="white" size={15} />) : (  <SlArrowRight color="white" size={15} />)}
                  </span>
                </p>
                <div className={`navbar__mini-menu-content ${mobileServicesVisible ? 'active' : ''}`} data-aos='slide-left'>
                  <h4>
                    <span onClick={() => handleContent('services', false)}>
                      <SlArrowLeft color="black" size={15} />
                    </span>
                    Services
                  </h4>
                  {mobileServicesVisible && <MobileServicesMenu />}
                </div>

                <p
                  onClick={() =>
                    handleContent('insights', true) ||
                    handleContentVisible('insights', !insightsContentVisible)
                  }
                  className={activeMenu === 'insights' ? 'active-link' : ''}
                >
                  <span>Featured Insights</span>
                  <span>
                    {insightsContentVisible ? (  <SlArrowRight color="white" size={15} />) : (  <SlArrowRight color="white" size={15} />)}
                  </span>
                </p>
                <div className={`navbar__mini-menu-content ${mobileInsightsVisible ? 'active' : ''}`} data-aos='slide-left'>
                  <h4>
                    <span onClick={() => handleContent('insights', false)}>
                      <SlArrowLeft color="black" size={15} />
                    </span>
                    Featured Insights
                  </h4>
                  {mobileInsightsVisible && <MobileInsightsMenu />}
                </div>

                <p
                  onClick={() =>
                    handleContent('about', true) ||
                    handleContentVisible('about', !aboutContentVisible)
                  }
                  className={activeMenu === 'about' ? 'active-link' : ''}
                >
                  <span>About Us</span>
                  <span>
                    {aboutContentVisible ? <SlArrowRight color='white' size={15} /> : <SlArrowRight color='white' size={15} />}
                  </span>
                  </p>
                  <div className={`navbar__mini-menu-content ${mobileAboutVisible ? 'active' : ''}`} data-aos='slide-left'>
                    <h4>
                      <span onClick={() => handleContent('about', false)}>
                        <SlArrowLeft color="black" size={15} />
                      </span>
                      About Us
                    </h4>
                    {mobileAboutVisible && <MobileAboutMenu />}
                  </div>
              </div>
              <p><Link to="/careers">Careers</Link></p>
              <p><Link to="/about-us/blog">Blog</Link></p>
              <p><Link to="/contact-us#hm-footer-container">Email Subscriptions</Link></p>
              <p><Link to="/">Sign In</Link></p>
            </div>
          </div>
          <div className="navbar__menu-links__details">
            <div className='hm-search-bar'>
              <div className="navbar__menu-links__search">
                <input name='search' type="text" onChange={inputHandler} onClick={handleInputText} onKeyUp={handleShowData} placeholder="Type to search..." />
                <button><RiSearchLine size={40} /></button>
              </div>
              {showData && (
                  <div className={`navbar__menu-links__search-results__container ${showData ? 'display' : ''}`}>
                    <List input={inputText} />
                  </div>
                )}
            </div>
            <div className="navbar__menu-link__content">
              {industriesContent && <IndustriesMenu />}
              {servicesContent && <ServicesMenu />}
              {insightsContent && <InsightsMenu />}
              {aboutContent && <AboutMenu />}
            </div>
          </div>
        </div>
      )}
      <div className="navbar__menu">
        <ul className="navbar__menu-content">
          <li className="navbar__menu-content-detail" onMouseEnter={handleIndustriesContent} onMouseLeave={handleDropdownLeave} id={activeDropdown === 'industries' ? 'active-dropdown' : ''}>
            <p>
              Industries <span>
              {activeDropdown === 'industries' ? < IoIosArrowUp /> : <IoIosArrowDown />}</span>
            </p>
            <div className={`drop-down-menu ${activeDropdown === 'industries' ? 'active' : ''}`}>
              <div className="drop-down-menu-container">
                <IndustriesMenu />
              </div>
            </div>
          </li>
          <li className="navbar__menu-content-detail" onMouseEnter={handleServicesContent} onMouseLeave={handleDropdownLeave} id={activeDropdown === 'services' ? 'active-dropdown' : ''}>
            <p>
              <a href="/our-services">Services</a> <span>
              {activeDropdown === 'services' ? < IoIosArrowUp /> : <IoIosArrowDown />}</span>
            </p>
            <div className={`drop-down-menu2 ${activeDropdown === 'services' ? 'active2' : ''}`}>
              <div className="drop-down-menu-container">
                <ServicesMenu />
              </div>
            </div>
          </li>
          <li className="navbar__menu-content-detail" onMouseEnter={handleInsightsContent} onMouseLeave={handleDropdownLeave} id={activeDropdown === 'insights' ? 'active-dropdown' : ''}>
            <p>
              Featured Insights <span>
              {activeDropdown === 'insights' ? < IoIosArrowUp /> : <IoIosArrowDown />}</span>
            </p>
            <div className={`drop-down-menu3 ${activeDropdown === 'insights' ? 'active3' : ''}`}>
              <div className="drop-down-menu-container">
                <InsightsMenu />
              </div>
            </div>
          </li>
          <li className="navbar__menu-content-detail"><Link to='/careers'>Careers</Link></li>
          <li className="navbar__menu-content-detail"><a href="/about-us/blog">Blog</a></li>
          <li className="navbar__menu-content-detail" onMouseEnter={handleAboutContent} id={activeDropdown === 'about' ? 'active-dropdown' : ''} onMouseLeave={handleDropdownLeave}>
            <p>
              About Us <span>
              {activeDropdown === 'about' ? < IoIosArrowUp /> : <IoIosArrowDown />}</span>
            </p>
            <div className={`drop-down-menu4 ${activeDropdown === 'about' ? 'active4' : ''}`}>
              <div className="drop-down-menu-container">
                <AboutMenu />
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="navbar__search">
        <p><a href="/">Sign In</a> | <a href="/">Subscribe</a></p>
        <p onClick={handleShowSearchBar}><RiSearchLine size={25} color='white'/></p>
        {showSearchBar && (
          <div className={`navbar__search-bar__container ${showSearchBar? 'display' : ''}`} id='hamburger-curtain'>
            <div className='hm-navsearch-bar'>
              <div className="navbar__menu-links__searchbar">
                <input name='search' type="text" onChange={inputHandler} onClick={handleInputText} onKeyUp={handleShowData} placeholder="Type to search..." />
                <button onClick={handleShowSearchBar}><RiCloseLine size={45} /></button>
                <button><RiSearchLine size={40} /></button>
              </div>
              {showData && (
                  <div className={`navbar__menu-links__searchbar-results__container ${showData ? 'display' : ''}`}>
                    <List input={inputText} />
                  </div>
              )}
            </div>
          </div>

        )}
      </div>
    </div>
  );
};

export default Navbar;
