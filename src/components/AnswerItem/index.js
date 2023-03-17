import React, { useState } from 'react';
import ConfirmModal from '../ConfirmModal';
import './answerItem.css';

const AnswerItem = ({ number, answer, isCorrect, questionId, answerId }) => {
  const [isEditAnswer, setIsEditAnswer] = useState(false);
  const [isDeleteAnswer, setIsDeleteAnswer] = useState(false);
  const [editAnswer, setEditAnswer] = useState(answer);

  const handleIsEditAnswer = () => {
    setIsEditAnswer(!isEditAnswer);
  };
  const handleEditAnswer = (e) => {
    setEditAnswer(e.target.value);
  };
  const handleIsDeleteAnswer = () => {
    setIsDeleteAnswer(!isDeleteAnswer);
  };
  const deleteAnswer = () => {
    handleIsDeleteAnswer();
  };

  return (
    <li
      className='answerItem'
      style={
        isEditAnswer
          ? { background: '#efefef' }
          : isCorrect === true
          ? { background: '#b6e5cf' }
          : { background: 'none' }
      }
    >
      <span>
        <input type='radio' name={questionId} defaultChecked={isCorrect} value={isCorrect} />
        {number}.
        {isEditAnswer ? (
          <textarea
            rows='1'
            placeholder='Nhập câu trả lời ...'
            value={editAnswer}
            onChange={handleEditAnswer}
          ></textarea>
        ) : (
          editAnswer
        )}
      </span>

      <div className='answerItem__control' style={isEditAnswer ? { display: 'flex' } : {}}>
        {isEditAnswer ? (
          <>
            <button className='answerItem__save' onClick={handleIsEditAnswer}></button>
            <button className='answerItem__close' onClick={handleIsEditAnswer}></button>
          </>
        ) : (
          <button className='answerItem__edit' onClick={handleIsEditAnswer}></button>
        )}
        <button className='answerItem__delete' onClick={handleIsDeleteAnswer}></button>
      </div>
      {isDeleteAnswer && <ConfirmModal action={deleteAnswer} handleConfirmModal={handleIsDeleteAnswer} />}
    </li>
  );
};

export default AnswerItem;
