import React from 'react';
import './report.css';
import Search from '../../components/Search';
import ReportItem from '../../components/ReportItem';

const Report = () => {
  return (
    <div className='report'>
      <div className='report__header'>
        <span>Báo cáo</span>
      </div>
      <div className='report__search'>
        <Search placeholder='Tìm kiếm theo bộ đề ...' />
      </div>
      <div className='report__table'>
        <ReportItem />
      </div>
    </div>
  );
};

export default Report;
