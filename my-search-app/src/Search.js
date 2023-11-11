import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const SearchResult = () => {
  const location = useLocation();
  const { searchTerm } = location.state || { searchTerm: 'No term provided' };

  return (
    <div className="search-result">
      <h2>Search Term: {searchTerm}</h2>
      <Link to="/">Return to Home</Link>
    </div>
  );
};

export default SearchResult;
