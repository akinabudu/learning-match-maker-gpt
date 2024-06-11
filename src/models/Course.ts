import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  materials: [{ type: String }], // URLs to videos, PDFs, etc.
  liveSessions: [{ type: Date }],
  inPersonSessions: [{ type: Date }],
  price: { type: Number, required: true }, // Course price
});

export default mongoose.models.Course || mongoose.model('Course', courseSchema);
