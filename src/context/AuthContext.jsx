import React, { createContext, useContext, useEffect, useState } from 'react';
import { getMyProfile } from '../api/user';
import { login as authLogin } from '../api/auth';
import { setCurrentUserRole } from '../api/axios';

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
      const user = await getMyProfile();
      setAdmin(user);
      setIsLoggedIn(true);
      setCurrentUserRole(user?.role || null);
    } catch (err) {
      setAdmin(null);
      setIsLoggedIn(false);
      setCurrentUserRole(null);
    }
  };

  const refreshAdmin = async () => {
    await fetchAdmin();
  };

  const login = async (credentials) => {
    try {
      // Clear any existing authentication state first
      setAdmin(null);
      setIsLoggedIn(false);
      setCurrentUserRole(null);
      
      const response = await authLogin(credentials.username, credentials.password);
      // After successful login, fetch the user profile
      await fetchAdmin();
      return { success: true };
    } catch (error) {
      setAdmin(null);
      setIsLoggedIn(false);
      setCurrentUserRole(null);
      return { 
        success: false, 
        message: error.message || 'Login failed' 
      };
    }
  };

  const logout = () => {
    setAdmin(null);
    setIsLoggedIn(false);
    setCurrentUserRole(null);
    window.location.href = '/login';
  };

  useEffect(() => {
    fetchAdmin();
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