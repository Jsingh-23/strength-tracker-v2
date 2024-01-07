import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
// import { useForm } from 'react-hook-form';
import styles from '@/styles/form.module.css';


const WeightLiftingDataform = ( { onFormSubmit }) => {

  const { data } = useSession();

  const [liftingData, setLiftingData] = useState([]);
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

  // console.log("exercises: " + exercises);
  // console.log("form vals: ", formValues);






  const handleSubmit = async (event) => {

    // console.log("e: " + event);
    // console.log("data: " + data.size);

    event.preventDefault();

    setFormValues({
      my_weight: "",
      my_repetitions: ""
    });

    var formData = new FormData(event.target);
    var jsonData = JSON.stringify({
      exercise: formData.get('exercise'),
      date: formData.get('date'),
      weight: formData.get('weight'),
      repetitions: formData.get('repetitions')
    });

    try {
      const res = await fetch('/api/addLiftingData', {
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
      console.log('Failed to add weightlifting data.', error);
    }
  };

  // const handleButtonClick = () => {
  //   onFormSubmit();
  // };

  return (
    <div className={`card bg-white ${styles.container}`}>
      {/* Form for Uploading Weightlifting Data */}
      <form
      action="/api/addLiftingData"
      method="post"
      onSubmit={(event) => handleSubmit(event)}
      style={{ maxWidth: "576px", margin: "auto" }}>
      <h3 className="text-center my-5">Upload Your Lifts</h3>

      {/* Date Input */}
      <div className="mb-3">
        <label htmlFor="date">Date</label>
        <input
          required
          type="date"
          className="form-control"
          name="date"
          id="form_date"
        />
      </div>

      {/* Exercise Input */}
      <div className="mb-3">
        <label htmlFor="exercise">Exercise</label>
        <select className="form-control" name="exercise" id="form_exercise">
          {exercises.map((exercise) => (
            <option key={exercise} value={exercise}>
              {exercise}
            </option>
          ))}
        </select>
      </div>

      {/* Weight Input */}
      <div className="mb-3">
        <label htmlFor="weight">Weight</label>
        <input
          required
          type="number"
          className="form-control"
          name="weight"
          id="form_weight"
          value={formValues.my_weight}
          onChange={(e) =>
            setFormValues({ ...formValues, my_weight: e.target.value})}
        />
      </div>

      {/* Repititions Input */}
      <div className="mb-3">
        <label htmlFor="repetitions">Repetitions</label>
        <input
          required
          type="number"
          className="form-control"
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
        <button className="btn btn-secondary btn-sm" type="submit"
          >Upload</button>
      </div>
    </form>
  </div>
  )
}

export default WeightLiftingDataform;