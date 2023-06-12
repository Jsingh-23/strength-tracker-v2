import getUserById from "@/utils/userUtils";

export default async function handler(req, res) {
  const { userId } = req.query;

  try {
    const userData = await getUserById(userId);
    res.status(200).json(userData);
  } catch (error) {
    console.error("failed to fetch user data:" , error);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
}

