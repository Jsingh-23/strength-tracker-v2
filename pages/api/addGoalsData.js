import User from "@/models/User";
import initDB from "@/utils/db";
import { getSession } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { getServerSession } from "next-auth/next"
import WeightLiftingData from "@/models/WeightLiftingData";

import { getToken } from "next-auth/jwt";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import { useRouter } from "next/router";


// console.log("hello");
initDB();

export default async function handler(req, res) {

  // console.log("hi!");
  const session = await getServerSession(req, res, authOptions);
  const token = await getToken({ req });


  if (!session) {
    console.log('no session...');
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  try {
    console.log("req body: ", req.body);

    const { exercise, weight, repetitions} = req.body;
    const userId = session.user.id;

    var curr_user = await User.findById(userId).exec();
    var curr_user_goals = curr_user.goalsData;

    // console.log("hey");

    const goals = {exercise, weight, repetitions};


    // if the user already has a goal for that specific exercise, then overwrite the previous goal
    if ( curr_user_goals.find((item) => item.exercise === exercise)) {
      console.log("this exercise already has a goal!!!");
      const index = curr_user.goalsData.findIndex(obj => obj.exercise === exercise);
      if (index !== -1) {
        curr_user.goalsData[index] = goals;
        await curr_user.save();
        res.status(200).json("Submitted!");
        return;
      }
    }

    console.log("goals data: ", goals);
    // console.log(curr_user);

    curr_user.goalsData.push(goals);
    await curr_user.save();
    console.log("is this it...");



    // console.log("Complete!!!");
    // res.redirect(req.headers.referer);
    res.status(200).json("Submitted!");
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
}