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
  } 
  catch (err) {
    console.error('Error fetching contact:', err);
    res.status(500).json({
      message: 'Error getting contact',
      error: err.message || err.toString()
    });
  }
};

const createContact = async (req, res) => {
  const { firstName, lastName, email, favoriteColor, birthday } = req.body;

  if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const db = getDb().db('contact_db');
    const result = await db.collection('contact').insertOne({
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday
    });

    res.status(201).json({ message: 'Contact created', id: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create contact', error: err });
  }
};

const updateContact = async (req, res) => {
  const { firstName, lastName, email, favoriteColor, birthday } = req.body;
  const contactId = req.params.id;

  // Validate MongoDB ID
  if (!ObjectId.isValid(contactId)) {
    return res.status(400).json({ message: 'Invalid contact ID' });
  }

  // Validate fields
  if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
    return res.status(400).json({ message: 'All fields are required for update' });
  }

  try {
    const db = getDb().db('contact_db');

    const update = {
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday
    };

    const result = await db
      .collection('contact')
      .updateOne({ _id: new ObjectId(contactId) }, { $set: update });

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update contact', error: err.message });
  }
};


const deleteContact = async (req, res) => {
  const contactId = req.params.id;

  if (!ObjectId.isValid(contactId)) {
    return res.status(400).json({ message: 'Invalid contact ID' });
  }

  try {
    const db = getDb().db('contact_db');
    const result = await db.collection('contact').deleteOne({ _id: new ObjectId(contactId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact deleted successfully' });
  } 
  catch (err) {
    res.status(500).json({ message: 'Failed to delete contact', error: err });
  }
};


module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
};
