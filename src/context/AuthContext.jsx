import React, { createContext, useState, useEffect } from 'react';

// Keys for localStorage
const USER_KEY = 'shopease_user';
const USERS_KEY = 'shopease_users';

export const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  register: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load current user from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(USER_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load user from localStorage', e);
    }
  }, []);

  // Persist current user changes
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(USER_KEY);
      }
    } catch (e) {
      console.error('Failed to save user to localStorage', e);
    }
  }, [user]);

  const login = (email, password) => {
    try {
      const usersJson = localStorage.getItem(USERS_KEY);
      const users = usersJson ? JSON.parse(usersJson) : [];
      const found = users.find((u) => u.email === email && u.password === password);
      if (found) {
        setUser({ username: found.username, email: found.email });
        return { success: true };
      }
      return { success: false, message: 'Invalid email or password' };
    } catch (e) {
      console.error('Login error', e);
      return { success: false, message: 'Login failed' };
    }
  };

  const logout = () => {
    setUser(null);
  };

  const register = (username, email, password) => {
    try {
      const usersJson = localStorage.getItem(USERS_KEY);
      const users = usersJson ? JSON.parse(usersJson) : [];
      if (users.some((u) => u.email === email)) {
        return { success: false, message: 'Email already registered' };
      }
      const newUser = { username, email, password };
      const updated = [...users, newUser];
      localStorage.setItem(USERS_KEY, JSON.stringify(updated));
      // Auto-login after registration
      setUser({ username, email });
      return { success: true };
    } catch (e) {
      console.error('Register error', e);
      return { success: false, message: 'Registration failed' };
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
