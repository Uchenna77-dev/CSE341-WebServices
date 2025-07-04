// controllers/contact.js
const { getDb } = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllContacts = async (req, res) => {
  try {
    const db = getDb().db('contact_db');
    const contacts = await db.collection('contact').find().toArray();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: 'Error getting contact', error: err });
  }
};

const getContactById = async (req, res) => {
  try {
    const contactId = req.params.id;

    // Validate MongoDB ObjectId
    if (!ObjectId.isValid(contactId)) {
      return res.status(400).json({ message: 'Invalid MongoDB ObjectId format' });
    }

    const db = getDb().db('contact_db');
    const contact = await db.collection('contact').findOne({ _id: new ObjectId(contactId) });

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json(contact);
  } catch (err) {
    console.error('Error fetching contact:', err);
    res.status(500).json({
      message: 'Error getting contact',
      error: err.message || err.toString()
    });
  }
};

module.exports = {
  getAllContacts,
  getContactById,
};
