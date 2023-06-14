import User from "@/models/User";
import initDB from "@/utils/db";
import { getSession } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { getServerSession } from "next-auth/next"
import WeightLiftingData from "@/models/WeightLiftingData";

import { getToken } from "next-auth/jwt";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import { useRouter } from "next/router";
import Router from 'next/router';

// const { ObjectId } = require('mongoose');



initDB();

export default async function handler(req, res) {
  console.log("hii!!!!");
  try {
    const session = await getServerSession(req, res, authOptions);
    const token = await getToken({ req });

    const {objectId} = req.query;
    console.log("query: " + objectId);

    console.log("user: " + session.user.id);

    const userId = session.user.id;


    // finds the user document that contains a 'liftingData' object with the specified '_id'
    // $pull operator is used to remove the element from the 'liftingData' array with the specified 'objectId'
    await User.findOneAndUpdate(
    { 'liftingData._id': objectId} ,
    { $pull: { liftingData: { _id: objectId }}},
    { new: true}
    );
  } catch (error) {
    console.error("Error");
  }



  console.log("Complete!");
  res.status(200).json( "Complete!" );
  // console.log("redirecting...");
  // Router.reload(window.location.pathname);
  // res.redirect(req.headers.referer);
};