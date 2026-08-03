import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import TicketList from './components/TicketList';
import TicketModal from './components/TicketModal';
import ConfirmDialog from './components/ConfirmDialog';
import {
  getTickets,
  createTicket,
  updateTicket,
  deleteTicket,
} from './api/ticketApi';
import './App.css';

const DEFAULT_FILTERS = { search: '', status: 'all', priority: 'all' };

function App() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);
  const [ticketPendingDelete, setTicketPendingDelete] = useState(null);
  const [actionError, setActionError] = useState(null);

  const fetchTickets = useCallback(async (activeFilters) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTickets(activeFilters);
      setTickets(Array.isArray(data) ? data : data.tickets || []);
    } catch (err) {
      setError('Unable to load tickets. Please check that the backend API is running.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounce filter-driven fetches so typing in search doesn't spam the API.
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchTickets(filters);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [filters, fetchTickets]);

  const handleNewTicket = () => {
    setEditingTicket(null);
    setActionError(null);
    setIsModalOpen(true);
  };

  const handleEditTicket = (ticket) => {
    setEditingTicket(ticket);
    setActionError(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTicket(null);
  };

  const handleSubmitTicket = async (formData) => {
    setActionError(null);
    try {
      if (editingTicket && editingTicket.id) {
        const updated = await updateTicket(editingTicket.id, formData);
        setTickets((prev) =>
          prev.map((t) => (t.id === editingTicket.id ? updated : t))
        );
      } else {
        const created = await createTicket(formData);
        setTickets((prev) => [created, ...prev]);
      }
      setIsModalOpen(false);
      setEditingTicket(null);
    } catch (err) {
      setActionError('Failed to save ticket. Please try again.');
    }
  };

  const handleRequestDelete = (ticket) => {
    setTicketPendingDelete(ticket);
  };

  const handleCancelDelete = () => {
    setTicketPendingDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!ticketPendingDelete) return;
    try {
      await deleteTicket(ticketPendingDelete.id);
      setTickets((prev) => prev.filter((t) => t.id !== ticketPendingDelete.id));
    } catch (err) {
      setError('Failed to delete ticket. Please try again.');
    } finally {
      setTicketPendingDelete(null);
    }
  };

  return (
    <div className="app">
      <Header />

      <main className="app__content">
        <FilterBar
          filters={filters}
          onFilterChange={setFilters}
          onNewTicket={handleNewTicket}
          resultCount={tickets.length}
        />

        <TicketList
          tickets={tickets}
          loading={loading}
          error={error}
          onEdit={handleEditTicket}
          onDelete={handleRequestDelete}
        />
      </main>

      {isModalOpen && (
        <TicketModal
          ticket={editingTicket}
          onSubmit={handleSubmitTicket}
          onClose={handleCloseModal}
        />
      )}

      {actionError && isModalOpen && (
        <div className="toast toast--error">{actionError}</div>
      )}

      {ticketPendingDelete && (
        <ConfirmDialog
          title="Delete Ticket"
          message={`Are you sure you want to delete "${ticketPendingDelete.title}"? This cannot be undone.`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}

export default App;
