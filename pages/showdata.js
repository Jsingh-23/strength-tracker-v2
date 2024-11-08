import React, { useEffect, useState, useRef } from "react";
import ExerciseTable from "@/components/ExerciseTable";
import styles from '../styles/table.module.css'
import { Button, Input } from '@nextui-org/react';


const ShowData = () => {


  const [liftingData, setLiftingData] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState('Bench Press');
  const [exerciseName, setExerciseName] = useState('');
  const [isReady, setIsReady] = useState(false);
  const [exerciseInput, setExerciseInput] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const exerciseInputRef = useRef(null);



  const handleExerciseChange = (exercise) => {
    console.log("Changing!!");
    setSelectedExercise(exercise);
  };

    // code for handling what happens when the user inputs and uploads a new exercise
    
    const handleSubmit = async ( e ) => {
      e.preventDefault();
      setIsSubmitting(true);
      setError('');



    try {
      const response = await fetch('/api/addExercise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(exerciseInput),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add exercise');
      }

      // setExerciseName()
      } catch (error) {
        console.error("Unable to add new exercise", error);
      } finally {
      console.log("exercise input 1:  " + exerciseInput)
      // exerciseInputRef.current.value = "";
      setIsSubmitting(false);
      }
    };

    return (
      <div className="min-h-screen bg-gray-50 py-8">
          <div className={styles.content_container}>
            <div className={styles.tableContainer}>
              <ExerciseTable></ExerciseTable>
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
                    <Button type='submit' className="btn btn-secondary btn-sm"> Upload</Button>
                  </div>
                </div>

              </form>
            </div>
          </div>
      </div>
    );

}


// end of showdata here y
export default ShowData;