import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';
import logoutIcon from '../../assets/icons/logout-icon.svg';
import { menu, URL } from '../../router';
import './sidebar.css';
import { useDispatch } from 'react-redux';
import { getLogout } from '../../features/auth/authSlice';

const Sidebar = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const navLinkClass = ({ isActive }) => (isActive ? 'sidebar__active' : '');
  const handleLogout = () => {
    dispatch(getLogout());
    navigate(`${URL}/login`);
  };
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
