import React, { useEffect, useState } from 'react';
import './questionItem.css';

import ConfirmModal from '../ConfirmModal';
import QuestionDetailModal from '../QuestionDetailModal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestion, questionSelector } from '../../features/exam/questionSlice';

const QuestionItem = (props) => {
  const dispatch = useDispatch();
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openQuestionDetailModal, setOpenQuestionDetailModal] = useState(false);

  const question = useSelector(questionSelector);
  const questionRender = question.filter((item) => props._id === item.examId);
  const handleQuestionDetailModal = () => {
    setOpenQuestionDetailModal(!openQuestionDetailModal);
  };
  const handleConfirmModal = () => {
    setOpenConfirmModal(!openConfirmModal);
  };
  useEffect(() => {
    dispatch(fetchQuestion());
  }, []);
  return (
    <>
      <div className='questionItem'>
        <div className='questionItem__title'>{props.name}</div>
        <div className='questionItem__number'>{questionRender.length} câu hỏi</div>
        <div className='questionItem__action'>
          <button className='questionItem__edit' onClick={handleQuestionDetailModal}></button>
          <button className='questionItem__delete' onClick={handleConfirmModal}></button>
        </div>
      </div>
      {openConfirmModal && <ConfirmModal handleConfirmModal={handleConfirmModal} />}
      {openQuestionDetailModal && (
        <QuestionDetailModal
          examId={props._id}
          examName={props.name}
          questionRender={questionRender}
          handleQuestionDetailModal={handleQuestionDetailModal}
        />
      )}
    </>
  );
};

export default QuestionItem;
