```javascript
const mongoose = require('mongoose');

const password = 'BN1NingGv9NBgV9lJGYO9CjU'; // MongoDB password

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      auth: {
        user: 'admin',
        password: password
      }
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectDB;
```
