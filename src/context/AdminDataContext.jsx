import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAllTransactions, getTransactionStats } from '../api/transactions';
import { getSubscriptionPlans, getSubscriptionAnalytics } from '../api/subscriptions';

const AdminDataContext = createContext();

export const useAdminData = () => useContext(AdminDataContext);

export const AdminDataProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [transactionStats, setTransactionStats] = useState({});
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  const [subscriptionAnalytics, setSubscriptionAnalytics] = useState({});
  const [error, setError] = useState(null);

  const fetchAllAdminData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [tx, txStats, plans, analytics] = await Promise.all([
        getAllTransactions(),
        getTransactionStats(),
        getSubscriptionPlans(),
        getSubscriptionAnalytics()
      ]);
      setTransactions(Array.isArray(tx) ? tx : []);
      setTransactionStats(txStats || {});
      setSubscriptionPlans(Array.isArray(plans) ? plans : []);
      setSubscriptionAnalytics(analytics || {});
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Call this after login
  useEffect(() => {
    fetchAllAdminData();
  }, []);

  return (
    <AdminDataContext.Provider value={{
      loading,
      error,
      transactions,
      transactionStats,
      subscriptionPlans,
      subscriptionAnalytics,
      refreshAdminData: fetchAllAdminData
    }}>
      {children}
    </AdminDataContext.Provider>
  );
};
