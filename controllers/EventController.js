const db = require('../models'); // Import your Sequelize models

// Create a new event
const createEvent = async (req, res) => {
  try {
    const newEvent = await db.Event.create(req.body);
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all events
const getEvents = async (req, res) => {
  try {
    const events = await db.Event.findAll();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific event by ID
const getEventById = async (req, res) => {
  try {
    const event = await db.Event.findByPk(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an event by ID
const updateEventById = async (req, res) => {
  try {
    const [updatedRows] = await db.Event.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });

    if (updatedRows === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const updatedEvent = updatedRows[1][0]; // Get the updated event

    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an event by ID
const deleteEventById = async (req, res) => {
  try {
    const deletedRows = await db.Event.destroy({ where: { id: req.params.id } });

    if (deletedRows === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(204).send(); // No content (event deleted successfully)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEventById,
  deleteEventById,
};
