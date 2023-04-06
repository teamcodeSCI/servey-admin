import React from 'react';
import './customerModalAccItem.css';
const CustomerModalAccItem = (props) => {
  return (
    <li
      className={
        props.answer === props.customerAnswer
          ? props.correctAnswer === props.customerAnswer
            ? 'customerModalAccItem__true'
            : 'customerModalAccItem__false'
          : props.answer === props.correctAnswer
          ? 'customerModalAccItem__true'
          : ''
      }
    >
      {props.idx}. {props.answer}
    </li>
  );
};

export default CustomerModalAccItem;
