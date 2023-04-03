import React, { useEffect, useRef, useState } from 'react';

import './questionDetailModal.css';
import closeIcon from '../../assets/icons/close-icon.svg';
import QuestionDetailItem from '../QuestionDetailItem';
import { useOutside } from '../../utils/help';
import { useDispatch, useSelector } from 'react-redux';
import { addNewQuestion, loadingSelector } from '../../features/exam/questionSlice';
import Loading from '../Loading';
import { updateExam } from '../../features/exam/examSlice';

const QuestionDetailModal = ({ handleQuestionDetailModal, questionRender, examId, examName }) => {
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [isAddQuestion, setIsAddQuestion] = useState(false);
  const [title, setTitle] = useState(examName);
  const [question, setQuestion] = useState('');
  const loading = useSelector(loadingSelector);
  const [index, setIndex] = useState(null);
  useOutside(wrapperRef, handleQuestionDetailModal);
  const addNewItem = () => {
    if (question === '') {
      inputRef.current.style.borderColor = 'red';
      return;
    }
    dispatch(addNewQuestion({ exam_id: examId, question: question,correct_answer:'' }));
    handleAddQuestion();
  };
  const handleAddQuestion = () => {
    setIsAddQuestion(!isAddQuestion);
    setQuestion('');
  };

  const handleSetQuestion = (e) => {
    setQuestion(e.target.value);
  };
  const handleEditTitle = () => {
    setIsEditTitle(!isEditTitle);
  };
  const handleUpdateTitle = () => {
    dispatch(updateExam({ id: examId, payload: title }));
    setIsEditTitle(false);
  };
  const handleSetTitle = (e) => {
    setTitle(e.target.value);
  };
  useEffect(() => {
    if (questionRender.length === 0) {
      setIsAddQuestion(true);
      return;
    }
    setIsAddQuestion(false);
  }, [questionRender]);
  return (
    <div className='questionDetailModal'>
      <div className='questionDetailModal__box' ref={wrapperRef}>
        <div className='questionDetailModal__header'>
          <div>
            <span>
              {isEditTitle ? (
                <input type='text' value={title} onChange={handleSetTitle} />
              ) : title === '' ? (
                'Nhập tên bộ đề'
              ) : (
                title
              )}
              {isEditTitle ? (
                <>
                  <button className='questionDetailModal__save' onClick={handleUpdateTitle}></button>
                  <button className='questionDetailModal__cancel' onClick={handleEditTitle}></button>
                </>
              ) : (
                <button className='questionDetailModal__edit' onClick={handleEditTitle}></button>
              )}
            </span>
            {questionRender.length} Câu hỏi
          </div>
        </div>
        <div className='questionDetailModal__close' onClick={handleQuestionDetailModal}>
          <img width={20} height={20} src={closeIcon} alt='' />
        </div>
        {loading ? (
          <div className='questionDetailModal__loading'>
            <Loading borderTopColor='#227ff4' size={40} />
          </div>
        ) : (
          <div className='questionDetailModal__wrapper'>
            {questionRender.map((item, idx) => (
              <QuestionDetailItem key={item.id} {...item} idx={idx} index={index} setIndex={setIndex} />
            ))}
            <div
              className='questionDetailModal__newItem'
              style={isAddQuestion ? {} : { paddingTop: 5, paddingBottom: 5 }}
            >
              {isAddQuestion ? (
                <div className='questionDetailModal__editting'>
                  <textarea
                    rows={1}
                    placeholder='Nhập câu hỏi ...'
                    ref={inputRef}
                    onChange={handleSetQuestion}
                    value={question}
                  ></textarea>
                  <div className='questionDetailModal__control'>
                    <button onClick={addNewItem}>Lưu</button>
                    <button onClick={handleAddQuestion}>Hủy</button>
                  </div>
                </div>
              ) : (
                <div className='questionDetailModal__addBtn'>
                  <button onClick={handleAddQuestion}>+ Thêm mới</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionDetailModal;
