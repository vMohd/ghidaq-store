import React, { useState, useEffect } from 'react';

const Alert = ({ type = 'danger', message = 'Something went wrong.', show, onClose, duration = 3000 }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (show) {
      setVisible(true);
  
      const timeout = setTimeout(() => {
        setVisible(false);
        onClose();
      }, duration);
  
      return () => clearTimeout(timeout);
    }
  }, [show, onClose, duration]);
  

  const getAlertStyles = () => {
    switch (type) {
      case 'success':
        return { icon: 'bi bi-check-circle', alertClass: 'alert-success' };
      case 'danger':
        return { icon: 'bi bi-x-circle', alertClass: 'alert-danger' };
      case 'warning':
        return { icon: 'bi bi-exclamation-triangle', alertClass: 'alert-warning' };
      case 'info':
        return { icon: 'bi bi-info-circle', alertClass: 'alert-info' };
      case 'dark':
      default:
        return { icon: 'bi bi-gem', alertClass: 'alert-dark' };
    }
  };

  const { icon, alertClass } = getAlertStyles();

  return (
    visible && (
      <div
        className={`alert ${alertClass} position-fixed top-50 start-50 translate-middle d-flex align-items-center justify-content-center`}
        style={{
          zIndex: 1050,
          width: '90%',
          maxWidth: '600px',
          textAlign: 'center',
          padding: '15px',
          fontSize: '20px',
          boxSizing: 'border-box',
        }}
      >
        <div className="d-flex w-100 justify-content-center align-items-center">
          <div className="me-2">
            <i className={icon}></i>
          </div>
          <div className="flex-grow-1">{message}</div>
          <button
            type="button"
            className="btn-close ms-auto"
            aria-label="Close"
            onClick={() => {
              setVisible(false);
              onClose();
            }}
          />
        </div>
      </div>
    )
  );
};

export default Alert;
