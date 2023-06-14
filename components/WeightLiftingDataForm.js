import React, { useState } from 'react';
import { useSession } from "next-auth/react";
// import { useForm } from 'react-hook-form';
import styles from '@/styles/form.module.css';


const WeightLiftingDataform = ( {exerciseOptions}) => {

  const { data } = useSession();



  const handleSubmit = async (data, event) => {

    console.log("e: " + event);

    event.preventDefault();

    try {
      const res = await fetch('/api/addLiftingData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data),
      });
      console.log(res);
      if (res.ok) {
        console.log("ok!");
        reset();
        console.error('');
        // window.location.reload();
      } else {
        console.error("Error occurred during handleSubmit");

      }
    } catch (error) {
      console.error('Failed to add weightlifting data.');
    }
  };

  return (
    <div className={`card ${styles.container}`}>
      {/* Form for Uploading Weightlifting Data */}
      <form
      action="/api/addLiftingData"
      method="post"
      onSubmit={(event) => (handleSubmit)}
      // onSubmit={(event) => (handleSubmit)}
      style={{ maxWidth: "576px", margin: "auto" }}>
      <h3 className="text-center my-5">Upload Your Lifts!</h3>

      {/* Date Input */}
      <div className="mb-3">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          className="form-control"
          name="date"
        />
      </div>

      {/* Exercise Input */}
      <div className="mb-3">
        <label htmlFor="exercise">Exercise</label>
        <select className="form-control" name="exercise">
          {exerciseOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
          {/* <option value="Bench Press">Bench Press</option>
          <option value="Squat">Squat</option>
          <option value="Deadlift">Deadlift</option> */}
          {/* Add more options as needed */}
        </select>
      </div>

      {/* Weight Input */}
      <div className="mb-3">
        <label htmlFor="weight">Weight</label>
        <input
          type="number"
          className="form-control"
          name="weight"
        />
      </div>

      {/* Repititions Input */}
      <div className="mb-3">
        <label htmlFor="repetitions">Repetitions</label>
        <input
          type="number"
          className="form-control"
          name="repetitions"
        />
      </div>

      {<p className="text-danger text-center"></p>}
      <div className="mb-3 text-center">
        <button className="btn btn-secondary btn-sm">Upload</button>
      </div>
    </form>
  </div>
  )
}

export default WeightLiftingDataform;