import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { examAction } from '../../features/exam/examSlice';
import { v4 as uuidv4 } from 'uuid';
import { useOutside } from '../../utils/help';
import './newExamModal.css';

const NewExamModal = ({ handleAddExam }) => {
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  useOutside(wrapperRef, handleAddExam);
  const [examTitle, setExamTitle] = useState('');
  const handleExamTitle = (e) => {
    setExamTitle(e.target.value);
  };
  const addExam = () => {
    if (examTitle === '') {
      inputRef.current.style.borderColor = 'red';
      return;
    }
    dispatch(examAction.addExam({ _id: uuidv4(), name: examTitle }));
    handleAddExam();
  };
  return (
    <div className='newExamModal'>
      <div className='newExamModal__box' ref={wrapperRef}>
        <div className='newExamModal__title'>Thêm mới</div>
        <div className='newExamModal__body'>
          <input
            ref={inputRef}
            type='text'
            placeholder='Nhập bộ câu hỏi...'
            value={examTitle}
            onChange={handleExamTitle}
          />
        </div>
        <div className='newExamModal__footer'>
          <button className='newExamModal__cancel' onClick={handleAddExam}>
            Hủy
          </button>
          <button className='newExamModal__addNew' onClick={addExam}>
            Tạo
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewExamModal;
