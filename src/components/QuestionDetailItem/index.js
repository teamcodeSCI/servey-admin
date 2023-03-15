import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { answerAction, answerSelector, fetchAnswer } from '../../features/exam/answerSlice';
import AnswerItem from '../AnswerItem';
import ConfirmModal from '../ConfirmModal';
import './questionDetailItem.css';

const QuestionDetailItem = (props) => {
  const dispatch = useDispatch();
  const [isOpenAcc, setIsOpenAcc] = useState(false);
  const [isEditQuestion, setIsEditQuestion] = useState(false);
  const [isDeleteQuestion, setIsDeleteQuestion] = useState(false);
  const [question, setQuestion] = useState(props.question);
  const answer = useSelector(answerSelector);

  const renderAnswer = answer.filter((item) => item.questionId === props._id);

  const handleIsOpenAcc = () => {
    setIsOpenAcc(!isOpenAcc);
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
  const addNewAnswer = () => {
    dispatch(answerAction.addNewAnswer({ _id: uuidv4(), questionId: props._id, answer: '' }));
  };
  useEffect(() => {
    dispatch(fetchAnswer());
  }, []);
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
          {isEditQuestion && <button className='questionDetailItem__save' onClick={handleIsEditQuestion}></button>}
          <button
            className={isEditQuestion ? 'questionDetailItem__close' : 'questionDetailItem__edit'}
            onClick={handleIsEditQuestion}
          ></button>
          <button className='questionDetailItem__delete' onClick={handleIsDeleteQuestion}></button>
          <button
            className='questionDetailItem__viewMore'
            style={isOpenAcc ? { transform: 'rotate(-180deg)' } : {}}
            onClick={handleIsOpenAcc}
          ></button>
        </div>
      </div>
      {isOpenAcc && (
        <div className='questionDetailItem__acc'>
          <ul>
            {renderAnswer.map((item, idx) => (
              <AnswerItem key={idx} number={idx + 1} answer={item.answer} />
            ))}
            <div className='questionDetailItem__addNew'>
              <button onClick={addNewAnswer}>+</button>
            </div>
          </ul>
        </div>
      )}
      {isDeleteQuestion && <ConfirmModal handleConfirmModal={handleIsDeleteQuestion} />}
    </div>
  );
};

export default QuestionDetailItem;
