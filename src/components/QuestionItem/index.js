import React, { useState } from 'react';
import './questionItem.css';

import ConfirmModal from '../ConfirmModal';
import QuestionDetailModal from '../QuestionDetailModal';

const QuestionItem = (props) => {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openQuestionDetailModal, setOpenQuestionDetailModal] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(0);
  const handleQuestionDetailModal = () => {
    setOpenQuestionDetailModal(!openQuestionDetailModal);
  };
  const handleConfirmModal = () => {
    setOpenConfirmModal(!openConfirmModal);
  };
  return (
    <>
      <div className='questionItem'>
        <div className='questionItem__title'>{props.name}</div>
        <div className='questionItem__number'>{questionNumber} câu hỏi</div>
        <div className='questionItem__action'>
          <button className='questionItem__edit' onClick={handleQuestionDetailModal}></button>
          <button className='questionItem__delete' onClick={handleConfirmModal}></button>
        </div>
      </div>
      {openConfirmModal && <ConfirmModal handleConfirmModal={handleConfirmModal} />}
      {openQuestionDetailModal && (
        <QuestionDetailModal
          setQuestionNumber={setQuestionNumber}
          examId={props._id}
          handleQuestionDetailModal={handleQuestionDetailModal}
        />
      )}
    </>
  );
};

export default QuestionItem;
