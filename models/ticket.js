const mongoose = require('mongoose');
const Sequence = require('mongoose-sequence');

// Define Ticket schema
const ticketSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  userToken: { type: String }, // JWT token for user authentication and authorization

});

// Initialize the sequence for 'ticketId'
const ticketSequence = new Sequence({
  name: 'ticket_sequence',
  collection: 'tickets',
});

// Define Ticket model
const Ticket = mongoose.model('Ticket', ticketSchema, {
  sequence: ticketSequence,
});

module.exports = Ticket;
