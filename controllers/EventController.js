const db = require('../models/event'); 
const mysql = require('mysql');
const connection = require('../database'); 

// Create a new event
const createEvent = (req, res) => {
  const { name, date, location } = req.body;
  const sql = 'INSERT INTO events (name, date, location) VALUES (?, ?, ?)';
  const values = [name, date, location];

  connection.query(sql, values, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      const newEventId = result.insertId;
      res.status(201).json({ id: newEventId });
    }
  });
};

// Get all events
const getEvents = (req, res) => {
  const sql = 'SELECT * FROM events';

  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else { 
      res.json(results);
    }
  });
};

// Get a specific event by ID
const getEventById = (req, res) => {
  const eventId = req.params.id;
  const sql = 'SELECT * FROM events WHERE id = ?';
  const values = [eventId];

  connection.query(sql, values, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (result.length === 0) {
      res.status(404).json({ message: 'Event not found' });
    } else {
      res.json(result[0]);
    }
  });
};

// Update an event by ID
const updateEventById = (req, res) => {
  const eventId = req.params.id;
  const { name, date, location } = req.body;
  const sql = 'UPDATE events SET name = ?, date = ?, location = ? WHERE id = ?';
  const values = [name, date, location, eventId];

  connection.query(sql, values, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Event not found' });
    } else {
      res.json({ id: eventId });
    }
  });
};

// Delete an event by ID
const deleteEventById = (req, res) => {
  const eventId = req.params.id;
  const sql = 'DELETE FROM events WHERE id = ?';
  const values = [eventId];

  connection.query(sql, values, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Event not found' });
    } else {
      res.status(204).send();
    }
  });
};

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEventById,
  deleteEventById,
};
