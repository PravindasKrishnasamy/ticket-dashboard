import React from 'react';
import TicketItem from './TicketItem';

const TicketList = ({ tickets, loading, error, onEdit, onDelete }) => {
  if (loading) {
    return <div className="state-message">Loading tickets...</div>;
  }

  if (error) {
    return <div className="state-message state-message--error">{error}</div>;
  }

  if (!tickets.length) {
    return (
      <div className="state-message">
        No tickets found. Try adjusting your filters or create a new ticket.
      </div>
    );
  }

  return (
    <div className="ticket-list">
      <table>
        <thead>
          <tr>
            <th>Ticket</th>
            <th>Requester</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Assigned To</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <TicketItem
              key={ticket.id}
              ticket={ticket}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketList;
