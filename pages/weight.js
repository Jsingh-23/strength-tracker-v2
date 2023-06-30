import { getSession } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import BarChart from "@/components/BarChart";
import LineChart from "@/components/LineChart";
import TDEEForm from "@/components/TDEEForm";
import { redirect } from 'next/navigation';
import Link from "next/link";
import React, { useEffect, useState } from "react";

import initDB from "@/utils/db";
import { getToken } from "next-auth/jwt";
import styles from '@/styles/form.module.css';


const WeightPage = () => {

  const [liftingData, setLiftingData] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [currentExercise, setCurrentExercise] = useState('Bench Press');

  const [formSubmitted, setFormSubmitted] = useState(null);
  const [chartDataType, setChartDataType] = useState("Max Weight");
  const [formSubmissions, setFormSubmissions] = useState(0);


  useEffect(() => {
    console.log("running use effect...");
    const fetchData = async () => {
      console.log("running useEffect...");
      try {
        const response = await fetch("/api/getLiftingData");
        if (response.ok) {
          const data = await response.json();
          console.log("length in useeffect: ", data.length);
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
  if (status === "authenticated") {
    return (
      <TDEEForm></TDEEForm>
      )
  }

  return <Link href="/login"> Login </Link>
}

export default WeightPage;