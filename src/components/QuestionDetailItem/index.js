import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnswer, answerSelector, answerLoadingSelector } from '../../features/exam/answerSlice';
import { deleteQuestion, updateQuestion } from '../../features/exam/questionSlice';
import AnswerDetail from '../AnswerDetail';
import ConfirmModal from '../ConfirmModal';

import './questionDetailItem.css';

const QuestionDetailItem = (props) => {
  const dispatch = useDispatch();
  const answer = useSelector(answerSelector);
  const answerLoading = useSelector(answerLoadingSelector);
  const [isEditQuestion, setIsEditQuestion] = useState(false);
  const [isDeleteQuestion, setIsDeleteQuestion] = useState(false);
  const [question, setQuestion] = useState(props.question);

  const handleIsOpenAcc = () => {
    if (props.index === props.idx) {
      props.setIndex(null);
      return;
    }
    props.setIndex(props.idx);
    dispatch(fetchAnswer(props.id));
  };
  const handleIsEditQuestion = () => {
    setIsEditQuestion(!isEditQuestion);
  };
  const handleIsDeleteQuestion = () => {
    setIsDeleteQuestion(!isDeleteQuestion);
  };
  const handleEditQuestion = (e) => {
    setQuestion(e.target.value);
  };
  const saveQuestion = () => {
    dispatch(updateQuestion({ id: props.id, payload: question }));
    handleIsEditQuestion();
  };
  const removeQuestion = () => {
    dispatch(deleteQuestion(props.id));
    handleIsDeleteQuestion();
  };

  return (
    <div className='questionDetailItem'>
      <div className='questionDetailItem__card'>
        <div className='questionDetailItem__title'>
          {isEditQuestion ? (
            <textarea
              autoFocus
              rows={1}
              placeholder='Nhập câu hỏi...'
              value={question}
              onChange={handleEditQuestion}
            ></textarea>
          ) : (
            <span>
              {props.idx + 1}. {props.question}
            </span>
          )}
        </div>
        <div className='questionDetailItem__action'>
          {isEditQuestion && <button className='questionDetailItem__save' onClick={saveQuestion}></button>}
          <button
            className={isEditQuestion ? 'questionDetailItem__close' : 'questionDetailItem__edit'}
            onClick={handleIsEditQuestion}
          ></button>
          <button className='questionDetailItem__delete' onClick={handleIsDeleteQuestion}></button>
          <button
            className='questionDetailItem__viewMore'
            style={props.index === props.idx ? { transform: 'rotate(-180deg)' } : {}}
            onClick={handleIsOpenAcc}
          ></button>
        </div>
      </div>
      {props.index === props.idx && <AnswerDetail answer={answer} loading={answerLoading} />}
      {isDeleteQuestion && <ConfirmModal action={removeQuestion} handleConfirmModal={handleIsDeleteQuestion} />}
    </div>
  );
};

export default QuestionDetailItem;
