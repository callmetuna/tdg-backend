const Ticket = require('../models/ticket');

// Create a new ticket
const createTicket = async (req, res) => {
  try {
    const newTicket = new Ticket(req.body);
    await newTicket.save();
    res.status(201).send(newTicket);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all tickets
const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.send(tickets);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a specific ticket by ID
const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).send();
    }
    res.send(ticket);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a ticket by ID
const updateTicketById = async (req, res) => {
  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated ticket
    });
    if (!updatedTicket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.status(200).json(updatedTicket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a ticket by ID
const deleteTicketById = async (req, res) => {
  try {
    const deletedTicket = await Ticket.findByIdAndRemove(req.params.id);
    if (!deletedTicket) {
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
