```javascript
const request = require('supertest');
const app = require('../app'); // Assuming you have your Express app set up

describe('User Service Tests', () => {
  let token;

  beforeAll((done) => {
    request(app)
      .post('/login')
      .send({ username: 'testuser', password: 'password123' })
      .end((err, response) => {
        token = response.body.token; // Store the token for authenticated requests
        done();
      });
  });

  it('should register a new user', async () => {
    const response = await request(app)
      .post('/register')
      .send({ username: 'newuser', email: 'newuser@example.com', password: 'newpassword' });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('message', 'User registered successfully');
  });

  it('should not register a user with existing username', async () => {
    const response = await request(app)
      .post('/register')
      .send({ username: 'testuser', email: 'duplicate@example.com', password: 'password123' });

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('message', 'An error occurred during user registration');
  });

  it('should update user profile', async () => {
    const response = await request(app)
      .put('/profile/testuser')
      .set('Authorization', `Bearer ${token}`)
      .send({ learningPreferences: ['javascript', 'nodejs'] });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'User profile updated successfully');
  });

  it('should retrieve user data', async () => {
    const response = await request(app)
      .get('/profile/testuser')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('username', 'testuser');
  });
});
```
