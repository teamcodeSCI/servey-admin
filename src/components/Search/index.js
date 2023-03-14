import React from 'react';
import './search.css';
import searchIcon from '../../assets/icons/search-icon.svg';
const Search = () => {
  return (
    <div className='search'>
      <input type='text' placeholder='Tìm kiếm...' />
      <button>
        <img width={20} height={20} src={searchIcon} alt='' />
      </button>
    </div>
  );
};

export default Search;
