const express = require('express');
const router = express.Router();
const TicketController = require('../controllers/TicketController');

// Validate the request body before creating a new ticket
const validateTicket = async (req, res, next) => {
  const { userId, eventId } = req.body;

  const errors = [];

  if (!userId) {
    errors.push('UserId is required');
  }

  if (!eventId) {
    errors.push('EventId is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

// Create a new ticket
router.post('/tickets', validateTicket, async (req, res) => {
  const ticket = await TicketController.createTicket(req.body);

  res.status(201).json(ticket);
});

// Get all tickets
router.get('/tickets', async (req, res) => {
  const tickets = await TicketController.getTickets();

  res.send(tickets);
});

// Get a specific ticket by ID
router.get('/tickets/:id', async (req, res) => {
  const ticket = await TicketController.getTicketById(req.params.id);

  if (!ticket) {
    return res.status(404).send();
  }

  res.send(ticket);
});

// Update a ticket by ID
router.put('/tickets/:id', async (req, res) => {
  const updatedTicket = await TicketController.updateTicketById(req.params.id, req.body);

  res.status(200).json(updatedTicket);
});

// Delete a ticket by ID
router.delete('/tickets/:id', async (req, res) => {
  await TicketController.deleteTicketById(req.params.id);

  res.status(204).send();
});

module.exports = router;
