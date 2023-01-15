import { Schema, model } from 'mongoose';

const commentSchema = new Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    createdAt: {type: Number, default: Date.now},
    updatedAt: {type: Number, default: Date.now},
  },
  { versionKey: false, timestamps: true },
);

export default model('Comment', commentSchema);

