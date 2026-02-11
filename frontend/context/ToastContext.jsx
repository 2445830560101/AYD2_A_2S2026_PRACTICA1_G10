'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import ToastNotification from '@/components/ToastNotification';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success',
    duration: 3000
  });

  const showToast = useCallback((message, type = 'success', duration = 3000) => {
    setToast({ show: true, message, type, duration });
  }, []);

  const hideToast = useCallback(() => {
    setToast(prev => ({ ...prev, show: false }));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      
      {/* Toast Notification Global */}
      <ToastNotification
        show={toast.show}
        message={toast.message}
        type={toast.type}
        duration={toast.duration}
        onClose={hideToast}
      />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}