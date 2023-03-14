import React, { useState } from 'react';
import './questionItem.css';

import ConfirmModal from '../ConfirmModal';
import QuestionDetailModal from '../QuestionDetailModal';

const QuestionItem = (props) => {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openQuestionDetailModal, setOpenQuestionDetailModal] = useState(false);

  const handleQuestionDetailModal = () => {
    setOpenQuestionDetailModal(!openQuestionDetailModal);
  };

  const handleConfirmModal = () => {
    setOpenConfirmModal(!openConfirmModal);
  };
  return (
    <>
      <div className='questionItem'>
        <div className='questionItem__title'>{props.title}</div>
        <div className='questionItem__number'>{props.number} câu hỏi</div>
        <div className='questionItem__action'>
          <button className='questionItem__edit' onClick={handleQuestionDetailModal}></button>
          <button className='questionItem__delete' onClick={handleConfirmModal}></button>
        </div>
      </div>
      {openConfirmModal && <ConfirmModal handleConfirmModal={handleConfirmModal} />}
      {openQuestionDetailModal && (
        <QuestionDetailModal questionGroupId={props._id} handleQuestionDetailModal={handleQuestionDetailModal} />
      )}
    </>
  );
};

export default QuestionItem;
