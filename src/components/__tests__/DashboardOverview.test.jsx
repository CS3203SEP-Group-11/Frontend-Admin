// mock api and hooks used inside
vi.mock('../api/axios', () => ({ get: async () => ({ data: [] }) }));
vi.mock('../api/analytics', () => ({ getRevenueSummary: async () => ({ totalRevenue: 0 }), getCourseAnalytics: async () => ({}), getCourseEnrollmentStats: async () => ({}) }));

import { render, screen } from '@testing-library/react';
import DashboardOverview from '../DashboardOverview';

describe('DashboardOverview', () => {
  it('renders welcome and stat headings', async () => {
    render(<DashboardOverview />);
    expect(await screen.findByText(/Welcome to Admin Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Users/i)).toBeInTheDocument();
  });
});
