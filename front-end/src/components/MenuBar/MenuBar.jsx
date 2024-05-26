import React from 'react'
import { Link } from 'react-router-dom'
import './MenuBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faMobilePhone, faLaptop, faTv, faHeadphones, faHouseLaptop } from '@fortawesome/free-solid-svg-icons'
import fridgeIcon from '../Assets/refrigerator.svg'
import washerIcon from '../Assets/washer.svg'
import airConditionerIcon from '../Assets/air-conditioner.svg'
function MenuBar() {
  return (
    <>
      <div className='menu-bar'>
        <div className="label-menu-bar">
          <Link to='/phone'>
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
          <Link to='/laptop'>
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
          <Link to='/tu lanh'>
            <div className="label-item">
              <div className="item-content">
                <div className="category-icon">
                  <img src={fridgeIcon} alt="" />
                </div>
                <span className='item-link'>Tủ lạnh</span>
              </div>
              <div className='right-icon'>
                <FontAwesomeIcon icon={faChevronRight} />
              </div>
            </div>
          </Link>
        </div>
        <div className="label-menu-bar">
          <Link to='/may giat'>
            <div className="label-item">
              <div className="item-content">
                <div className="category-icon">
                  <img src={washerIcon} alt="" />
                </div>
                <span className='item-link'>Máy giặt</span>
              </div>
              <div className='right-icon'>
                <FontAwesomeIcon icon={faChevronRight} />
              </div>
            </div>
          </Link>
        </div>
        <div className="label-menu-bar">
          <Link to='/dieu hoa'>
            <div className="label-item">
              <div className="item-content">
                <div className="category-icon">
                  <img src={airConditionerIcon} alt="" />
                </div>
                <span className='item-link'>Điều hoà</span>
              </div>
              <div className='right-icon'>
                <FontAwesomeIcon icon={faChevronRight} />
              </div>
            </div>
          </Link>
        </div>
        <div className="label-menu-bar">
          <Link to='/tv'>
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
          <Link to='/am thanh'>
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
          <Link to='/smarthome'>
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
