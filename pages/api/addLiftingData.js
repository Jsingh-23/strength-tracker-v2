import User from "@/models/User";
import initDB from "@/utils/db";
import { getSession } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { getServerSession } from "next-auth/next"
import WeightLiftingData from "@/models/WeightLiftingData";

import { getToken } from "next-auth/jwt";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import { useRouter } from "next/router";


console.log("hello");
initDB();

export default async function handler(req, res) {

  console.log("hi!");
  const session = await getServerSession(req, res, authOptions);
  const token = await getToken({ req });


  if (!session) {
    console.log('no session...');
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  try {
    console.log("req body: ", req.body);

    const { exercise, weight, repetitions, date} = req.body;
    const userId = session.user.id;

    var curr_user = await User.findById(userId).exec();
    const liftData = {exercise, weight, repetitions, date};


    // find the current user's goalsData to update their heaviest weight lifted for corresponding exercise
    var curr_user_goals = curr_user.goalsData.find(goal => goal.exercise === liftData.exercise);
    console.log(curr_user);
    // if the user has set a new PR, update their PR (goalsData.currentMax)
    if (liftData.weight > curr_user_goals.current_max) {
      curr_user_goals.current_max = liftData.weight;
    }

    // console.log("lift data: ", liftData);
    // console.log('break');

    // add this dataset to user's liftingData field
    curr_user.liftingData.push(liftData);
    await curr_user.save();
    console.log("is this it...");



    // console.log("Complete!!!");
    // res.redirect(req.headers.referer);
    res.status(200).json("Submitted!");
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
}