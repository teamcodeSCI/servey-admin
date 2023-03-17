import React from 'react';
import './pagination.css';
const Pagination = ({ pageNum, setPageNum, pageCount, range }) => {
  const pagiPage = [];
  const pagiRange = pageCount <= range ? pageCount - 1 : range;
  const pagiLimitEnd = pagiRange + pageNum < pageCount ? pagiRange + pageNum : pageCount;
  const pagiLimitStart = pagiRange + pageNum <= pageCount ? pageNum : pageCount - pagiRange;
  for (let i = pagiLimitStart; i <= pagiLimitEnd; i++) {
    pagiPage.push(i);
  }
  const nextPage = () => {
    if (pageNum < pageCount) setPageNum(pageNum + 1);
  };
  const prePage = () => {
    if (pageNum > 1) setPageNum(pageNum - 1);
  };
  const lastPage = () => {
    setPageNum(pageCount);
  };
  const firstPage = () => {
    setPageNum(1);
  };
  const numPage = (e) => {
    setPageNum(Number(e.target.innerHTML));
  };
  return (
    <ul className='pagination'>
      <li className='pagination__btn' onClick={firstPage}>
        ❮❮
      </li>
      <li className='pagination__btn' onClick={prePage}>
        ❮
      </li>
      {pagiPage.map((item, idx) => (
        <li onClick={numPage} key={idx} className={pageNum === item ? 'pagination__active' : ''}>
          {item}
        </li>
      ))}
      <li className='pagination__btn' onClick={nextPage}>
        ❯
      </li>
      <li className='pagination__btn' onClick={lastPage}>
        ❯❯
      </li>
    </ul>
  );
};

export default Pagination;
