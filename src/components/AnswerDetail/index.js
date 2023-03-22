import React, { useRef, useState } from 'react';

import './answerDetail.css';
import AnswerItem from '../AnswerItem';

import Loading from '../Loading';

const AnswerDetail = ({ answer, loading }) => {
  console.log('loading: ', loading);
  const answerInputRef = useRef(null);

  const [isAddAnswer, setIsAddAnswer] = useState(false);
  const [newAnswer, setNewAnswer] = useState('');

  const handleAddAnswer = () => {
    setIsAddAnswer(!isAddAnswer);
  };
  const handleNewAnswer = (e) => {
    setNewAnswer(e.target.value);
  };
  const addNewAnswer = () => {
    if (newAnswer === '') {
      answerInputRef.current.style.borderColor = 'red';
      return;
    }
    setNewAnswer('');
    handleAddAnswer();
  };

  return (
    <div className='answerDetail'>
      {loading ? (
        <div className='answerDetail__loading'>
          <Loading size={30} borderColor={'#f2f2f2'} borderTopColor={'#227ff4'} />
        </div>
      ) : (
        <ul>
          {answer.map((item, idx) => (
            <AnswerItem
              key={item.id}
              number={idx + 1}
              answer={item.answer}
              questionId={item.questionId}
              answerId={item.id}
              isCorrect={item.correct}
            />
          ))}
          {isAddAnswer ? (
            <div className='answerDetail__editting'>
              <textarea
                rows={1}
                ref={answerInputRef}
                placeholder='Nhập câu hỏi ...'
                value={newAnswer}
                onChange={handleNewAnswer}
              ></textarea>
              <div className='answerDetail__control'>
                <button onClick={addNewAnswer}>Lưu</button>
                <button onClick={handleAddAnswer}>Hủy</button>
              </div>
            </div>
          ) : (
            <div className='answerDetail__addNewBtn'>
              <button onClick={handleAddAnswer}>+</button>
            </div>
          )}
        </ul>
      )}
    </div>
  );
};

export default AnswerDetail;
