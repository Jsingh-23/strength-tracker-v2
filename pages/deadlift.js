import { getSession } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import BarChart from "@/components/BarChart";
import LineChart from "@/components/LineChart";
import WeightLiftingDataform from "@/components/WeightLiftingDataform";
import { redirect } from 'next/navigation';
import Link from "next/link";
import React, { useEffect, useState } from "react";

import initDB from "@/utils/db";
import { getToken } from "next-auth/jwt";

// import WeightLiftingData from "@/models/WeightLiftingData";

// async function getBenchPressDataForUser(userId) {
//   try {
//     const data = await WeightLiftingData.find({ userId, exercise: 'Bench Press'}).exec();
//     return data;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// }



const DeadliftPage = () => {

  const [liftingData, setLiftingData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getLiftingData");
        if (response.ok) {
          const data = await response.json();
          setLiftingData(data);
          // console.log(data);
        } else {
          throw new Error("Couldn't fetch data :( ");
        }
      } catch (error) {
          console.error(error);
        }
      }; // end of fetchData function

      const getData = async () => {
        try {
          const myData = await fetchData();
        } catch (error) {
          console.error();
        }
      }

      getData();
    }, []); // end of useEffect()

  var chart_data = [];
  var chart_labels = [];
  var repetitions_data = [];


  const { data: session, status } = useSession();

  if (liftingData === null) {
      return <div> Loading... </div>;
  }

  // console.log("this is the lifting data:  " + liftingData[0].date);

  console.log("lifting data: " + liftingData);
  // sort the liftingData by date
  liftingData.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB;
  });

  // create an array of weights, and corresponding dates
  liftingData.forEach(function (arrayItem) {
    // console.log(arrayItem);
    if (arrayItem.exercise === 'Deadlift') {
      chart_labels.push(arrayItem.date);
      chart_data.push(arrayItem.weight);
      repetitions_data.push(arrayItem.repetitions);
    }
  });


  // format the date labels so that they are more readable
  const formatted_labels = chart_labels.map(dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {timeZone: 'UTC'});
  });


  var bar_chart_config = {
    labels: formatted_labels,
    datasets: [
      {
        label: 'Weight',
        data: chart_data,
        backgroundColor: [
          'rgba(0,191,255, 0.6)',
          'rgba(0,191,255, 0.6)',
          'rgba(0,191,255, 0.6)',
        ],
        borderWidth: 5,
        point: {
          backgroundColor: "black"

        }
      }
    ]
  }

  var line_chart_config = {
    labels: formatted_labels,
    datasets: [
      {
        label: 'Weight',
        data: chart_data,
        backgroundColor: [
          'rgba(255,127,80, 0.6)',
          'rgba(255,127,80, 0.6)',
          'rgba(255,127,80, 0.6)',
        ],
        borderWidth: 5,
        point: {
          backgroundColor: "black"

        }
      }
    ]
  }

  const exerciseOptions = [
    { value: 'Deadlift', label: 'Deadlift'}
  ];

  if (status === "authenticated") {
    console.log(session); // log statement

    return (
      <div>
        <h1 style={{textAlign:"center"}}> Deadlift Tracking!</h1>
        <BarChart my_data={bar_chart_config} rep_data={repetitions_data}></BarChart>
        <LineChart my_data={line_chart_config} rep_data={repetitions_data}></LineChart>
        <WeightLiftingDataform exerciseOptions={exerciseOptions}></WeightLiftingDataform>
      </div>
    )
  }

  return <Link href="/login"> Login </Link>
}


export default DeadliftPage;