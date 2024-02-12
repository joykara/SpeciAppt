/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { RiMenuLine, RiCloseLine, RiSearchLine } from 'react-icons/ri';
import './navbar.css';
import { Link } from 'react-router-dom';
import { IndustriesMenu, ServicesMenu, InsightsMenu, AboutMenu } from '../../container';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [dropdown2, setDropdown2] = useState(false);
  const [dropdown3, setDropdown3] = useState(false);
  const [dropdown4, setDropdown4] = useState(false);

  const [industriesContent, setIndustriesContent] = useState(false);
  const [servicesContent, setServicesContent] = useState(false);
  const [insightsContent, setInsightsContent] = useState(false);
  const [aboutContent, setAboutContent] = useState(false);

  const handleToggle = () => {
    setToggleMenu(!toggleMenu);
    handleContent('industries', true);
  };

  const handleContent = (section, flag) => {
    const contentStates = {
      industries: [setIndustriesContent, setDropdown],
      services: [setServicesContent, setDropdown2],
      insights: [setInsightsContent, setDropdown3],
      about: [setAboutContent, setDropdown4]
    };

    for (const [setter, dropdownState] of Object.values(contentStates)) {
      if (setter === contentStates[section][0]) {
        setter(flag);
      } else {
        setter(false);
        dropdownState(false);
      }
    }
  };

  const handleDropdownLeave = (dropdownState) => {
    dropdownState(false);
  };

  return (
    <div className="navbar">
      <div className="navbar__logo">
        <button onClick={handleToggle}>
          {toggleMenu ? <RiCloseLine size={50} /> : <RiMenuLine size={40} />}
        </button>
        <p><Link to="/">Logo</Link></p>
      </div>
      {toggleMenu && (
        <div className={`navbar__menu-links ${toggleMenu ? 'show' : ''}`}>
          <div className="navbar__menu-links__container">
            <div className="navbar__menu-links-top">
              <button onClick={handleToggle}>
                {toggleMenu ? <RiCloseLine color="#fff" size={45} /> : <RiMenuLine color="#fff" size={30} />}
              </button>
              <p><Link to="/">Logo</Link></p>
            </div>
            <div className="menu">
              <div className="show-menu">
                <p onClick={() => handleContent('industries', true)}>Industries</p>
                <p onClick={() => handleContent('services', true)}>Services</p>
                <p onClick={() => handleContent('insights', true)}>Featured Insights</p>
                <p onClick={() => handleContent('about', true)}>About Us</p>
              </div>
              <p><a href="/careers">Careers</a></p>
              <p><a href="/about-us/blog">Blog</a></p>
              <p><a href="#subscribe">Email Subscriptions</a></p>
              <p><a href="#sign-in">Sign In</a></p>
            </div>
          </div>
          <div className="navbar__menu-links__details">
            <div className="navbar__menu-links__search">
              <input type="text" placeholder="Type to search..." />
              <button><RiSearchLine size={40} /></button>
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
        <div className="navbar__menu-content">
          <div>
            <p onMouseEnter={() => setDropdown(!dropdown)}>Industries</p>
            <div className={`drop-down-menu ${dropdown ? 'active' : ''}`} onMouseLeave={() => handleDropdownLeave(setDropdown)}>
              <div className="drop-down-menu-container">
                <IndustriesMenu />
              </div>
            </div>
          </div>
          <div>
            <p onMouseEnter={() => setDropdown2(!dropdown2)}><a href="/services">Services</a></p>
            <div className={`drop-down-menu2 ${dropdown2 ? 'active2' : ''}`} onMouseLeave={() => handleDropdownLeave(setDropdown2)}>
              <div className="drop-down-menu-container">
                <ServicesMenu />
              </div>
            </div>
          </div>
          <div>
            <p onMouseEnter={() => setDropdown3(!dropdown3)}>Featured Insights</p>
            <div className={`drop-down-menu3 ${dropdown3 ? 'active3' : ''}`} onMouseLeave={() => handleDropdownLeave(setDropdown3)}>
              <div className="drop-down-menu-container">
                <InsightsMenu />
              </div>
            </div>
          </div>
          <p>Careers</p>
          <p><a href="/about-us/blog">Blog</a></p>
          <div>
            <p onMouseEnter={() => setDropdown4(!dropdown4)}>About Us</p>
            <div className={`drop-down-menu4 ${dropdown4 ? 'active4' : ''}`} onMouseLeave={() => handleDropdownLeave(setDropdown4)}>
              <div className="drop-down-menu-container">
                <AboutMenu />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="navbar__search">
        <p><a href="">Sign In</a> | <a href="">Subscribe</a></p>
        <p><a href=""><RiSearchLine size={20} /></a></p>
      </div>
    </div>
  );
};

export default Navbar;
