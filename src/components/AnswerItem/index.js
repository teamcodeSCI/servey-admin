import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteAnswer, updateAnswer } from '../../features/exam/answerSlice';
import ConfirmModal from '../ConfirmModal';
import './answerItem.css';
import { updateQuestion } from '../../features/exam/questionSlice';

const AnswerItem = (props) => {
  const [isEditAnswer, setIsEditAnswer] = useState(false);
  const [isDeleteAnswer, setIsDeleteAnswer] = useState(false);
  const [editAnswer, setEditAnswer] = useState(props.answer);

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
    dispatch(deleteAnswer(props.answerId));
    handleIsDeleteAnswer();
  };
  const saveAnswer = () => {
    dispatch(updateAnswer({ id: props.answerId, payload: editAnswer }));
    handleIsEditAnswer();
  };

  const handleCorrectAnswer = (e) => {
    dispatch(updateQuestion({ id: props.questionId, payload: { correct_answer: e.target.value } }));
  };
  return (
    <li
      className='answerItem'
      style={isEditAnswer ? { background: '#efefef' } : props.isCorrect ? { background: '#b6e5cf' } : {}}
    >
      <span>
        <input
          type='radio'
          name={props.questionId}
          checked={props.isCorrect}
          value={props.answer}
          onChange={handleCorrectAnswer}
        />
        {props.number}.{' '}
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
