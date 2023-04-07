import React, { useRef, useState } from 'react';

import './answerDetail.css';
import AnswerItem from '../AnswerItem';

import Loading from '../Loading';
import { useDispatch } from 'react-redux';
import { addNewAnswer } from '../../features/exam/answerSlice';
import { updateQuestion } from '../../features/exam/questionSlice';

const AnswerDetail = ({ answer, loading, questionId, correctAnswer, explain }) => {
  const dispatch = useDispatch();
  const answerInputRef = useRef(null);
  const [isAddAnswer, setIsAddAnswer] = useState(false);
  const [newAnswer, setNewAnswer] = useState('');
  const [explainText, setExplainText] = useState(explain === null ? '' : explain);

  const [isOpenExplain, setIsOpenExplain] = useState(false);

  const handleOpenExplain = () => {
    setIsOpenExplain(!isOpenExplain);
  };
  const handleExplain = (e) => {
    setExplainText(e.target.value);
  };
  const handleAddAnswer = () => {
    setIsAddAnswer(!isAddAnswer);
  };
  const handleNewAnswer = (e) => {
    setNewAnswer(e.target.value);
  };
  const addAnswer = () => {
    if (newAnswer === '') {
      answerInputRef.current.style.borderColor = 'red';
      return;
    }
    dispatch(addNewAnswer({ question_id: questionId, answer: newAnswer }));
    setNewAnswer('');
    handleAddAnswer();
  };
  const updateExplain = () => {
    dispatch(updateQuestion({ id: questionId, payload: { explain: explainText } }));
    handleOpenExplain();
  };
  return (
    <div className='answerDetail'>
      {loading ? (
        <div className='answerDetail__loading'>
          <Loading size={30} borderColor={'#f2f2f2'} borderTopColor={'#227ff4'} />
        </div>
      ) : (
        <div className='answerDetail__box'>
          <div className='answerDetail__explain'>
            {isOpenExplain ? (
              <textarea onChange={handleExplain} value={explainText} rows={1} placeholder='Giải thích ...'></textarea>
            ) : (
              <p>
                <b>Giải thích:</b> {explainText}
              </p>
            )}
            <div className='answerDetail__control'>
              {isOpenExplain ? (
                <>
                  <button onClick={updateExplain}>Lưu</button>
                  <button onClick={handleOpenExplain}>Hủy</button>
                </>
              ) : (
                <button className='answerDetail__editExplain' onClick={handleOpenExplain}></button>
              )}
            </div>
          </div>
          <ul>
            {answer.map((item, idx) => (
              <AnswerItem
                key={item.id}
                number={idx + 1}
                answer={item.answer}
                questionId={item.question_id}
                answerId={item.id}
                isCorrect={correctAnswer === item.answer}
                correctAnswer={correctAnswer}
              />
            ))}
            {isAddAnswer ? (
              <div className='answerDetail__editting'>
                <textarea
                  rows={1}
                  ref={answerInputRef}
                  placeholder='Nhập trả lời ...'
                  value={newAnswer}
                  onChange={handleNewAnswer}
                ></textarea>
                <div className='answerDetail__control'>
                  <button onClick={addAnswer}>Lưu</button>
                  <button onClick={handleAddAnswer}>Hủy</button>
                </div>
              </div>
            ) : (
              <div className='answerDetail__addNewBtn'>
                <button onClick={handleAddAnswer}>+</button>
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AnswerDetail;
