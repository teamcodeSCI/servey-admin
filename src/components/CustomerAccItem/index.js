import React, { useState } from 'react';
import CustomerModal from '../CustomerModal';
import './customerAccItem.css';
import { formatDate } from '../../utils/help';

const CustomerAccItem = (props) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };
  let count = 0;
  props.question.forEach((e) => {
    if (e.correct_answer === e.answer) {
      count++;
    }
  });
  return (
    <>
      <div className='customerAccItem' onClick={handleOpenModal}>
        <ul>
          <li className='customerAccItem__name'>{props.exam}</li>
          <li className='customerAccItem__date'>{formatDate(props.created_at)}</li>
          <li className='customerAccItem__question'>
            {count}/{props.question.length} Câu đúng
          </li>
        </ul>
        <div className='customerAccItem__btn'>
          <button></button>
        </div>
      </div>
      {isOpenModal && (
        <CustomerModal handleOpenModal={handleOpenModal} exam={props.exam} count={count} question={props.question} />
      )}
    </>
  );
};

export default CustomerAccItem;
