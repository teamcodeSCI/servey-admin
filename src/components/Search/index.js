import React from 'react';
import './search.css';
import searchIcon from '../../assets/icons/search-icon.svg';
const Search = ({ search, handleSearch, placeholder }) => {
  return (
    <div className='search'>
      <input type='text' placeholder={placeholder} value={search} onChange={handleSearch} />
      <button>
        <img width={20} height={20} src={searchIcon} alt='' />
      </button>
    </div>
  );
};

export default Search;
