import api from './axios';

// Fetch all transactions
export const getAllTransactions = async () => {
  try {
    const res = await api.get('/payments/transactions', {
      headers: {
        'X-User-Role': 'ADMIN'
      }
    });
    return res.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};

// Fetch transaction statistics
export const getTransactionStats = async () => {
  try {
    const res = await api.get('/payments/transaction-stats', {
      headers: {
        'X-User-Role': 'ADMIN'
      }
    });
    return res.data;
  } catch (error) {
    console.error('Error fetching transaction stats:', error);
    throw error;
  }
};

// Fetch transaction by ID
export const getTransactionById = async (transactionId) => {
  try {
    const res = await api.get(`/payments/transactions/${transactionId}`, {
      headers: {
        'X-User-Role': 'ADMIN'
      }
    });
    return res.data;
  } catch (error) {
    console.error('Error fetching transaction by ID:', error);
    throw error;
  }
};

// Export transactions data
export const exportTransactions = async (filters = {}) => {
  try {
    const res = await api.get('/payments/transactions/export', {
      params: filters,
      headers: {
        'X-User-Role': 'ADMIN'
      },
      responseType: 'blob'
    });
    return res.data;
  } catch (error) {
    console.error('Error exporting transactions:', error);
    throw error;
  }
};