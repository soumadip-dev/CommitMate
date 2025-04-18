// IMPORTING MODULES
import mongoose, { Schema } from 'mongoose';

// DEFINE CONNECTION REQUEST SCHEMA
const connectionRequestSchema = new Schema(
  {
    fromUserId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    toUserId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ['like', 'pass', 'match', 'reject'],
        message: '{VALUE} is not a valid status',
      },
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// CREATING A COMPOUND INDEX TO IMPROVE QUERY PERFORMANCE FOR FINDING REQUESTS
connectionRequestSchema.index({
  fromUserId: 1,
  toUserId: 1,
});

// CHECK IF toUser AND fromUser ARE NOT THE SAME BEFORE SAVING TO DATABASE
connectionRequestSchema.pre('save', async function (next) {
  if (this.fromUserId.equals(this.toUserId)) {
    throw new Error('Cannot send connection request to yourself');
  }
  next();
});

// CREATE AND EXPORT CONNECTION REQUEST MODEL
export const ConnectionRequest = mongoose.model(
  'ConnectionRequest',
  connectionRequestSchema,
);
