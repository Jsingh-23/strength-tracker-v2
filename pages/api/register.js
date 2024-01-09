import User from "@/models/User";
import initDB from "@/utils/db";

initDB();

export default async function handler(req, res) {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }
    user = new User({ 
      name, 
      email, 
      password,
      goalsData: [
        { exercise: 'Bench Press', current_max: 0},
        { exercise: 'Deadlift', current_max: 0},
        { exercise: 'Squat', current_max: 0},
      ] });

    console.log(user);
    await user.save();

    res.json({
      message: "Account created",
    });
  } catch (error) {
    console.log(error);
  }
}