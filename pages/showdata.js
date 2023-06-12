import { getSession } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import BarChart from "@/components/BarChart";
import LineChart from "@/components/LineChart";
import WeightLiftingDataform from "@/components/WeightLiftingDataform";
import { redirect } from 'next/navigation';
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ExerciseTable from "@/components/ExerciseTable";

import initDB from "@/utils/db";
import { getToken } from "next-auth/jwt";

import styles from '../styles/table.module.css'


const ShowData = () => {

  const [liftingData, setLiftingData] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState('Bench Press');

  const handleExerciseChange = (exercise) => {
    setSelectedExercise(exercise);
  };

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

    const { data: session, status } = useSession();

    if (liftingData === null) {
      return <div> Loading... </div>
    }

    console.log(liftingData);




    return (
      <div>
        <div className={styles.tableContainer}>
          <ExerciseTable
          className={styles.table}
          exercise={selectedExercise}
          data={liftingData}>
          </ExerciseTable>
        </div>

        <div className={styles.buttonGroup}>
          <button
            className="btn btn-primary"
            style={{ margin: '0 5px' }}
            onClick={() => handleExerciseChange('Bench Press')}
          >
            Bench Press
          </button>
          <button
            className="btn btn-primary"
            style={{ margin: '0 5px' }}
            onClick={() => handleExerciseChange('Squat')}
          >
            Squats
          </button>
          <button
            className="btn btn-primary"
            style={{ margin: '0 5px' }}
            onClick={() => handleExerciseChange('Deadlift')}
          >
            Deadlift
          </button>
        </div>

      </div>
    )
}

export default ShowData;