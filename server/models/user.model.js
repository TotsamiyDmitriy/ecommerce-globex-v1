import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    isAuthor: { type: Boolean, default: false, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    email: { type: String, required: true },
    photoURL: { type: String, required: true, default: 'image' },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

const User = mongoose.model('User', userSchema);

export default User;
