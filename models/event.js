const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  picture: { type: String }, // URL to the event's picture
  description: { type: String, required: true },
  artist: { type: String, required: true },
  eventType: { 
    type: String, 
    enum: ['Music', 'Sports', 'Conference', 'Party', 'Other'], // Define the event types
    required: true,
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Store the event creator (user)
  userToken: { type: String }, // JWT token for event creator's authentication and authorization
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
