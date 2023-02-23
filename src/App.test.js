import { render, screen } from '@testing-library/react';
import Header from './components/Header';

describe('header componenet', () => {
  it('renders component correctly', () => {
    render(<Header />);
  });
});
