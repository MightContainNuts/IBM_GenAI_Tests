```javascript
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

const generateToken = (user) => {
    const token = jwt.sign({ username: user.username }, '936b27a9aab0ac08faaa5ea5c73b50be7b0f034158ae58df46d1dadbb3f846f9');
    return token;
};

const formatUserData = (user) => {
  const formattedUser = {
    username: user.username,
    email: user.email,
    learningPreferences: user.learningPreferences,
    pastPerformance: user.pastPerformance
  };
  return formattedUser;
};

module.exports = { hashPassword, generateToken, formatUserData };
```
