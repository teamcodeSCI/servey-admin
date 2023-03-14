import React, { useRef } from 'react';
import { useOutside } from '../../utils/help';
import './confirmModal.css';

const ConfirmModal = ({ handleConfirmModal }) => {
  const wrapperRef = useRef(null);
  useOutside(wrapperRef, handleConfirmModal);
  return (
    <div className='confirmModal'>
      <div className='confirmModal__box' ref={wrapperRef}>
        <div className='confirmModal__header'>Thông báo</div>
        <p>Bạn có chắc muốn xóa ?</p>
        <div className='confirmModal__btn'>
          <button onClick={handleConfirmModal}>Đồng ý</button>
          <button onClick={handleConfirmModal}>Hủy bỏ</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
