import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import DOMPurify from 'dompurify';
import SearchResult from './Search';

function sanitizeInput(input) {
  return DOMPurify.sanitize(input);
}

function SearchForm() {
  const navigate = useNavigate(); // useNavigate is now inside a component that is rendered within <Router>
  const [searchTerm, setSearchTerm] = useState('');
  const [inputValidated, setInputValidated] = useState(true);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const isPotentialSQLInjection = (input) => {
    // Very basic pattern check for common SQL injection characters and keywords
    const sqlInjectionPattern = /('|--|=|;|\/\*|\*\/|xp_|\b(SELECT|UPDATE|DELETE|INSERT|CREATE|ALTER|DROP|TRUNCATE)\b)/i;
    return sqlInjectionPattern.test(input);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const sanitizedSearchTerm = sanitizeInput(searchTerm);
    // Check if the input has been changed after sanitization
    if (sanitizedSearchTerm !== searchTerm || isPotentialSQLInjection(searchTerm)) {
      // Clear the input if it's an attack
      setSearchTerm('');
      setInputValidated(false);
    } else {
      // If the input is not an XSS attack or SQL injection, handle the submission (e.g., navigate to a new page)
      // This is where you would include your routing logic if the input is valid
      setInputValidated(true);
      navigate('/search', { state: { searchTerm: sanitizedSearchTerm } }); // Redirect to the search results page
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Enter a search term"
          />
          <button type="submit">Search</button>
        </form>
        {!inputValidated && <p className="error">Invalid input. Please try again.</p>}
      </header>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchForm />} />
        <Route path="/search" element={<SearchResult />} />
      </Routes>
    </Router>
  );
}

export default App;
