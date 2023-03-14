import React, { useRef, useEffect } from 'react';
import './questionDetailModal.css';
import closeIcon from '../../assets/icons/close-icon.svg';
import QuestionDetailItem from '../QuestionDetailItem';
import { useOutside } from '../../utils/help';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestion, questionSelector } from '../../features/exam/questionSlice';

const QuestionDetailModal = ({ handleQuestionDetailModal, examId, setQuestionNumber }) => {
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);
  useOutside(wrapperRef, handleQuestionDetailModal);
  const question = useSelector(questionSelector);
  const questionRender = question.filter((item) => examId === item.examId);

  useEffect(() => {
    dispatch(fetchQuestion());
    setQuestionNumber(questionRender.length);
  }, [questionRender]);
  return (
    <div className='questionDetailModal'>
      <div className='questionDetailModal__box' ref={wrapperRef}>
        <div className='questionDetailModal__header'>
          <span>Dịch vụ nâng mũi</span>
          {questionRender.length} Câu hỏi
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
