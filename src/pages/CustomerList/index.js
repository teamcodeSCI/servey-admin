import React, { useEffect, useState } from 'react';
import CustomerItem from '../../components/CustomerItem';
import Search from '../../components/Search';
import Loading from '../../components/Loading';

import './customerList.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomer } from '../../features/customer/customerApi';
import { customerLoadingSelector, customerSelector } from '../../features/customer/customerSlice';

const CustomerList = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const customerList = useSelector(customerSelector);

  const loading = useSelector(customerLoadingSelector);
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    dispatch(fetchCustomer({ filter: search, pageNum: 1 }));
  }, [dispatch, search]);
  return (
    <div className='customerList'>
      <div className='customerList__header'>
        <span>Danh sách khách hàng</span>
        10 khách hàng
      </div>
      <div className='customerList__search'>
        <Search placeholder='Tìm kiếm theo IP ...' search={search} handleSearch={handleSearch} />
      </div>
      {loading ? (
        <div className='customerList__loading'>
          <Loading borderTopColor='#227ff4' size={40} />
        </div>
      ) : (
        <div className='customerList__table'>
          {customerList.map((item) => (
            <CustomerItem key={item.ip} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerList;
