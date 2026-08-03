const express = require('express');
const ticketController = require('../controllers/ticketController');
const validateTicket = require('../middleware/validateTicket');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.get('/', asyncHandler(ticketController.getTickets));
router.get('/:id', asyncHandler(ticketController.getTicketById));
router.post('/', validateTicket({ partial: false }), asyncHandler(ticketController.createTicket));
router.put('/:id', validateTicket({ partial: true }), asyncHandler(ticketController.updateTicket));
router.delete('/:id', asyncHandler(ticketController.deleteTicket));

module.exports = router;
