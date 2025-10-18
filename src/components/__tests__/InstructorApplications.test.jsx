// Mock the base API module to prevent actual network calls
vi.mock('../api/axios', () => ({
  default: {
    get: vi.fn().mockRejectedValue(new Error('Network Error')),
    post: vi.fn().mockRejectedValue(new Error('Network Error'))
  }
}));

vi.mock('../api/instructorApplication', () => ({
  listPendingInstructorApplications: vi.fn().mockResolvedValue([]),
  approveInstructorApplication: vi.fn().mockResolvedValue({}),
  rejectInstructorApplication: vi.fn().mockResolvedValue({})
}));

import { render, screen, waitFor } from '@testing-library/react';
import InstructorApplications from '../InstructorApplications';

describe('InstructorApplications', () => {
  it('shows error message when API fails', async () => {
    render(<InstructorApplications />);
    
    // Since the API is mocked to fail, expect to see the error message
    await waitFor(() => {
      expect(screen.getByText(/Network Error/i)).toBeInTheDocument();
    });
  });
});
