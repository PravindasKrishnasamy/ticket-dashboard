import React from 'react';
import TicketForm from './TicketForm';

const TicketModal = ({ ticket, onSubmit, onClose }) => {
  const isEditing = Boolean(ticket && ticket.id);

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal">
        <h2 className="modal__title">{isEditing ? 'Edit Ticket' : 'New Ticket'}</h2>
        <TicketForm
          initialData={ticket}
          isEditing={isEditing}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      </div>
    </div>
  );
};

export default TicketModal;
