import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { answerAction } from '../../features/exam/answerSlice';
import ConfirmModal from '../ConfirmModal';
import './answerItem.css';

const AnswerItem = ({ number, answer, answerId }) => {
  const dispatch = useDispatch();
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
    dispatch(answerAction.deleteAnswer(answerId));
    handleIsDeleteAnswer();
  };
  return (
    <li className='answerItem' style={isEditAnswer ? { background: '#efefef' } : {}}>
      <span>
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
