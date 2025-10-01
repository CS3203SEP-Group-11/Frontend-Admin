import React, { createContext, useContext, useEffect, useState } from 'react';
import { simulateLogin, dummyAdminData } from '../data/dummyData';

/**
 * @typedef {Object} Admin
 * @property {string} id
 * @property {string} username
 * @property {string} email
 * @property {string} role
 * @property {Date} createdAt
 */

/**
 * @typedef {Object} AuthContextValue
 * @property {Admin|null} admin
 * @property {(admin: Admin|null) => void} setAdmin
 * @property {boolean} isLoggedIn
 * @property {(isLoggedIn: boolean) => void} setIsLoggedIn
 * @property {() => Promise<void>} refreshAdmin
 * @property {() => void} logout
 * @property {(credentials: Object) => Promise<Object>} login
 */

/** @type {React.Context<AuthContextValue>} */
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchAdmin = async () => {
    try {
      // Use dummy data instead of API call
      const adminData = dummyAdminData.admin;
      setAdmin(adminData);
      setIsLoggedIn(true);
    } catch (err) {
      setAdmin(null);
      setIsLoggedIn(false);
      // Clear any stored tokens
      localStorage.removeItem('adminToken');
      sessionStorage.removeItem('adminToken');
    }
  };

  const refreshAdmin = async () => {
    await fetchAdmin();
  };

  const login = async (credentials) => {
    try {
      const response = await simulateLogin(credentials);
      const { token, admin: adminData } = response;
      
      localStorage.setItem('adminToken', token);
      setAdmin(adminData);
      setIsLoggedIn(true);
      
      return { success: true, admin: adminData };
    } catch (error) {
      return { 
        success: false, 
        message: error.message || 'Login failed' 
      };
    }
  };

  const logout = () => {
    setAdmin(null);
    setIsLoggedIn(false);
    localStorage.removeItem('adminToken');
    sessionStorage.removeItem('adminToken');
    window.location.href = '/login';
  };

  useEffect(() => {
    // Check if admin token exists
    const token = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
    if (token) {
      fetchAdmin();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ 
      admin, 
      setAdmin, 
      isLoggedIn, 
      setIsLoggedIn, 
      refreshAdmin,
      logout,
      login
    }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * @returns {AuthContextValue}
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};