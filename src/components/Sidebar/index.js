import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';
import logoutIcon from '../../assets/icons/logout-icon.svg';
import { menu } from '../../router';
import './sidebar.css';

const Sidebar = () => {
  const navLinkClass = ({ isActive }) => (isActive ? 'sidebar__active' : '');
  const handleLogout = () => {};
  return (
    <div className='sidebar'>
      <div className='sidebar__top'>
        <div className='sidebar__logo'>
          <img width={280} height={150} src={logo} alt='' />
        </div>
        <ul>
          {menu.map((item) => (
            <li key={item.path}>
              <NavLink className={navLinkClass} to={item.path}>
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className='sidebar__bottom'>
        <button onClick={handleLogout}>
          <img width={20} height={20} src={logoutIcon} alt='' />
          <span>Đăng xuất</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
