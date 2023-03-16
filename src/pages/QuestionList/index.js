import React, { useEffect, useState } from 'react';
import Search from '../../components/Search';
import plusIcon from '../../assets/icons/plus-icon.svg';
import './questionList.css';
import QuestionItem from '../../components/QuestionItem';
import { useDispatch, useSelector } from 'react-redux';
import { examSelector, fetchExam } from '../../features/exam/examSlice';
import NewExamModal from '../../components/NewExamModal';

const QuestionList = () => {
  const dispatch = useDispatch();
  const [isAddExam, setIsAddExam] = useState(false);
  const exam = useSelector(examSelector);

  const handleAddExam = () => {
    setIsAddExam(!isAddExam);
  };
  useEffect(() => {
    dispatch(fetchExam());
  }, [dispatch]);
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
          <button onClick={handleAddExam}>
            <img width={15} height={15} src={plusIcon} alt='' />
          </button>
        </div>
      </div>
      <div className='questionList__table'>
        {exam.map((item, idx) => (
          <QuestionItem key={item._id} {...item} />
        ))}
      </div>
      {isAddExam && <NewExamModal handleAddExam={handleAddExam} />}
    </div>
  );
};

export default QuestionList;
