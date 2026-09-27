import React from 'react';

function Toast({ message, type = 'success', onClose }) {
  if (!message) return null;

  const bgClass = type === 'danger' ? 'bg-danger text-white' : type === 'info' ? 'bg-info text-white' : 'bg-success text-white';
  const iconClass = type === 'danger' ? 'bi-exclamation-triangle-fill' : type === 'info' ? 'bi-info-circle-fill' : 'bi-check-circle-fill';

  return (
    <div className="toast-container-custom">
      <div className={`toast show align-items-center ${bgClass} border-0 shadow-lg rounded-3`} role="alert" aria-live="assertive" aria-atomic="true">
        <div className="d-flex">
          <div className="toast-body d-flex align-items-center gap-2 py-3 px-3">
            <i className={`bi ${iconClass} fs-5`}></i>
            <span className="fw-medium">{message}</span>
          </div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            aria-label="Close"
            onClick={onClose}
          ></button>
        </div>
      </div>
    </div>
  );
}

export default Toast;
