import React from 'react';

const STATUS_STYLES = {
  Open: { bg: '#e0edff', color: '#1d4ed8' },
  'In Progress': { bg: '#fef3c7', color: '#b45309' },
  Resolved: { bg: '#dcfce7', color: '#15803d' },
  Closed: { bg: '#e5e7eb', color: '#374151' },
};

const StatusBadge = ({ status }) => {
  const style = STATUS_STYLES[status] || STATUS_STYLES.Open;
  return (
    <span
      className="badge"
      style={{ backgroundColor: style.bg, color: style.color }}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
