import React from 'react'
import { Link } from 'react-router-dom'
import './MenuBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faMobilePhone, faLaptop, faTablet, faTv, faHeadphones, faHomeLg, faHomeUser, faHouseChimney, faHouseLaptop } from '@fortawesome/free-solid-svg-icons'

function MenuBar() {
  return (
    <>
      <div className='menu-bar'>
        <div className="label-menu-bar">
          <Link to='/mobile'>
            <div className="label-item">
              <div className="item-content">
                <div className="category-icon">
                  <FontAwesomeIcon icon={faMobilePhone} className='icon' />
                </div>
                <span className='item-link'>Điện thoại</span>
              </div>
              <div className='right-icon'>
                <FontAwesomeIcon icon={faChevronRight} />
              </div>
            </div>
          </Link>
        </div>
        <div className="label-menu-bar">
          <Link to='/tablet'>
            <div className="label-item">
              <div className="item-content">
                <div className="category-icon">
                  <FontAwesomeIcon icon={faLaptop} className='icon' />
                </div>
                <span className='item-link'>Laptop</span>
              </div>
              <div className='right-icon'>
                <FontAwesomeIcon icon={faChevronRight} />
              </div>
            </div>
          </Link>
        </div>
        <div className="label-menu-bar">
          <Link to='/laptop'>
            <div className="label-item">
              <div className="item-content">
                <div className="category-icon">
                  <FontAwesomeIcon icon={faTablet} className='icon' />
                </div>
                <span className='item-link'>Tablet</span>
              </div>
              <div className='right-icon'>
                <FontAwesomeIcon icon={faChevronRight} />
              </div>
            </div>
          </Link>
        </div>
        <div className="label-menu-bar">
          <Link to='/personal-computer'>
            <div className="label-item">
              <div className="item-content">
                <div className="category-icon">
                  <FontAwesomeIcon icon={faTv} className='icon' />
                </div>
                <span className='item-link'>Smart TV</span>
              </div>
              <div className='right-icon'>
                <FontAwesomeIcon icon={faChevronRight} />
              </div>
            </div>
          </Link>
        </div>
        <div className="label-menu-bar">
          <Link to='/personal-computer'>
            <div className="label-item">
              <div className="item-content">
                <div className="category-icon">
                  <FontAwesomeIcon icon={faHeadphones} className='icon' />
                </div>
                <span className='item-link'>Âm thanh</span>
              </div>
              <div className='right-icon'>
                <FontAwesomeIcon icon={faChevronRight} />
              </div>
            </div>
          </Link>
        </div>
        <div className="label-menu-bar">
          <Link to='/personal-computer'>
            <div className="label-item">
              <div className="item-content">
                <div className="category-icon">
                  <FontAwesomeIcon icon={faHouseLaptop} className='icon' />
                </div>
                <span className='item-link'>Smart Home</span>
              </div>
              <div className='right-icon'>
                <FontAwesomeIcon icon={faChevronRight} />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}

export default MenuBar;
