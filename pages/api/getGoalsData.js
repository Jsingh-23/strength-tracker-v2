import User from "@/models/User";
import initDB from "@/utils/db";
import { getSession } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { getServerSession } from "next-auth/next"
import WeightLiftingData from "@/models/WeightLiftingData";

import { getToken } from "next-auth/jwt";
import { authOptions } from "@/pages/api/auth/[...nextauth]";



initDB();

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  try {
    const userId = session.user.id;
    var curr_user = await User.findById(userId).exec();

    // return an array of goals data objects
    const my_data = curr_user.goalsData;
    res.status(200).json(my_data);
  } catch (error) {
    res.status(500).json({ error: 'Unable to retrieve data' });
  }

}