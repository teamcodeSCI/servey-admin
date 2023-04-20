import React from 'react';
import './reportItem.css';
const ReportItem = () => {
  return (
    <div className='reportItem'>
      <div className='reportItem__title'>
        <div className='reportItem__exam'>Câu hỏi về html</div>
        <div className='reportItem__number'>20 người tham gia</div>
        <div className='reportItem__viewMore'>
          <button style={false ? { transform: 'rotate(180deg)' } : {}}></button>
        </div>
      </div>
    </div>
  );
};

export default ReportItem;
