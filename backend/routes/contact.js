// routes/contacts.js
const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact');

// GET all contacts
router.get('/', contactController.getAllContacts);
/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all contacts
 *     responses:
 *       200:
 *         description: Success
 */

// GET one contact by ID
router.get('/:id', contactController.getContactById);
/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get a contact by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Contact not found
 */

// POST - create new contact
router.post('/', contactController.createContact);
/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - favoriteColor
 *               - birthday
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               favoriteColor:
 *                 type: string
 *               birthday:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contact created
 */

// PUT - update contact
router.put('/:id', contactController.updateContact);
/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Update a contact by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               favoriteColor:
 *                 type: string
 *               birthday:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contact updated
 *       404:
 *         description: Contact not found
 */

// DELETE - delete contact
router.delete('/:id', contactController.deleteContact);
/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete a contact by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact deleted
 *       404:
 *         description: Contact not found
 */

module.exports = router;
