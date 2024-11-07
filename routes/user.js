const path = require('path');

const express = require('express');

const usercontrollers = require('../controllers/user');

const router = express.Router();

router.post('/signup', usercontrollers.postAddUsers);
router.post('/login', usercontrollers.postLogin);


module.exports = router;