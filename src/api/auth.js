import api from './axios';

export async function login(email, password) {
  try {
    const response = await api.post('/auth/login', {
      email: email,
      password: password
    });

    return response.data;
  } catch (err) {
    if (err.response?.data) {
      throw new Error(err.response.data.message || 'Login failed');
    }
    throw err;
  }
}

export async function logout() {
  try {
    await api.get('/auth/logout');
  } catch (err) {
    if (err.response?.data) {
      throw new Error(err.response.data.message || 'Logout failed');
    }
    throw err;
  }
}