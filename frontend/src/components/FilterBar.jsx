import React from 'react';

const STATUS_OPTIONS = ['all', 'Open', 'In Progress', 'Resolved', 'Closed'];
const PRIORITY_OPTIONS = ['all', 'Low', 'Medium', 'High', 'Urgent'];

const FilterBar = ({ filters, onFilterChange, onNewTicket, resultCount }) => {
  const handleSearchChange = (e) => {
    onFilterChange({ ...filters, search: e.target.value });
  };

  const handleStatusChange = (e) => {
    onFilterChange({ ...filters, status: e.target.value });
  };

  const handlePriorityChange = (e) => {
    onFilterChange({ ...filters, priority: e.target.value });
  };

  return (
    <div className="filter-bar">
      <div className="filter-bar__controls">
        <input
          type="text"
          className="filter-bar__search"
          placeholder="Search tickets by title or requester..."
          value={filters.search}
          onChange={handleSearchChange}
        />

        <select value={filters.status} onChange={handleStatusChange}>
          {STATUS_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option === 'all' ? 'All Statuses' : option}
            </option>
          ))}
        </select>

        <select value={filters.priority} onChange={handlePriorityChange}>
          {PRIORITY_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option === 'all' ? 'All Priorities' : option}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-bar__meta">
        <span className="filter-bar__count">{resultCount} ticket(s)</span>
        <button type="button" className="btn btn--primary" onClick={onNewTicket}>
          + New Ticket
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
