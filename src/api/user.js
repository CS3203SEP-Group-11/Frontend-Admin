import api from './axios';

export async function getMyProfile() {
  try {
    const response = await api.get('/users/me');
    return response.data;
  } catch (err) {
    if (err.response?.data) {
      throw new Error(err.response.data.message || 'Failed to fetch profile');
    }
    throw err;
  }
}