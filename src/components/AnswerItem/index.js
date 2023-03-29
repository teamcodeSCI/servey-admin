import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteAnswer, updateAnswer } from '../../features/exam/answerSlice';
import ConfirmModal from '../ConfirmModal';
import './answerItem.css';

const AnswerItem = ({ number, answer, isCorrect, questionId, answerId }) => {
  const [isEditAnswer, setIsEditAnswer] = useState(false);
  const [isDeleteAnswer, setIsDeleteAnswer] = useState(false);
  const [editAnswer, setEditAnswer] = useState(answer);
  const dispatch = useDispatch();
  const handleIsEditAnswer = () => {
    setIsEditAnswer(!isEditAnswer);
  };
  const handleEditAnswer = (e) => {
    setEditAnswer(e.target.value);
  };
  const handleIsDeleteAnswer = () => {
    setIsDeleteAnswer(!isDeleteAnswer);
  };
  const removeAnswer = () => {
    dispatch(deleteAnswer(answerId));
    handleIsDeleteAnswer();
  };
  const saveAnswer = () => {
    dispatch(updateAnswer({ id: answerId, payload: editAnswer }));
    handleIsEditAnswer();
  };
  return (
    <li
      className='answerItem'
      style={
        isEditAnswer
          ? { background: '#efefef' }
          : isCorrect === '1'
          ? { background: '#b6e5cf' }
          : { background: 'none' }
      }
    >
      <span>
        <input type='radio' name={questionId} defaultChecked={isCorrect === '1'} value={isCorrect === '1'} />
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
            <button className='answerItem__save' onClick={saveAnswer}></button>
            <button className='answerItem__close' onClick={handleIsEditAnswer}></button>
          </>
        ) : (
          <button className='answerItem__edit' onClick={handleIsEditAnswer}></button>
        )}
        <button className='answerItem__delete' onClick={handleIsDeleteAnswer}></button>
      </div>
      {isDeleteAnswer && <ConfirmModal action={removeAnswer} handleConfirmModal={handleIsDeleteAnswer} />}
    </li>
  );
};

export default AnswerItem;
