import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
    exercises: {
      type: [String],
      default: ['Bench Press', 'Deadlift', 'Squat'],
    },
    liftingData: [
      {
        repetitions: { type: Number },
        exercise: { type: String },
        date: { type: Date},
        weight: { type: Number},
      }
    ],
    goalsData: [
      {
        repetitions: {type: Number},
        exercise: { type: String},
        weight: { type: Number},
        current_max: { type: Number}
      }
    ],
  }
);

userSchema.pre("save", async function (next) {
  // Hash password before saving user
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.matchPassword = async function (password) {
  // Compare provided password with hashed password
  return await bcrypt.compare(password, this.password);
};

export default mongoose.models.User || mongoose.model("User", userSchema);