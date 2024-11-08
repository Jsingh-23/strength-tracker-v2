import User from "@/models/User";
import initDB from "@/utils/db";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]";

initDB();

export default async function handler(req, res) {
  
  try {
    const session = await getServerSession(req, res, authOptions);

    // Verify authentication
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Get and validate the exercise name
    const exerciseName  = req.body;
    if (typeof exerciseName !== 'string' || !exerciseName.trim()) {
      return res.status(400).json({ error: 'Invalid exercise name' });
    }
    
    // Format the exercise name
    const formattedName = exerciseName
      .trim()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
    
    // Validate format 
    if (!/^[A-Za-z ]+$/.test(formattedName)) {
      return res.status(400).json({ error: 'Exercise name must contain only letters and spaces' });
    }

    // Verify user and check for duplicate exercise
    const user = await User.findById(session.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found'});
    }
    if (user.exercises.includes(formattedName)) {
      return res.status(409).json({ error: 'Exercise already exists'});
    }

    // Add new exercise
    user.exercises.push(formattedName);
    await user.save();

    // Clear any relevant cache
    res.setHeader('cache-control', 'no-cache');

    return res.status(201).json({
      message: 'Exercise added succesfully',
      exercise: formattedName
    });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
}