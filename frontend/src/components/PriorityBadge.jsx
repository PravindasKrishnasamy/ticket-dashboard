import React from 'react';

const PRIORITY_STYLES = {
  Low: { bg: '#e5e7eb', color: '#374151' },
  Medium: { bg: '#dbeafe', color: '#1e40af' },
  High: { bg: '#ffedd5', color: '#c2410c' },
  Urgent: { bg: '#fee2e2', color: '#b91c1c' },
};

const PriorityBadge = ({ priority }) => {
  const style = PRIORITY_STYLES[priority] || PRIORITY_STYLES.Medium;
  return (
    <span
      className="badge badge--outline"
      style={{ backgroundColor: style.bg, color: style.color }}
    >
      {priority}
    </span>
  );
};

export default PriorityBadge;
