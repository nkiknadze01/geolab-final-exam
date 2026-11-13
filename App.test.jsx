import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import Login from '../pages/Login';
import { Navbar } from '../components/Navbar';

describe('FinanceTracker App Tests', () => {
  it('renders Login page and validates empty submission', async () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </AuthProvider>
    );

    expect(screen.getByText('სისტემაში შესვლა')).toBeInTheDocument();

    const submitButton = screen.getByRole('button', { name: 'შესვლა' });
    fireEvent.click(submitButton);

    expect(await screen.findByText('ელ-ფოსტა სავალდებულოა')).toBeInTheDocument();
    expect(await screen.findByText('პაროლი სავალდებულოა')).toBeInTheDocument();
  });

  it('toggles mobile burger menu in Navbar', () => {
    render(
      <AuthProvider>
        <Navbar />
      </AuthProvider>
    );

    const burgerButton = screen.getByLabelText('Toggle Menu');
    fireEvent.click(burgerButton);

    const logoutButtons = screen.getAllByText('გასვლა');
    expect(logoutButtons.length).toBeGreaterThan(1);
  });
});
