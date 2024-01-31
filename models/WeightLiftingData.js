import mongoose from 'mongoose';

const weightLiftingDataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date },
  exercise: { type: String },
  weight: { type: Number },
  repetitions: { type: Number },
});


export default mongoose.models.WeightLiftingData || mongoose.model("WeightLiftingData", weightLiftingDataSchema);

