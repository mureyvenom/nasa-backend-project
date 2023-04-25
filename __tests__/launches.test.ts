import request from 'supertest';
import { mongoConnect, mongoDisconnect } from '../src/utils/mongo';
import app from '../src/app';

describe('launches api', () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  describe('Test /GET launches', () => {
    it('Should respond with a 200 status response', async () => {
      const response = await request(app).get('/launches');

      expect(response.statusCode).toBe(200);
    });
  });

  describe('Test /POST launches', () => {
    it('Should respond with a 200 status response', async () => {
      const newLaunch = {
        destination: 'Kepler-296 A f',
        rocket: 'Venom Experimental V2',
        mission: 'Venom V2S1',
        launchDate: 'January 27, 2027',
      };

      const response = await request(app).post('/launches').send(newLaunch);
      expect(response.statusCode).toBe(201);
    });

    it('Should catch if required fields are missing', async () => {
      const newLaunch = {
        destination: 'Jest Kepler-186 F',
        rocket: 'Jest Venom Experimental V2',
        mission: 'Jest Venom V2S1',
        // launchDate: 'January 27, 2027',
      };

      const response = await request(app).post('/launches').send(newLaunch);

      expect(response.statusCode).toBe(400);
    });

    it('Should catch inalid dates', async () => {
      const newLaunch = {
        destination: 'Jest Kepler-186 F',
        rocket: 'Jest Venom Experimental V2',
        mission: 'Jest Venom V2S1',
        launchDate: 'Invalid',
      };

      const response = await request(app).post('/launches').send(newLaunch);

      expect(response.statusCode).toBe(400);
    });
  });

  describe('Test /DELETE launches', () => {
    it('Should respond with a 200 status response', async () => {
      const response = await request(app).delete('/launches/101');

      expect(response.statusCode).toBe(200);
    });

    it('Should confirm if launch exists', async () => {
      const response = await request(app).delete('/launches/5000');

      expect(response.statusCode).toBe(404);
    });

    it('Should catch if id is missing', async () => {
      const response = await request(app).delete('/launches');

      expect(response.statusCode).toBe(400);
    });
  });
});
