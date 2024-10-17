```javascript
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// User Registration Function
const registerUser = async (req, res) => {
  try {
    const { username, email, password, learningPreferences, pastPerformance } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      learningPreferences,
      pastPerformance
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred during user registration' });
  }
};

// User Login Function
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred during user login' });
  }
};

// Profile Update Function
const updateUserProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const updatedUser = req.body;

    await User.findOneAndUpdate({ username }, updatedUser);
    res.status(200).json({ message: 'User profile updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred during user profile update' });
  }
};

// User Data Retrieval Function
const getUserData = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred during user data retrieval' });
  }
};

module.exports = { registerUser, loginUser, updateUserProfile, getUserData };
```
