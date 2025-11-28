const express = require('express');
const { createUser, listUsers } = require('../controllers/userController');

const router = express.Router();

// POST 
router.post('/', createUser);

// GET 
router.get('/', listUsers);

module.exports = router;
