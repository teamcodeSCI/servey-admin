import React, { useEffect, useState } from 'react';
import Search from '../../components/Search';
import plusIcon from '../../assets/icons/plus-icon.svg';
import './questionList.css';
import QuestionItem from '../../components/QuestionItem';
import { useDispatch, useSelector } from 'react-redux';
import { examSelector, fetchExam, pageCountSelector, rangeSelector } from '../../features/exam/examSlice';
import NewExamModal from '../../components/NewExamModal';
import Pagination from '../../components/Pagination';

const QuestionList = () => {
  const dispatch = useDispatch();
  const [pageNum, setPageNum] = useState(1);
  const [isAddExam, setIsAddExam] = useState(false);
  const [search, setSearch] = useState('');
  const exam = useSelector(examSelector);
  const range = useSelector(rangeSelector);

  const pageCount = useSelector(pageCountSelector);
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleAddExam = () => {
    setIsAddExam(!isAddExam);
  };
  useEffect(() => {
    dispatch(fetchExam({ filter: search, pageNum: pageNum }));
  }, [dispatch, search, pageNum]);
  return (
    <div className='questionList'>
      <div className='questionList__header'>
        <span>Danh sách câu hỏi</span>
        {exam.length} bộ câu hỏi
      </div>
      <div className='questionList__custom'>
        <div className='questionList__search'>
          <Search search={search} handleSearch={handleSearch} />
        </div>
        <div className='questionList__addNew'>
          <button onClick={handleAddExam}>
            <img width={15} height={15} src={plusIcon} alt='' />
          </button>
        </div>
      </div>
      {pageCount === 0 ? (
        <p className='questionList__notify'>Không có dữ liệu</p>
      ) : (
        <>
          <div className='questionList__table'>
            {exam.map((item, idx) => (
              <QuestionItem key={item._id} {...item} />
            ))}
          </div>
          <div className='questionList__pagination'>
            <Pagination pageNum={pageNum} setPageNum={setPageNum} pageCount={pageCount} range={range} />
          </div>
        </>
      )}

      {isAddExam && <NewExamModal handleAddExam={handleAddExam} />}
    </div>
  );
};

export default QuestionList;
