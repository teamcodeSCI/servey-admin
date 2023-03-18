import React, { useState } from 'react';
import CustomerModal from '../CustomerModal';
import './customerItem.css';

const CustomerItem = ({ ip, exam, answered }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };
  return (
    <>
      <div className='customerItem' onClick={handleOpenModal}>
        <div className='customerItem__ip'>{ip}</div>
        <div className='customerItem__exam'>{exam}</div>
        <div className='customerItem__answered'>{answered} Câu hỏi</div>
      </div>
      {isOpenModal && <CustomerModal handleOpenModal={handleOpenModal} />}
    </>
  );
};

export default CustomerItem;
