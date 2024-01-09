import { getSession } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Overview from '@/components/Overview';
import BarChart from "@/components/BarChart";
import LineChart from "@/components/LineChart";
import {defaults, layouts} from 'chart.js';

import WeightLiftingDataform from "@/components/WeightLiftingDataForm";
import { redirect } from 'next/navigation';
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { TypeAnimation } from 'react-type-animation';


import initDB from "@/utils/db";
import { getToken } from "next-auth/jwt";
import styles from '@/styles/form.module.css';


const BenchPage = () => {

  const router = useRouter();
  const [liftingData, setLiftingData] = useState(null);
  const [goalsData, setGoalsData] = useState(null);
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
        const response3 = await fetch("/api/getGoalsData");
        if (response3.ok) {
          const data3 = await response3.json();
          setGoalsData(data3);
        } else {
          throw new Error("Couldn't fetch goals data");
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

    defaults.font.family = 'Arial';

  // store weight, date, and repetitions data for Bench Press
  var chart_data = [];
  var chart_labels = [];
  var repetitions_data = [];

  // if user is not authenticated, reroute them to the login page
  const { data: session, status } = useSession();
  if (status === "unauthenticated") {
    router.push("/login");
  }

  // if any of the relevant data hasn't been loaded yet, show a loading screen
  if (liftingData === null || goalsData === null || exercises === null) {
      return <div> Loading... </div>;
  }


  // sort the liftingData by date
  liftingData.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB;
  });


  

  // calculations for displaying stats on Overview Display
  let total_weight_lifted = 0;
  let total_reps = 0;
  let heaviest = 0;
  liftingData.forEach(function (arrayItem) {
    total_weight_lifted += arrayItem.weight * arrayItem.repetitions;
    total_reps += arrayItem.repetitions;
    if (arrayItem.weight > heaviest) {
      heaviest = arrayItem.weight;
    }
  })
  

    


  // create an array of weights, and corresponding dates
  liftingData.forEach(function (arrayItem) {
    if (arrayItem.exercise === currentExercise) {
      chart_labels.push(arrayItem.date);
      chart_data.push(arrayItem.weight);
      repetitions_data.push(arrayItem.repetitions);
    }
  });

  // console.log("liftingdata: ", liftingData);
  // console.log("exercises: ", exercises);
  // console.log("goals: ", goalsData);



  // format the date labels so that they are more readable
  const formatted_labels = chart_labels.map(dateString => {
    const date = new Date(dateString);
    // dateString is in UTC time, so make sure that the timezone remains the same
    return date.toLocaleDateString('en-US', {timeZone: 'UTC',
      day: 'numeric',
      month: 'short',
      year: '2-digit'});
  });


  // total volume data to show volume charts
  var total_volume_data = [];
  for (var i = 0; i < chart_data.length; i++) {
    total_volume_data.push(chart_data[i] * repetitions_data[i]);
  }

  // handle button push to change data that chart is showing
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
        backgroundColor: '#9EDBC5', 
        borderWidth: 3,
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
        backgroundColor: '#9BEDFF',
        borderWidth: 5,
        point: {
          backgroundColor: "black"
        }
      }
    ],
  }

  var line_chart_options = {
    plugins: {
      tooltip: {
        enabled: repetitions_data.length > 0,
        callbacks: {
          label: (tooltipItem, data) => {
            const dataIndex = tooltipItem.dataIndex;
            // const repetitionsData = rep_data;
            var labels = [`Weight: ${bar_chart_config.datasets[0].data[dataIndex]}`, `Repetitions: ${repetitions_data[dataIndex]}`];
            return labels;
          }
        }
      },
      title: {
        display: false,
        text: "Progression Since Beginning"
      },
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
          font: {
            weight: "bold",
            size: 15,
          }
        },
        ticks: {
          callback: function(val, index) {
            // Hide every 2nd tick label
            return index % 2 === 0 ? this.getLabelForValue(val) : '';
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Weight (Lbs)",
          font: {
            weight: "bold",
            size: 15,
          },
        }
      },
    },
    elements: {
      point: {
        backgroundColor: 'white'
      },
      line: {
        borderWidth: 2,
        fill: true,
        tension:0.5
      }
    }
  }

  // All the data to create the overview chart is aggregated and sorted here
  // function to retrieve total number of workouts per date
  const totalWorkoutsData = () => {
    // use a map to track each date that you have completed a workout in order to track total number of workouts you have completed
    // will be used for the total workouts chart
    var datesMap = new Map();

    // total number of workouts was determined by looking at each date that a workout was logged, and aggregating total number of workouts per date
    liftingData.forEach(function (arrayItem) {
      const workoutDate = arrayItem.date;

      if (datesMap.has(workoutDate)) {
        datesMap.set(workoutDate, datesMap.get(workoutDate) + 1);
      } else {
        datesMap.set(workoutDate, 1);
      }
    });

    const sortedTotalWorkouts = Array.from(datesMap.entries());

    return sortedTotalWorkouts;
  };
  var totalWorkoutsPerDate = totalWorkoutsData();

  // console.log(totalWorkoutsPerDate);

  let cumulativeTotal = 0;
  const total_workouts_config = {
    labels: totalWorkoutsPerDate.map(([date]) => new Date(date).toLocaleDateString('en-US', {timeZone: 'UTC',
    day: 'numeric',
    month: 'short',
    year: '2-digit'
      })),
    datasets: [
      {
        lineTension: 1,
        backgroundColor: '#FFFFFF',
        data: totalWorkoutsPerDate.map(([date, workoutCount]) => {
          cumulativeTotal += workoutCount;
          return cumulativeTotal;
        })
      }
    ]
  }

  // helper code to display only the zero line for the x axis
  const num_datapoints = liftingData.length;
  let gridlength = Array(num_datapoints).fill('#242838');
  gridlength.unshift('#FFFFFF');

  const total_workouts_options = {
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          // text: "Date",
          color: '#FFFFFF',
          font: {
            weight: "bold",
            size: 15,
          }
        },
        ticks: {
          callback: function(val, index) {
            // Hide every 2nd tick label
            return index % 2 === 0 ? this.getLabelForValue(val) : '';
          },
          color: '#FFFFFF',
          font: {
            weight: "bold"
          },
        },
        grid: {
          // hacky way of showing only the zero line for x-axis. I made the first line white and all subsequent lines transparent
          color: gridlength,
        },
      },
      y: {
        border: {dash: [2,10]},
        title: {
          display: false,
          text: "Workouts",
          minRotation: 90,
          color: '#FFFFFF',
          font: {
            weight: "bold",
            size: 15,
          }
        },
        ticks: {
          color: '#FFFFFF',
          font: {
            weight: "bold"
          },
          precision: 0,
        },
        grid: {
          color: '#A9A9A9',
        },
      },
    },
    elements: {
      point: {
        backgroundColor: '#F7D5E9',
        borderColor: '#F7D5E9',
        // display: false,
        pointRadius: 3,
      },
      line: {
        borderWidth: 5,
        borderColor: '#F7D5E9',
        tension:0.1,
        // fill: true,
      }
    }
  };

  const handleChartDataType = () => {
    if (chartDataType === "Volume") {
      setChartDataType("Max Weight");
    } else if (chartDataType === "Max Weight") {
      setChartDataType("Volume");
    }
  }

  const handleExerciseChange = (exercise) => {
    setCurrentExercise(exercise);
  };

  // when the form is submitted, I want to change my page's formSubmissions state
  // so that the charts are rerendered with the new data
  const handleFormSubmit = () => {
    console.log("Submitted! ", formSubmissions);
    setFormSubmissions(formSubmissions + 1);
  }

  // render the contents if the user is logged in, otherwise redirect them to the login page
  if (status === "authenticated") {

    return (
      <div className={styles.content_container}>
        <h1 className={styles.heading}> Overview </h1>
        <Overview 
          my_data={total_workouts_config} 
          options={total_workouts_options} 
          num_workouts={cumulativeTotal} 
          total_weight_lifted={total_weight_lifted}
          total_reps={total_reps}
          heaviest={heaviest}
          my_exercises={exercises}
          goals_data = {goalsData}
          >
        </Overview>

        <h1 className={styles.heading}> {currentExercise} </h1>
        {/* <h2 className={styles.subheading}> {chartDataType} </h2> */}       

        <TypeAnimation
            style={{
              marginBottom: '1rem',
            }}
            sequence={[
              "Select the buttons to change exercises",
              5000,
              "Select the buttons to change chart data",
              5000
            ]}
            speed={1}
            deletionSpeed={1}
            repeat={Infinity}
        ></TypeAnimation>


        <div className={styles.exercise_buttons}>
          {exercises.map((exercise) => (
                <button
                  key={exercise}
                  className={styles.individual_buttons}
                  onClick={() => handleExerciseChange(exercise)}
                >
                  {exercise}
                </button>
            ))}
        </div>

        <div className={styles.change_chart_type_button_container}>
          <button
            className={styles.change_chart_type_button}
            onClick={() => handleChartDataType()}
          >
            {chartDataType}
          </button>
        </div>

        
        <BarChart my_data={bar_chart_config} rep_data={repetitions_data}></BarChart>
        <LineChart my_data={line_chart_config} options={line_chart_options}></LineChart>
        <WeightLiftingDataform onFormSubmit={handleFormSubmit}></WeightLiftingDataform>

      </div>
    )
  }

  return <Link href="/login"> Login </Link>
}

export default BenchPage;