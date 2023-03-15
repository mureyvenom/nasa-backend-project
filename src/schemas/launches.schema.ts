import { Schema, model } from 'mongoose';

const required = true;

export const launchesSchema = new Schema({
  flightNumber: {
    type: Number,
    required,
  },
  mission: {
    type: String,
    required,
  },
  rocket: {
    type: String,
    required,
  },
  launchDate: {
    type: Date,
    required,
  },
  destination: {
    type: String,
    required,
  },
  // destination: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Planet',
  // },
  customer: {
    type: [String],
    required,
  },
  upcoming: {
    type: Boolean,
    default: true,
  },
  success: {
    type: Boolean,
    default: true,
  },
});

export default model('Launch', launchesSchema);
