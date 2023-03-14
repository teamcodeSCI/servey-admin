import React from 'react';
import Search from '../../components/Search';
import plusIcon from '../../assets/icons/plus-icon.svg';
import './questionList.css';
import QuestionItem from '../../components/QuestionItem';
import { questionGroup } from '../../fakeData/question';

const QuestionList = () => {
  return (
    <div className='questionList'>
      <div className='questionList__header'>
        <span>Danh sách câu hỏi</span>3 bộ câu hỏi
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
        {questionGroup.map((item, idx) => (
          <QuestionItem key={item._id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default QuestionList;
