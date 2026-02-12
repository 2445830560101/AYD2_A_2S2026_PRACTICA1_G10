'use client';

import { useEffect, useState } from 'react';

export default function ToastNotification({ 
  show = false, 
  onClose = () => {}, 
  message = '', 
  type = 'success',
  duration = 3000 
}: {
  show?: boolean;
  onClose?: () => void;
  message?: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
} = {}) {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    setIsVisible(show);
    
    if (show) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300);
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!isVisible) return null;

  // Configuración de colores según el tipo
  const typeConfig = {
    success: {
      bg: 'bg-success',
      border: 'border-success',
      icon: 'bi-check-circle-fill',
      text: 'text-white'
    },
    error: {
      bg: 'bg-danger',
      border: 'border-danger',
      icon: 'bi-exclamation-circle-fill',
      text: 'text-white'
    },
    warning: {
      bg: 'bg-warning',
      border: 'border-warning',
      icon: 'bi-exclamation-triangle-fill',
      text: 'text-dark'
    },
    info: {
      bg: 'bg-info',
      border: 'border-info',
      icon: 'bi-info-circle-fill',
      text: 'text-white'
    }
  };

  const config = typeConfig[type] || typeConfig.success;

  return (
    <div 
      className={`toast show position-fixed bottom-0 end-0 m-3 ${config.border} ${config.bg} ${config.text || 'text-white'}`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      style={{ 
        zIndex: 9999,
        maxWidth: '400px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        animation: show ? 'toastSlideIn 0.3s ease-out' : 'toastSlideOut 0.3s ease-in'
      }}
    >
      <div className="toast-header">
        <i className={`${config.icon} me-2 ${config.text || 'text-white'}`}></i>
        <strong className="me-auto">
          {type === 'success' && '¡Éxito!'}
          {type === 'error' && 'Error'}
          {type === 'warning' && 'Advertencia'}
          {type === 'info' && 'Información'}
        </strong>
        <button 
          type="button" 
          className="btn-close" 
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          aria-label="Close"
        ></button>
      </div>
      <div className="toast-body">
        {message}
      </div>
      
      {/* Barra de progreso visual */}
      <div className="progress" style={{ height: '3px', marginBottom: '-1px' }}>
        <div 
          className={`progress-bar ${config.bg}`}
          role="progressbar"
          style={{ 
            width: '100%',
            animation: `progressBar ${duration}ms linear forwards`
          }}
        ></div>
      </div>
    </div>
  );
}