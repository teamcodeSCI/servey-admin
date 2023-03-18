import React, { useState } from 'react';
import './customerQuestionItem.css';

const CustomerQuestionItem = () => {
  const [isOpenAcc, setIsOpenAcc] = useState(false);
  const handleOpenAcc = () => {
    setIsOpenAcc(!isOpenAcc);
  };
  return (
    <div className='customerQuestionItem'>
      <div className='customerQuestionItem__card'>
        <div className='customerQuestionItem__title'>1. Javascript?</div>
        <div className='customerQuestionItem__btn'>
          <button onClick={handleOpenAcc} style={!isOpenAcc ? { transform: 'rotate(-180deg)' } : {}}></button>
        </div>
      </div>
      {!isOpenAcc && (
        <div className='customerQuestionItem__acc'>
          <ul>
            <li>1. asdasd</li>
            <li>2. asdasd</li>
            <li>3. asdasd</li>
            <li>4. asdasd</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomerQuestionItem;
