import request from 'supertest';
import { mongoConnect } from '../src/utils/mongo';
import app from '../src/app';

describe('Test /GET planets', () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  it('Should respond with a 200 status response', async () => {
    const response = await request(app).get('/planets');

    expect(response.statusCode).toBe(200);
  });
});
