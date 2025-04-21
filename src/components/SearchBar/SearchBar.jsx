import { useState } from 'react';
import toast from 'react-hot-toast';
import css from './SearchBar.module.css';

function SearchBar({ onSubmit }) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedValue = inputValue.trim();
    if (trimmedValue === '') {
      toast.error('Please enter text to search for images.');
      return;
    }
    onSubmit(trimmedValue);
  };

  return (
    <header className={css.searchHeader}> {/* Використання класу з CSS модуля */}
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <input
          className={css.searchInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputValue}
          onChange={handleChange}
        />
        <button className={css.searchButton} type="submit">Search</button>
      </form>
    </header>
  );
}

export default SearchBar;