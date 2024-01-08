import { getSession } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import BarChart from "@/components/BarChart";
import LineChart from "@/components/LineChart";
import GoalsDataForm from "@/components/GoalsDataForm";
import { redirect } from 'next/navigation';
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from '@/styles/goals.module.css';


import initDB from "@/utils/db";
import { getToken } from "next-auth/jwt";

const GoalsPage = () => {

  const [liftingData, setLiftingData] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [currentExercise, setCurrentExercise] = useState('Bench Press');
  const [goalsData, setGoalsData] = useState([]);
  const [formSubmissions, setFormSubmissions] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      console.log("running useEffect...");
      try {

        const response = await fetch("/api/getLiftingData");
        if (response.ok) {
          const data = await response.json();
          console.log("length in useeffect: ", data.length);
          setLiftingData(data);
          // console.log(data);
        } else {
          throw new Error("Couldn't fetch data :( ");
        }

        const response2 = await fetch("/api/getExerciseData");
        if (response2.ok) {
          const data2 = await response2.json();
          // console.log("data2: ", data2);
          setExercises(data2);
        } else {
          throw new Error("Couldn't fetch exercises array");
        }

        const response3 = await fetch("/api/getGoalsData");
        console.log("getting goals data again");
        if (response3.ok) {
          const data3 = await response3.json();
          // console.log("data2: ", data2);
          setGoalsData(data3);
        } else {
          throw new Error("Couldn't fetch goals array");
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
    }, [formSubmissions]); // end of useEffect()

  const { data: session, status } = useSession();

  if (status === "unauthenticated") {
    router.push("/login");
  }

  if (liftingData === null) {
      return <div> Loading... </div>;
  }

  var chart_labels = [];
  var chart_goals_data = [];
  var repetitions_data = [];

  // for each goal, get its exercise, weight, and number of reps
  goalsData.forEach(function (arrayItem) {
    // all exercises in chart_labels are unique
    chart_labels.push(arrayItem.exercise);
    chart_goals_data.push(arrayItem.weight);
    repetitions_data.push(arrayItem.repetitions);
  });


  // find max weight for each exercise
  var maxWeights = [];
  chart_labels.forEach((exercise) => {
    const weights = liftingData
      .filter((data) => data.exercise === exercise)
      .map((data) => data.weight);
    const maxWeight = weights.length > 0 ? Math.max(...weights) : 0;
    maxWeights.push(maxWeight);
  })

  console.log('maxs: ', maxWeights);

    // when the form is submitted, I want to change my page's formSubmissions state
  // so that the charts are rerendered with the new data
  const handleFormSubmit = () => {
    console.log("Submitted! ", formSubmissions);
    setFormSubmissions(formSubmissions + 1);
  }

  var bar_chart_config = {
    labels: chart_labels,
    datasets: [
      {
        label: 'My Max',
        data: maxWeights,
        backgroundColor: [
          '#3183BE'
        ],
        borderWidth: 3,
        point: {
          backgroundColor: "black"
        }
      },
      {
        label: 'Goal',
        data: goalsData.map((goal) => goal.weight),
        backgroundColor: "#9FCBE2",
        // borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 3,
      }
    ],
  }




if (status === "authenticated") {
  return (
    <div className={styles.goals_container}>

        <h1 className={styles.header}> Goals </h1>
        <p> Visualize the maximum amount you have lifted for each exercise,
          and your goal for the corresponding exercise
        </p>

        <BarChart my_data={bar_chart_config} rep_data={[]} submissions_state = {formSubmissions}></BarChart>
        {/* <LineChart my_data={bar_chart_config} rep_data={[]}></LineChart> */}


        <GoalsDataForm onFormSubmit={handleFormSubmit}></GoalsDataForm>

    </div>
  )
}

return <Link href="login"> Login </Link>
}

export default GoalsPage;