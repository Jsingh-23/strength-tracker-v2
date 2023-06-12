import User from "@/models/User";
import initDB from "@/utils/db";
import { getSession } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { getServerSession } from "next-auth/next"
import WeightLiftingData from "@/models/WeightLiftingData";

import { getToken } from "next-auth/jwt";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import { useRouter } from "next/router";


initDB();

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  const token = await getToken({ req });

  if (!session) {
    console.log('no session...');
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  try {

    const { exercise, weight, repetitions, date} = req.body;
    const userId = session.user.id;

    var curr_user = await User.findById(userId).exec();
    const liftData = {exercise, weight, repetitions, date};

    console.log("date: " + date);

    curr_user.liftingData.push(liftData);
    await curr_user.save();

    const weightLiftingData = new WeightLiftingData({
      userId, exercise, weight, repetitions, date
    });

    await weightLiftingData.save();

    res.redirect(req.headers.referer);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
}