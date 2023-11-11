import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';

describe('App component tests', () => {
  test('renders input field with placeholder text', () => {
    render(<App />);
    expect(screen.getByPlaceholderText(/enter a search term/i)).toBeInTheDocument();
  });

  test('renders search button', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  test('validates input and shows error message on invalid input', () => {
    render(<App />);
    // Assuming handleSearchChange sets the inputValidated to false on invalid input
    fireEvent.change(screen.getByPlaceholderText(/enter a search term/i), {
      target: { value: 'SELECT' }
    });
    fireEvent.click(screen.getByText(/search/i));
    expect(screen.getByText(/invalid input. please try again./i)).toBeInTheDocument();
  });

  // If you want to test that no error message is shown on valid input:
  test('does not show error message on valid input', () => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText(/enter a search term/i), {
      target: { value: 'valid input' }
    });
    fireEvent.click(screen.getByText(/search/i));
    expect(screen.queryByText(/invalid input. please try again./i)).not.toBeInTheDocument();
  });

  // Add more tests as needed...
});
