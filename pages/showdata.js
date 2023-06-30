import { getSession } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import BarChart from "@/components/BarChart";
import LineChart from "@/components/LineChart";
import WeightLiftingDataform from "@/components/WeightLiftingDataform";
import { redirect } from 'next/navigation';
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import ExerciseTable from "@/components/ExerciseTable";
// import User from "@/models/User";


import initDB from "@/utils/db";
import { getToken } from "next-auth/jwt";

import styles from '../styles/table.module.css'


const ShowData = () => {

  const router = useRouter();

  const [liftingData, setLiftingData] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState('Bench Press');
  const [exerciseName, setExerciseName] = useState('');
  const [isReady, setIsReady] = useState(false);
  const [exerciseInput, setExerciseInput] = useState('');

  const exerciseInputRef = useRef(null);



  const handleExerciseChange = (exercise) => {
    setSelectedExercise(exercise);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getLiftingData");
        console.log("fetching data again...");
        if (response.ok) {
          const data = await response.json();
          setLiftingData(data);
        } else {
          throw new Error("Couldn't fetch data :( ");
        }
        const response2 = await fetch("/api/getExerciseData");
        if (response2.ok) {
          const data2 = await response2.json();
          setExercises(data2);
        } else {
          throw new Error("Couldn't fetch exercises array");
        }

        setIsReady(true);

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
    }, [exerciseName]); // end of useEffect()

    // code for handling what happens when the user inputs and uploads a new exercise
    const handleSubmit = async ( data, e ) => {

      event.preventDefault();
      console.log("Form Submitted!");

      // exercise name validation
      var newExerciseName = document.getElementById('exerciseName').value;
      var letters = /^[A-Za-z ]+$/;
      newExerciseName = newExerciseName
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');

      if (!newExerciseName.match(letters)) {
        alert("Name must contain only letters!");
        return false;
      }

      console.log("newExerciseName: " + newExerciseName);

      const JSONdata = JSON.stringify(newExerciseName);

      // console.log("json data: " + JSONdata);

      // if the inputted exercise is unique, then add it to the user's exercises array
      if (exercises.includes(newExerciseName)) {
        alert("this item is not unique!");
        console.log(exerciseName);
        return;
      } else {
        console.log("this item is unique!");
        // setExerciseName(newExerciseName);
        // setSelectedExercise(newExerciseName);
        console.log("updated: " + exerciseName);

        try {
          const res = await fetch('/api/addExercise', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSONdata,
          });
          if (res.ok) {
            console.log("Added new exercise succesfully!");
            console.log("old state: " + exerciseName);
            setExerciseName(newExerciseName);
            console.log("new state: " + exerciseName);

          } else {
            console.error("Error adding new exercise");
          }
        } catch (error) {
          console.error("Unable to add new exercise", error);
        }
      }
      console.log("exercise input 1:  " + exerciseInput)
      exerciseInputRef.current.value = "";

    }

    const { data: session, status } = useSession();
    if (status === "unauthenticated") {
      router.push("/login");
    }

    if (liftingData === null) {
      return <div> Loading... </div>
    }

    return (
      <div>
        {isReady && (
          <div>
            <div className={styles.tableContainer}>
              <ExerciseTable
                className={styles.table}
                exercise={selectedExercise}
                data={liftingData}
              ></ExerciseTable>
            </div>

            <div className={styles.buttonGroup}>
              {exercises.map((exercise) => (
                <button
                  key={exercise}
                  className="btn btn-primary"
                  style={{ margin: '0 5px' }}
                  onClick={() => handleExerciseChange(exercise)}
                >
                  {exercise}
                </button>
              ))}
            </div>

            <div className={`card bg-light ${styles.container}`}>
              <form onSubmit={(e) => handleSubmit(e)} style={{ maxWidth: '576px', margin: 'auto' }}>
                <div>
                  <h2 style={{ textAlign:'center'}}> Add A New Exercise!</h2>
                  <label htmlFor="exerciseName"> Exercise Name:&nbsp;&nbsp; </label>
                  <input
                  type="text"
                  id="exerciseName"
                  ref={exerciseInputRef}
                  required>
                  </input>
                  <button className="btn btn-secondary btn-sm">Upload</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );

}

export default ShowData;