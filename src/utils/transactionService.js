// API service for transaction management functionality
import { dummyAdminData } from '../data/dummyData';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class TransactionService {
  
  // Get all transactions with optional filters
  static async getTransactions(filters = {}) {
    await delay(800);
    
    // In a real app, this would be an actual API call:
    // const queryParams = new URLSearchParams(filters);
    // const response = await fetch(`${API_BASE_URL}/admin/transactions?${queryParams}`, {
    //   headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    //   }
    // });
    // return response.json();
    
    return dummyAdminData.transactions;
  }

  // Get transaction statistics
  static async getTransactionStatistics() {
    await delay(500);
    
    // In a real app, this would be an actual API call:
    // const response = await fetch(`${API_BASE_URL}/admin/transactions/statistics`, {
    //   headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    //   }
    // });
    // return response.json();
    
    return dummyAdminData.transactionStats;
  }

  // Get specific transaction details
  static async getTransactionDetails(transactionId) {
    await delay(400);
    
    // In a real app, this would be an actual API call:
    // const response = await fetch(`${API_BASE_URL}/admin/transactions/${transactionId}`, {
    //   headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    //   }
    // });
    // return response.json();
    
    const transaction = dummyAdminData.transactions.find(txn => txn.id === transactionId);
    if (!transaction) {
      throw new Error('Transaction not found');
    }
    
    return transaction;
  }

  // Export transactions to CSV/Excel
  static async exportTransactions(filters = {}, format = 'csv') {
    await delay(1000);
    
    // In a real app, this would be an actual API call:
    // const queryParams = new URLSearchParams({ ...filters, format });
    // const response = await fetch(`${API_BASE_URL}/admin/transactions/export?${queryParams}`, {
    //   headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    //   }
    // });
    // 
    // if (response.ok) {
    //   const blob = await response.blob();
    //   const url = window.URL.createObjectURL(blob);
    //   const a = document.createElement('a');
    //   a.style.display = 'none';
    //   a.href = url;
    //   a.download = `transactions_${new Date().toISOString().split('T')[0]}.${format}`;
    //   document.body.appendChild(a);
    //   a.click();
    //   window.URL.revokeObjectURL(url);
    // }
    
    // Simulate successful export
    console.log(`Exporting transactions in ${format} format with filters:`, filters);
    return { success: true, message: 'Export completed successfully' };
  }

  // Get transactions by user ID
  static async getUserTransactions(userId) {
    await delay(600);
    
    // In a real app, this would be an actual API call:
    // const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/transactions`, {
    //   headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    //   }
    // });
    // return response.json();
    
    return dummyAdminData.transactions.filter(txn => txn.userId === userId);
  }

  // Process refund for a transaction
  static async processRefund(transactionId, reason = '') {
    await delay(1200);
    
    // In a real app, this would be an actual API call:
    // const response = await fetch(`${API_BASE_URL}/admin/transactions/${transactionId}/refund`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    //   },
    //   body: JSON.stringify({ reason })
    // });
    // return response.json();
    
    // Simulate refund processing
    return {
      success: true,
      message: 'Refund processed successfully',
      refundId: `refund_${Date.now()}`,
      amount: 99.99,
      processedAt: new Date().toISOString()
    };
  }

  // Get transaction analytics for dashboard
  static async getTransactionAnalytics(period = '30d') {
    await delay(600);
    
    // In a real app, this would be an actual API call:
    // const response = await fetch(`${API_BASE_URL}/admin/transactions/analytics?period=${period}`, {
    //   headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    //   }
    // });
    // return response.json();
    
    const stats = dummyAdminData.transactionStats;
    
    return {
      totalRevenue: stats.totalRevenue,
      transactionCount: stats.totalTransactions,
      averageValue: stats.averageTransactionValue,
      growthRate: 12.5,
      topPaymentMethods: [
        { method: 'Credit Card', percentage: 65.2, count: 1204 },
        { method: 'PayPal', percentage: 28.8, count: 532 },
        { method: 'Bank Transfer', percentage: 6.0, count: 111 }
      ],
      revenueByCategory: [
        { category: 'Course Purchases', revenue: 28450, percentage: 62.1 },
        { category: 'Subscriptions', revenue: 13200, percentage: 28.8 },
        { category: 'Renewals', revenue: 4130, percentage: 9.1 }
      ],
      monthlyTrend: stats.monthlyRevenue
    };
  }

  // Get failed transaction summary
  static async getFailedTransactions() {
    await delay(500);
    
    // In a real app, this would be an actual API call:
    // const response = await fetch(`${API_BASE_URL}/admin/transactions/failed`, {
    //   headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    //   }
    // });
    // return response.json();
    
    const failedTransactions = dummyAdminData.transactions.filter(txn => txn.status === 'FAILED');
    
    return {
      transactions: failedTransactions,
      summary: {
        total: failedTransactions.length,
        totalLostRevenue: failedTransactions.reduce((sum, txn) => sum + Math.abs(txn.amount), 0),
        commonReasons: [
          { reason: 'Insufficient funds', count: 18 },
          { reason: 'Card declined', count: 12 },
          { reason: 'Expired card', count: 8 },
          { reason: 'Network error', count: 4 }
        ]
      }
    };
  }

  // Retry failed transaction
  static async retryTransaction(transactionId) {
    await delay(1000);
    
    // In a real app, this would be an actual API call:
    // const response = await fetch(`${API_BASE_URL}/admin/transactions/${transactionId}/retry`, {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    //   }
    // });
    // return response.json();
    
    // Simulate retry result
    const success = Math.random() > 0.3; // 70% success rate
    
    return {
      success,
      message: success ? 'Transaction retried successfully' : 'Retry failed - customer needs to update payment method',
      newTransactionId: success ? `txn_retry_${Date.now()}` : null
    };
  }
}

export default TransactionService;