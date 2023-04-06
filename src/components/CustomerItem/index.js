import React, { useState } from 'react';

import './customerItem.css';
import CustomerAccItem from '../CustomerAccItem';

const CustomerItem = (props) => {
  const [isOpenAcc, setIsOpenAcc] = useState(false);

  const handleOpenAcc = () => {
    setIsOpenAcc(!isOpenAcc);
  };

  return (
    <div className='customerItem'>
      <div className='customerItem__title' onClick={handleOpenAcc}>
        <div className='customerItem__ip'>{props.ip}</div>
        <div className='customerItem__number'>{props.exam.length} Chủ đề</div>
        <div className='customerItem__viewMore'>
          <button style={isOpenAcc ? { transform: 'rotate(180deg)' } : {}}></button>
        </div>
      </div>
      {isOpenAcc && (
        <div className='customerItem__acc'>
          {props.exam.map((item) => (
            <CustomerAccItem key={item.exam_id} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerItem;
