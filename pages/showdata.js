import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState, useRef } from "react";
import ExerciseTable from "@/components/ExerciseTable";
import styles from '../styles/table.module.css'
import { Button, Input } from '@nextui-org/react';
import { useAsyncList } from '@react-stately/data';


const ShowData = () => {

  const router = useRouter();

  const [liftingData, setLiftingData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState('Bench Press');
  const [exerciseName, setExerciseName] = useState('');
  const [isReady, setIsReady] = useState(false);
  const [exerciseInput, setExerciseInput] = useState('');

  const exerciseInputRef = useRef(null);



  const handleExerciseChange = (exercise) => {
    setSelectedExercise(exercise);
  };

  // let list = useAsyncList({
  //   async load({signal}) {
  //     let res = await fetch('https://swapi.py4e.com/api/people/?search', {
  //       signal,
  //     });
  //     let json = await res.json();
  //     setIsLoading(false);

  //     console.log("json: ", json);

  //     return {
  //       items: json.results,
  //     };
  //   },
  //   async sort({items, sortDescriptor}) {
  //     return {
  //       items: items.sort((a, b) => {
  //         let first = a[sortDescriptor.column];
  //         let second = b[sortDescriptor.column];
  //         let cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

  //         if (sortDescriptor.direction === "descending") {
  //           cmp *= -1;
  //         }

  //         return cmp;
  //       }),
  //     };
  //   },
  // });

  let list = useAsyncList({
    async load({signal}) {
      let response = await fetch("/api/getLiftingData", {
        signal,
      });
      let json = await response.json();
      setLiftingData(json);

      return {
        items: json,
      };
    }, 
    async sort({items, sortDescriptor}) {
      return {
        items: items.sort((a,b) => {
          let first = a[sortDescriptor.column];
          let second = b[sortDescriptor.column];
          let cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

          if (sortDescriptor.direction === 'descending') {
            cmp *= -1;
          }

          return cmp;
        }),
      };
    },
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        // let list = useAsyncList({
        //   async load({signal}) {
        //     let response = await fetch("/api/getLiftingData", {
        //       signal,
        //     });
        //     let json = await response.json();
        //     setLiftingData(json);
        //     return {
        //       items: json.results,
        //     };
        //   }, 
        //   async sort({items, sortDescriptor}) {
        //     return {
        //       items: items.sort((a,b) => {
        //         let first = a[sortDescriptor.column];
        //         let second = b[sortDescriptor.column];
        //         let cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

        //         if (sortDescriptor.direction === 'descending') {
        //           cmp *= -1;
        //         }

        //         return cmp;
        //       }),
        //     };
        //   }
        // });

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

      const JSONdata = JSON.stringify(newExerciseName);

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
          <div className={styles.content_container}>
            <div className={styles.tableContainer}>
              <ExerciseTable
                className={styles.table}
                exercise={selectedExercise}
                data={liftingData}
                my_list={list}
              ></ExerciseTable>
            </div>

            <div className={styles.buttonGroup}>
              {exercises.map((exercise) => (
                <Button
                  key={exercise}
                  color='primary'
                  variant='shadow'
                  onClick={() => handleExerciseChange(exercise)}
                >
                  {exercise}
                </Button>
              ))}
            </div>

            <div className={`card bg-white ${styles.container}`}>
              <form onSubmit={(e) => handleSubmit(e)} style={{ margin: 'auto' }}>
                <div>
                  <h3 className={styles.upload_header} > Add A New Exercise!</h3>
                  <Input
                  isRequired
                  label="Exercise"
                  type="text"
                  id="exerciseName"
                  ref={exerciseInputRef}
                  >
                  </Input>
                  <div className={styles.upload_button_div}>
                    <Button className="btn btn-secondary btn-sm"> Upload</Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );

}

export default ShowData;