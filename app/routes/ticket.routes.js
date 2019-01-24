"use strict";

const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticket.controller');

router.get('/', ticketController.getTickets);
router.post('/', ticketController.addTicket);
router.get('/:ticketId', ticketController.getTicket);
router.put('/:ticketId', ticketController.updateTicket);
router.delete('/:ticketId', ticketController.deleteTicket);

module.exports = router;
