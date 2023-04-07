import React, { useState } from 'react';
import './questionItem.css';

import ConfirmModal from '../ConfirmModal';
import QuestionDetailModal from '../QuestionDetailModal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestion, questionSelector } from '../../features/exam/questionSlice';
import { deleteExam } from '../../features/exam/examSlice';

const QuestionItem = (props) => {
  const dispatch = useDispatch();
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openQuestionDetailModal, setOpenQuestionDetailModal] = useState(false);
  const question = useSelector(questionSelector);

  const handleQuestionDetailModal = () => {
    setOpenQuestionDetailModal(!openQuestionDetailModal);
    dispatch(fetchQuestion(props.id));
  };
  const handleConfirmModal = () => {
    setOpenConfirmModal(!openConfirmModal);
  };
  const handleDeleteExam = () => {
    dispatch(deleteExam(props.id));
    setOpenConfirmModal(!false);
  };
  return (
    <>
      <div className='questionItem'>
        <div className='questionItem__title'>
          [{props.id}] {props.exam}
        </div>
        <div className='questionItem__number'>{props.question} câu hỏi</div>
        <div className='questionItem__action'>
          <button className='questionItem__edit' onClick={handleQuestionDetailModal}></button>
          <button className='questionItem__delete' onClick={handleConfirmModal}></button>
        </div>
      </div>
      {openConfirmModal && <ConfirmModal handleConfirmModal={handleConfirmModal} action={handleDeleteExam} />}
      {openQuestionDetailModal && (
        <QuestionDetailModal
          examId={props.id}
          examName={props.exam}
          questionRender={question}
          handleQuestionDetailModal={handleQuestionDetailModal}
        />
      )}
    </>
  );
};

export default QuestionItem;
