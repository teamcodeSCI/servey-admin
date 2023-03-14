import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import './home.css';

const Home = () => {
  return (
    <div className='home'>
      <Sidebar />
      <div className='home__main'>
        <div className='container'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
