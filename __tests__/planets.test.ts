import request from 'supertest';
import app from '../src/app';

describe('Test /GET planets', () => {
  it('Should respond with a 200 status response', async () => {
    const response = await request(app).get('/planets');

    expect(response.statusCode).toBe(200);
  });
});
