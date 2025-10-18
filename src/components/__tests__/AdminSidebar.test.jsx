// minimal AuthContext mock
vi.mock('../../context/AuthContext', () => ({ useAuth: () => ({ logout: () => {} }) }));

vi.mock('../../data/dummyData', () => ({ dummyAdminData: { instructorRequests: [] } }));

import { render, screen } from '@testing-library/react';
import AdminSidebar from '../AdminSidebar';

describe('AdminSidebar', () => {
  it('renders brand and menu items', () => {
    render(<AdminSidebar activeTab="dashboard" setActiveTab={() => {}} isOpen={false} setIsOpen={() => {}} />);
    expect(screen.getByText(/LevelUp Admin/i)).toBeInTheDocument();
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
  });
});
