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
  // const session = await getServerSession(req, res, authOptions);

  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized'});
    }

    // const userId = session.user.id;
    var user = await User.findById(session.user.id)
      .select('liftingData')
      .lean()
      .exec();
    
    if (!user) {
      return res.status(404).json({ error: 'User not found'});
    } 

    // Cache control headers for performance
    res.setHeader('Cache-control', 'private, max-age=10');
    return res.status(200).json(user.liftingData || []);

    // return an array of lifting data objects
    // const my_data = curr_user.liftingData;
    // res.status(200).json(my_data);
  } catch (error) {
    console.error('Error in getLiftingData: ', error);
    res.status(500).json({ error: 'Unable to retrieve data' });
  }

}