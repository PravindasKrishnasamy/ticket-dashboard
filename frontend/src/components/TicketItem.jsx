import React from 'react';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';

const formatDate = (isoString) => {
  if (!isoString) return '—';
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const TicketItem = ({ ticket, onEdit, onDelete }) => {
  return (
    <tr className="ticket-row">
      <td>
        <div className="ticket-row__title">{ticket.title}</div>
        <div className="ticket-row__category">{ticket.category}</div>
      </td>
      <td>{ticket.requester_name}</td>
      <td>
        <StatusBadge status={ticket.status} />
      </td>
      <td>
        <PriorityBadge priority={ticket.priority} />
      </td>
      <td>{ticket.assigned_to || 'Unassigned'}</td>
      <td>{formatDate(ticket.created_at)}</td>
      <td className="ticket-row__actions">
        <button type="button" className="btn btn--small" onClick={() => onEdit(ticket)}>
          Edit
        </button>
        <button
          type="button"
          className="btn btn--small btn--danger-outline"
          onClick={() => onDelete(ticket)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TicketItem;
