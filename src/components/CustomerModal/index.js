import React, { useRef } from 'react';
import './customerModal.css';
import closeIcon from '../../assets/icons/close-icon.svg';
import { useOutside } from '../../utils/help';
import CustomerQuestionItem from '../CustomerQuestionItem';

const CustomerModal = (props) => {
  const modalRef = useRef(null);
  useOutside(modalRef, props.handleOpenModal);

  return (
    <div className='customerModal'>
      <div className='customerModal__box' ref={modalRef}>
        <div className='customerModal__header'>
          <span>{props.exam}</span>
          Kết quả: {props.count}/{props.question.length} câu
        </div>
        <div className='customerModal__close' onClick={props.handleOpenModal}>
          <img width={20} height={20} src={closeIcon} alt='' />
        </div>
        <div className='customerModal__body'>
          {props.question.map((item, idx) => (
            <CustomerQuestionItem key={item.id} idx={idx + 1} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerModal;
