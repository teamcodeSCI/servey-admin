import React, { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './questionDetailModal.css';
import closeIcon from '../../assets/icons/close-icon.svg';
import QuestionDetailItem from '../QuestionDetailItem';
import { useOutside } from '../../utils/help';
import { useDispatch } from 'react-redux';
import { questionAction } from '../../features/exam/questionSlice';

const QuestionDetailModal = ({ handleQuestionDetailModal, questionRender, examId, examName }) => {
  const wrapperRef = useRef(null);
  const dispatch = useDispatch();
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [title, setTitle] = useState(examName);
  useOutside(wrapperRef, handleQuestionDetailModal);
  const addNewItem = () => {
    dispatch(questionAction.addNewQuestion({ _id: uuidv4(), examId: examId, question: '' }));
  };
  const handleEditTitle = () => {
    setIsEditTitle(!isEditTitle);
  };
  const handleSetTitle = (e) => {
    setTitle(e.target.value);
  };
  return (
    <div className='questionDetailModal'>
      <div className='questionDetailModal__box' ref={wrapperRef}>
        <div className='questionDetailModal__header'>
          <div>
            <span>
              {isEditTitle ? (
                <input type='text' value={title} onChange={handleSetTitle} />
              ) : title === '' ? (
                'Nhập tên bộ đề'
              ) : (
                title
              )}
              {isEditTitle ? (
                <>
                  <button className='questionDetailModal__save' onClick={handleEditTitle}></button>
                  <button className='questionDetailModal__cancel' onClick={handleEditTitle}></button>
                </>
              ) : (
                <button className='questionDetailModal__edit' onClick={handleEditTitle}></button>
              )}
            </span>
            {questionRender.length} Câu hỏi
          </div>
          <div className='questionDetailModal__addNew'>
            <button onClick={addNewItem}>Thêm mới</button>
          </div>
        </div>
        <div className='questionDetailModal__close' onClick={handleQuestionDetailModal}>
          <img width={20} height={20} src={closeIcon} alt='' />
        </div>
        <div className='questionDetailModal__wrapper'>
          {questionRender.map((item, idx) => (
            <QuestionDetailItem key={item._id} {...item} idx={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionDetailModal;
