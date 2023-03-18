import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import CustomerItem from '../../components/CustomerItem';
import Search from '../../components/Search';
import './customerList.css';

const data = [
  { _id: uuidv4(), ip: '127.0.0.1', exam: 'Câu hỏi trắc nghiệm về JS', answered: '5' },
  { _id: uuidv4(), ip: '192.168.0.20', exam: 'Câu hỏi trắc nghiệm về PHP', answered: '2' },
  { _id: uuidv4(), ip: '192.168.1.21', exam: 'Câu hỏi trắc nghiệm về C#', answered: '4' },
  { _id: uuidv4(), ip: '127.0.10.10', exam: 'Câu hỏi trắc nghiệm về React', answered: '9' },
  { _id: uuidv4(), ip: '127.50.0.1', exam: 'Câu hỏi trắc nghiệm về Java', answered: '10' },
];
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
        <Search placeholder='Tìm kiếm theo IP ...' search={search} handleSearch={handleSearch} />
      </div>
      <div className='customerList__table'>
        {data.map((item) => (
          <CustomerItem key={item._id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default CustomerList;
