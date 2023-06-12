import User from "@/models/User";

export async function getUserById(userId) {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    throw new Error("Failed to fetch user data");
  }
}