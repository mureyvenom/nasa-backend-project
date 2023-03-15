import { Schema, model } from 'mongoose';

const required = true;

export const planetsSchema = new Schema({
  keplerName: {
    type: String,
    required,
  },
});

export default model('Planet', planetsSchema);
