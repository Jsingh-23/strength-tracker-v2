import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Radio, RadioGroup,
  Select, SelectItem} from "@nextui-org/react";
import styles from '@/styles/form.module.css';


const GoalsDataForm = ( { onFormSubmit }) => {

  const { data } = useSession();

  const [liftingData, setLiftingData] = useState([]);
  // const [goalsData, setGoalsData] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [exerciseName, setExerciseName] = useState('');
  const [formValues, setFormValues] = useState({
    my_weight: "",
    my_repetitions: ""
  });




  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getLiftingData");
        if (response.ok) {
          const data = await response.json();
          setLiftingData(data);
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

        // const response3 = await fetch("/api/getGoalsData");
        // if (response3.ok) {
        //   const data3 = await response3.json();
        //   // console.log("data2: ", data2);
        //   setGoalsData(data3);
        // } else {
        //   throw new Error("Couldn't fetch goals array");
        // }


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

    // console.log("curr size ", goalsData.length);




  const handleSubmit = async (event) => {

    event.preventDefault();

    setFormValues({
      my_weight: "",
      my_repetitions: ""
    });

    var formData = new FormData(event.target);
    var jsonData = JSON.stringify({
      exercise: formData.get('exercise'),
      weight: formData.get('weight'),
      repetitions: formData.get('repetitions')
    });

    try {
      const res = await fetch('/api/addGoalsData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: jsonData,
      });
      // console.log("res: ", res);
      if (res.ok) {
        onFormSubmit();
        console.log("ok!");
        // reset();
        // window.location.reload();
      } else {
        console.error("Error occurred during handleSubmit");

      }
    } catch (error) {
      // console.log(error);
      // console.log("here!");
      console.log('Failed to add goals data.', error);
    }
  };

  return (
    <div className={`card bg-white ${styles.container}`}>
      {/* Form for Uploading Weightlifting Data */}
      <form
      action="/api/addGoalsData"
      method="post"
      onSubmit={(event) => handleSubmit(event)}
      style={{ maxWidth: "576px", margin: "auto" }}>
      <h3 className={styles.upload_header}>Upload Your Goals</h3>

      {/* Exercise Input */}
      <div className="mb-3">
        <Select  label="Exercise" name="exercise" id="form_exercise">
          {exercises.map((exercise) => (
            <SelectItem key={exercise} value={exercise}>
              {exercise}
            </SelectItem>
          ))}
        </Select>
      </div>

      {/* Weight Input */}
      <div className="mb-3">
        <Input
          required
          type="number"
          label="Weight"
          name="weight"
          id="form_weight"
          value={formValues.my_weight}
          onChange={(e) =>
            setFormValues({ ...formValues, my_weight: e.target.value})}
        />
      </div>

      {/* Repititions Input */}
      <div className="mb-3">
        <Input
          required
          type="number"
          label="Repetitions"
          name="repetitions"
          id="form_reps"
          value={formValues.my_repetitions}
          onChange={(e) =>
            setFormValues({ ...formValues, my_repetitions: e.target.value})}
        />
      </div>

      {/* Upload Button */}
      {<p className="text-danger text-center"></p>}
      <div className="mb-3 text-center">
        <Button className="btn btn-secondary btn-sm" type="submit"
          >Upload</Button>
      </div>
    </form>
  </div>
  )
}

export default GoalsDataForm;