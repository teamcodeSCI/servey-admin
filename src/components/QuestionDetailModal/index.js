import React, { useRef } from 'react';
import './questionDetailModal.css';
import closeIcon from '../../assets/icons/close-icon.svg';
import QuestionDetailItem from '../QuestionDetailItem';
import { useOutside } from '../../utils/help';
import { question } from '../../fakeData/question';

const QuestionDetailModal = ({ handleQuestionDetailModal, questionGroupId }) => {
  const wrapperRef = useRef(null);
  useOutside(wrapperRef, handleQuestionDetailModal);
  const questionRender = question.filter((item) => questionGroupId === item.questionGroupId);
  return (
    <div className='questionDetailModal'>
      <div className='questionDetailModal__box' ref={wrapperRef}>
        <div className='questionDetailModal__header'>
          <span>Dịch vụ nâng mũi</span>
          10 Câu hỏi
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
