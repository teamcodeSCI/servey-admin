import React, { useState } from 'react';
import './customerQuestionItem.css';
import CustomerModalAccItem from '../CustomerModalAccItem';

const CustomerQuestionItem = (props) => {
  const [isOpenAcc, setIsOpenAcc] = useState(false);
  const handleOpenAcc = () => {
    setIsOpenAcc(!isOpenAcc);
  };
  return (
    <div className='customerQuestionItem'>
      <div className='customerQuestionItem__card'>
        <div className='customerQuestionItem__title'>
          {props.idx}. {props.question}
        </div>
        <div className='customerQuestionItem__btn'>
          <button onClick={handleOpenAcc} style={!isOpenAcc ? { transform: 'rotate(-180deg)' } : {}}></button>
        </div>
      </div>
      {!isOpenAcc && (
        <div className='customerQuestionItem__acc'>
          <ul>
            {props.answers.map((item, idx) => (
              <CustomerModalAccItem
                key={item.id}
                idx={idx + 1}
                answer={item.answer}
                correctAnswer={props.correct_answer}
                customerAnswer={props.answer}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomerQuestionItem;
