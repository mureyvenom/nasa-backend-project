import http from 'http';
import dotenv from 'dotenv';
import app from './app';
import { loadPlanetsData } from './models/planets.model';
import mongoose from 'mongoose';

dotenv.config();

const PORT = process.env?.PORT ?? 6500;

const server = http.createServer(app);

const MONGO_URL = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASS}@cluster0.bnsubye.mongodb.net/nasa?retryWrites=true&w=majority`;

mongoose.connection.once('open', () => {
  console.log('Database connection ready');
});

mongoose.connection.once('error', (err) => {
  console.log('database error:', err);
});

const runServer = async () => {
  await mongoose.connect(MONGO_URL, {});
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
  });
};

runServer().catch((err) => {
  console.log('Server ran into an error', err);
});
