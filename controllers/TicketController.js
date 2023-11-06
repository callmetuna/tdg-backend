const db = require('../models/ticket'); 

// Create a new ticket
const createTicket = async (req, res) => {
  try {
    const newTicket = await db.Ticket.create(req.body);
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all tickets
const getTickets = async (req, res) => {
  try {
    const tickets = await db.Ticket.findAll();
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific ticket by ID
const getTicketById = async (req, res) => {
  try {
    const ticket = await db.Ticket.findByPk(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a ticket by ID
const updateTicketById = async (req, res) => {
  try {
    const [updatedRows] = await db.Ticket.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });

    if (updatedRows === 0) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    const updatedTicket = updatedRows[1][0]; // Get the updated ticket

    res.json(updatedTicket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a ticket by ID
const deleteTicketById = async (req, res) => {
  try {
    const deletedRows = await db.Ticket.destroy({ where: { id: req.params.id } });

    if (deletedRows === 0) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.status(204).send(); // No content (ticket deleted successfully)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTicket,
  getTickets,
  getTicketById,
  updateTicketById,
  deleteTicketById,
};
