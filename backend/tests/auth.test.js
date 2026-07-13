const request = require('supertest');
const bcrypt = require('bcryptjs');

const mockQuery = jest.fn();

jest.mock('../config/db', () => ({
  pool: { query: mockQuery },
  waitForDatabase: jest.fn(),
}));

const app = require('../app');

describe('Authentication API', () => {
  beforeEach(() => {
    mockQuery.mockReset();
  });

  test('POST /auth/signup should create a new user', async () => {
    mockQuery
      .mockResolvedValueOnce({ rows: [] })
      .mockResolvedValueOnce({
        rows: [{ id: 1, name: 'Ada', email: 'ada@example.com', created_at: '2024-01-01T00:00:00.000Z' }],
      });

    const response = await request(app)
      .post('/auth/signup')
      .send({ name: 'Ada', email: 'ada@example.com', password: 'secret123' });

    expect(response.statusCode).toBe(201);
    expect(response.body.user).toMatchObject({
      name: 'Ada',
      email: 'ada@example.com',
    });
    expect(response.body.user).not.toHaveProperty('password');
  });

  test('POST /auth/login should return a token for a valid user', async () => {
    const hashedPassword = await bcrypt.hash('secret123', 10);

    mockQuery.mockResolvedValueOnce({
      rows: [{ id: 1, name: 'Ada', email: 'ada@example.com', password: hashedPassword }],
    });

    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'ada@example.com', password: 'secret123' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body.user).toMatchObject({
      name: 'Ada',
      email: 'ada@example.com',
    });
  });
});
