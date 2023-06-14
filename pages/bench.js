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

const BenchPage = () => {

  const [liftingData, setLiftingData] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(null);
  const [chartDataType, setChartDataType] = useState("Volume");

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


  // store weight, date, and repetitions data for Bench Press
  var chart_data = [];
  var chart_labels = [];
  var repetitions_data = [];

  const { data: session, status } = useSession();

  if (liftingData === null) {
      return <div> Loading... </div>;
  }


  // sort the liftingData by date
  liftingData.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB;
  });

  // create an array of weights, and corresponding dates
  liftingData.forEach(function (arrayItem) {
    // console.log(arrayItem);
    if (arrayItem.exercise === 'Bench Press') {
      chart_labels.push(arrayItem.date);
      chart_data.push(arrayItem.weight);
      repetitions_data.push(arrayItem.repetitions);
    }
  });


  // format the date labels so that they are more readable
  const formatted_labels = chart_labels.map(dateString => {
    const date = new Date(dateString);
    // dateString is in UTC time, so make sure that the timezone remains the same
    return date.toLocaleDateString('en-US', {timeZone: 'UTC'});
  });

  // total volume data to show volume charts
  var total_volume_data = [];
  for (var i = 0; i < chart_data.length; i++) {
    total_volume_data.push(chart_data[i] * repetitions_data[i]);
  }
  console.log("chart_data: " + chart_data);
  console.log("rep_data: " + repetitions_data);
  console.log("volume_data: " + total_volume_data);

  var data_to_show;

  if (chartDataType === "Volume") {
    data_to_show = total_volume_data;
  } else {
    data_to_show = chart_data;
  }

  var bar_chart_config = {
    labels: formatted_labels,
    datasets: [
      {
        label: 'Weight',
        data: data_to_show,
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
        data: data_to_show,
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
    { value: 'Bench Press', label: 'Bench Press'}
  ];

  const handleChartDataType = () => {
    if (chartDataType === "Volume") {
      setChartDataType("Max Weight");
    } else {
      setChartDataType("Volume");
    }
  }



  if (status === "authenticated") {
    // console.log(session); // log statement

    return (
      <div>
        <h1 style={{textAlign:"center"}}> Bench Press Tracking!</h1>
        <div style={{textAlign:"center"}}>
          <button
              className="btn btn-primary"
              style={{ margin: '0 5px' }}
              onClick={() => handleChartDataType()}
            >
              {chartDataType}
          </button>
        </div>
        <BarChart my_data={bar_chart_config} rep_data={repetitions_data}></BarChart>
        <LineChart my_data={line_chart_config} rep_data={repetitions_data}></LineChart>
        <WeightLiftingDataform exerciseOptions={exerciseOptions}></WeightLiftingDataform>
      </div>
    )
  }

  return <Link href="/login"> Login </Link>
}

export default BenchPage;