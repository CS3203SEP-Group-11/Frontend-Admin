// Mock AdminDataContext hook
vi.mock('../../context/AdminDataContext', () => ({
  useAdminData: () => ({
    subscriptionPlans: [
      { id: 'plan_1', name: 'Basic', amount: 9.99, billingCycle: 'MONTHLY', isActive: true, stripePriceId: 'price_1', createdAt: new Date().toISOString() }
    ],
    subscriptionAnalytics: { totalSubscribers: 1, monthlyRecurringRevenue: 9.99, annualRecurringRevenue: 119.88, newSubscribersThisMonth: 1, revenueGrowth: 0, planDistribution: [{ planName: 'Basic', subscribers: 1, percentage: 100 }] },
    loading: false,
    refreshAdminData: () => {}
  })
}));

import { render, screen } from '@testing-library/react';
import SubscriptionManagement from '../SubscriptionManagement';

describe('SubscriptionManagement', () => {
  it('renders subscription plans and analytics', () => {
    render(<SubscriptionManagement />);
    expect(screen.getByText(/Subscription Management/i)).toBeInTheDocument();
    expect(screen.getByText(/Subscription Plans/i)).toBeInTheDocument();
    
    // Use getAllByText since "Basic" appears multiple times (analytics + table)
    const basicElements = screen.getAllByText(/Basic/i);
    expect(basicElements.length).toBeGreaterThan(0);
  });
});
