import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    avatarUrl: String,
    createdAt: {type: Number, default: Date.now},
    updatedAt: {type: Number, default: Date.now},
  },
  { versionKey: false, timestamps: true },
);

export default model('User', userSchema);
