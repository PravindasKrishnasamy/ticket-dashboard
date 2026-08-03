import axios from 'axios';

// Base URL is injected via environment variable so it can point at the
// backend Service/Ingress once this is deployed on EKS. Falls back to a
// sensible local default for `npm start`.
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Fetch tickets, optionally filtered by status/priority/search text.
 * @param {{ status?: string, priority?: string, search?: string }} filters
 */
export const getTickets = async (filters = {}) => {
  const params = {};
  if (filters.status && filters.status !== 'all') params.status = filters.status;
  if (filters.priority && filters.priority !== 'all') params.priority = filters.priority;
  if (filters.search) params.search = filters.search;

  const response = await client.get('/tickets', { params });
  return response.data;
};

export const getTicketById = async (id) => {
  const response = await client.get(`/tickets/${id}`);
  return response.data;
};

export const createTicket = async (ticketData) => {
  const response = await client.post('/tickets', ticketData);
  return response.data;
};

export const updateTicket = async (id, ticketData) => {
  const response = await client.put(`/tickets/${id}`, ticketData);
  return response.data;
};

export const deleteTicket = async (id) => {
  const response = await client.delete(`/tickets/${id}`);
  return response.data;
};

export default client;
