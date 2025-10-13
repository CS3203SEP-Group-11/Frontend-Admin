import api from './axios';

export const getRevenueSummary = async () => {
  const res = await api.get('/payments/revenue-summary');
  return res.data;
};
