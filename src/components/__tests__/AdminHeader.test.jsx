// Minimal mock for useTheme from App
vi.mock('../../App', () => ({
  useTheme: () => ({ isDarkMode: false, toggleTheme: () => {} })
}));

import { render, screen } from '@testing-library/react';
import AdminHeader from '../AdminHeader';

describe('AdminHeader', () => {
  it('renders title and welcome message', () => {
    render(<AdminHeader admin={{ username: 'Alice', email: 'a@example.com' }} toggleSidebar={() => {}} />);
    expect(screen.getByText(/Admin Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Welcome back, Alice/i)).toBeInTheDocument();
  });
});
