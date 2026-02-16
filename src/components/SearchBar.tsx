import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
  onReset?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading, onReset }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim() && !isLoading) {
      onSearch(searchQuery);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value === '' && onReset) {
      onReset();
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    if (onReset) {
      onReset();
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search City..."
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
        className={isLoading ? 'loading' : ''}
      />

      <div className="search-actions">
        {searchQuery && (
          <button
            className="icon-btn clear-btn"
            onClick={clearSearch}
            title="Clear search"
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}

        <button
          className="icon-btn search-btn"
          onClick={handleSearch}
          disabled={!searchQuery.trim() || isLoading}
          title="Search"
          type="button"
        >
          {isLoading ? (
            <div className="mini-loader"></div>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
