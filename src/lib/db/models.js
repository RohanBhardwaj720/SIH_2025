import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  image: { type: String },
  isGeneratingMindMap: { type: Boolean, default: false }, 
  isGeneratingQuiz: { type: Boolean, default: false }, 
  createdAt: { type: Date, default: Date.now }
});


export const User = mongoose.models.User || mongoose.model('User', userSchema);