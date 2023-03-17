import React from 'react';
import './loading.css';
const Loading = ({ size, borderTopColor }) => {
  return <div className='loading' style={{ width: size, height: size, borderTopColor: borderTopColor }}></div>;
};

export default Loading;
