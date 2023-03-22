import React from 'react';
import './loading.css';
const Loading = ({ size, borderTopColor, borderColor }) => {
  return (
    <div
      className='loading'
      style={{ width: size, height: size, borderColor: borderColor, borderTop: `4px solid ${borderTopColor}` }}
    ></div>
  );
};

export default Loading;
