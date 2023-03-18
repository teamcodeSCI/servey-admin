import React, { useRef } from 'react';
import './customerModal.css';
import closeIcon from '../../assets/icons/close-icon.svg';
import { useOutside } from '../../utils/help';

const CustomerModal = ({ handleOpenModal }) => {
  const modalRef = useRef(null);
  useOutside(modalRef, handleOpenModal);
  return (
    <div className='customerModal'>
      <div className='customerModal__box' ref={modalRef}>
        <div className='customerModal__header'>
          <span>Câu hỏi trắc nghiệm về JS</span>2 Câu hỏi
        </div>
        <div class='customerModal__close' onClick={handleOpenModal}>
          <img width={20} height={20} src={closeIcon} alt='' />
        </div>
      </div>
    </div>
  );
};

export default CustomerModal;
