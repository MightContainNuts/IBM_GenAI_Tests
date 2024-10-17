```javascript
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User Registration Endpoint
router.post('/register', userController.registerUser);

// User Login Endpoint
router.post('/login', userController.loginUser);

// Profile Update Endpoint
router.put('/profile/:username', userController.updateUserProfile);

// User Data Retrieval Endpoint
router.get('/profile/:username', userController.getUserData);

module.exports = router;
```
