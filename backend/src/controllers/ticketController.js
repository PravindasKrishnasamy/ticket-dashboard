const ticketModel = require('../models/ticketModel');
const ApiError = require('../utils/ApiError');

const getTickets = async (req, res) => {
  const { status, priority, search } = req.query;
  const tickets = await ticketModel.findAll({ status, priority, search });
  res.json(tickets);
};

const getTicketById = async (req, res) => {
  const ticket = await ticketModel.findById(req.params.id);
  if (!ticket) {
    throw new ApiError(404, `Ticket ${req.params.id} not found`);
  }
  res.json(ticket);
};

const createTicket = async (req, res) => {
  const ticket = await ticketModel.create(req.body);
  res.status(201).json(ticket);
};

const updateTicket = async (req, res) => {
  const updated = await ticketModel.updateById(req.params.id, req.body);
  if (!updated) {
    throw new ApiError(404, `Ticket ${req.params.id} not found`);
  }
  res.json(updated);
};

const deleteTicket = async (req, res) => {
  const deleted = await ticketModel.removeById(req.params.id);
  if (!deleted) {
    throw new ApiError(404, `Ticket ${req.params.id} not found`);
  }
  res.status(204).send();
};

module.exports = {
  getTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
};
