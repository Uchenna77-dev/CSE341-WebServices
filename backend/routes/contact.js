// routes/contacts.js
const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact');

// GET all contacts
router.get('/', contactController.getAllContacts);

// GET one contact by ID
router.get('/:id', contactController.getContactById);

module.exports = router;
