import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connection.once('open', () => {
  console.log('Database connection ready');
});

mongoose.connection.once('error', (err) => {
  console.log('database error:', err);
});

const MONGO_URL = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASS}@cluster0.bnsubye.mongodb.net/nasa?retryWrites=true&w=majority`;

export const mongoConnect = async () => {
  console.log('mongo_url', MONGO_URL);
  await mongoose.connect(MONGO_URL, {});
};

export const mongoDisconnect = async () => {
  await mongoose.disconnect();
};
