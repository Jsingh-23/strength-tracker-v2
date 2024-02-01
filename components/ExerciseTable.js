import React from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {useAsyncList} from "@react-stately/data";
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell, Button, ButtonGroup, getKeyValue, Spinner} from "@nextui-org/react";
// import { list } from 'postcss';
import styles from '../styles/exercisetable.module.css'


const ExerciseTable = ({ exercise, data }) => {

  const router = useRouter();
  const [currentExercise, setCurrentExercise] = useState('Bench Press');
  const [isLoading, setIsLoading] = useState(true);
  const [liftingData, setLiftingData] = useState([]);
  const [allExercises, setAllExercises] = useState([]);

  // useAsyncList hook is used to manage the data sorting to facilitate table sorting
  let my_list = useAsyncList({
    async load({signal}) {
      let response = await fetch("/api/getLiftingData", {
        signal,
      });

      let json = await response.json();
      setLiftingData(json);
      setIsLoading(false);
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
    const fetchAllExercises = async () => {
      try {
        const response2 = await fetch("/api/getExerciseData");
        if (response2.ok) {
          const data2 = await response2.json();
          setAllExercises(data2);
        } else {
          throw new Error("Couldn't fetch exercises array");
        }
      } catch (error) {
        console.error(error);
      }
    };

    const getData = async () => {
      try {
        const myData = await fetchAllExercises();
      } catch (error) {
        console.error();
      }
    }
    getData();
  }, [allExercises]);

  // filter the data by exercise, and sort by date
  if ( !isLoading ) {
    const filteredData = liftingData.filter(obj => obj.exercise === exercise);
    filteredData.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA - dateB;
    });
  }

  // handleDelete function for when Delete button is clicked
  const handleDelete = async (objectId) => {

    try {
      // delete object using specified API
      await fetch(`/api/deleteObject/${objectId}`, {method: 'DELETE'});
      console.log("done fetching...")
      // fetch liftingData again and change state, so that table component is rerendered
      const response = await fetch("/api/getLiftingData");
      const updated_data = await response.json();
      setLiftingData(updated_data);
    } catch (error) {
      console.error('Error deleting object:', error);
    }
  }; // end of handleDelete()

  // useEffect(() => {
  //   setLiftingData(data);
  // }, [data]);

  // useEffect( () => {
  //   setIsLoading(true);
  // }, [])

  // button handler for changing displayed exercise on the table
  const handleExerciseChange = (exercise) => {
    setCurrentExercise(exercise);
  }

  console.log("lifting data: ", liftingData);

  return (
    <div className={styles.exercise_table_component_container}>
      
      {/* This is where the exercise table is configured and rendered */}
      <Table 
        aria-label="Example static collection table"
        selectionMode='single'
        sortDescriptor={my_list.sortDescriptor}
        onSortChange={my_list.sort}>
        <TableHeader>
          <TableColumn key="exercise" allowsSorting>Exercise</TableColumn>
          <TableColumn key="repetitions" allowsSorting>Repetitions</TableColumn>
          <TableColumn key="date" allowsSorting>Date</TableColumn>
          <TableColumn key="weight" allowsSorting>Weight</TableColumn>
          <TableColumn></TableColumn>
        </TableHeader>

        <TableBody
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
          items={my_list.items.filter(obj => obj.exercise === currentExercise)}>
            {(item) => (
              <TableRow key={`${item._id} - ${item.date}`}>
                {(columnKey) => (
                <TableCell>
                  {columnKey === 'date' ? new Date(item.date).toLocaleDateString('en-US') : getKeyValue(item, columnKey)}
                </TableCell>
              )}
                {/* {(columnKey) => <TableCell> {getKeyValue(item, columnKey)} </TableCell>} */}
              </TableRow>
            )}
          </TableBody>
      </Table>

      {/* This is where all the exercise buttons are rendered */}
      <div className={styles.exercise_buttons_group}>
        {allExercises.map((exercise) => (
          <Button
            className={styles.exercise_change_button}
            key={exercise}
            onClick={() => handleExerciseChange(exercise)}
            >
              {exercise}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default ExerciseTable;