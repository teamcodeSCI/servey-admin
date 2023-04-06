import React, { useState } from 'react';
import CustomerModal from '../CustomerModal';
import './customerAccItem.css';

const CustomerAccItem = (props) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };
  return (
    <div className='customerAccItem'>
      <ul onClick={handleOpenModal}>
        <li>{props.exam}</li>
        <li>{props.question.length} Câu hỏi</li>
      </ul>
      {isOpenModal && <CustomerModal handleOpenModal={handleOpenModal} exam={props.exam} question={props.question} />}
    </div>
  );
};

export default CustomerAccItem;
