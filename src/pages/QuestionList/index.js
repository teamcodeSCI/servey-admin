import React, { useEffect } from 'react';
import Search from '../../components/Search';
import plusIcon from '../../assets/icons/plus-icon.svg';
import './questionList.css';
import QuestionItem from '../../components/QuestionItem';
import { useDispatch, useSelector } from 'react-redux';
import { examSelector, fetchExam } from '../../features/exam/examSlice';

const QuestionList = () => {
  const dispatch = useDispatch();
  const exam = useSelector(examSelector);

  useEffect(() => {
    dispatch(fetchExam());
  }, []);
  return (
    <div className='questionList'>
      <div className='questionList__header'>
        <span>Danh sách câu hỏi</span>
        {exam.length} bộ câu hỏi
      </div>
      <div className='questionList__custom'>
        <div className='questionList__search'>
          <Search />
        </div>
        <div className='questionList__addNew'>
          <button>
            <img width={15} height={15} src={plusIcon} alt='' />
          </button>
        </div>
      </div>
      <div className='questionList__table'>
        {exam.map((item, idx) => (
          <QuestionItem key={item._id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default QuestionList;
