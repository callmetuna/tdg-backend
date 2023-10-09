const express = require('express');
const router = express.Router();
const EventController = require('../controllers/EventController');

// Validate the request body before creating a new event
const validateEvent = async (req, res, next) => {
  const { title, date, location, artist, description, eventType } = req.body;

  const errors = [];

  if (!title) {
    errors.push('Title is required');
  }

  if (!date) {
    errors.push('Date is required');
  }

  if (!location) {
    errors.push('Location is required');
  }

  if (!artist) {
    errors.push('Artist is required');
  }

  if (!description) {
    errors.push('Description is required');
  }

  if (!eventType) {
    errors.push('Event type is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

// Create a new event
router.post('/events', validateEvent, async (req, res) => {
  const event = await EventController.createEvent(req.body);

  res.status(201).json(event);
});

// Get all events
router.get('/events', async (req, res) => {
  const events = await EventController.getEvents();

  res.send(events);
});

// Get a specific event by ID
router.get('/events/:id', async (req, res) => {
  const event = await EventController.getEventById(req.params.id);

  if (!event) {
    return res.status(404).json({ message: 'Event not found' });
  }

  res.send(event);
});

// Update an event by ID
router.put('/events/:id', async (req, res) => {
  const updatedEvent = await EventController.updateEventById(req.params.id, req.body);

  res.status(200).json(updatedEvent);
});

// Delete an event by ID
router.delete('/events/:id', async (req, res) => {
  await EventController.deleteEventById(req.params.id);

  res.status(204).send();
});

module.exports = router;
