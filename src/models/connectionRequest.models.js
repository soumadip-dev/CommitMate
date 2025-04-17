import mongoose, { Schema } from 'mongoose';

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

export const ConnectionRequest = mongoose.model(
  'ConnectionRequest',
  connectionRequestSchema,
);
