import React, { useState } from 'react';
import Search from '../../components/Search';
import './customerList.css';
const CustomerList = () => {
  const [search, setSearch] = useState('');
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className='customerList'>
      <div className='customerList__header'>
        <span>Danh sách khách hàng</span>
        10 khách hàng
      </div>
      <div className='customerList__search'>
        <Search search={search} handleSearch={handleSearch} />
      </div>
    </div>
  );
};

export default CustomerList;
