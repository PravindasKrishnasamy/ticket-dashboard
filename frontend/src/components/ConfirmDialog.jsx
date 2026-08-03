import React from 'react';

const ConfirmDialog = ({ title, message, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal modal--small">
        <h2 className="modal__title">{title}</h2>
        <p className="modal__message">{message}</p>
        <div className="modal__actions">
          <button type="button" className="btn btn--ghost" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="btn btn--danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
