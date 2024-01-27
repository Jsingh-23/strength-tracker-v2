import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import styles from '@/styles/form.module.css';


const TDEEForm = () => {
  const [liftingData, setLiftingData] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [currentExercise, setCurrentExercise] = useState('Bench Press');
  const [formSubmitted, setFormSubmitted] = useState(null);
  const [chartDataType, setChartDataType] = useState("Max Weight");
  const [formSubmissions, setFormSubmissions] = useState(0);
  
  const [formData, setFormData] = useState({
    gender: '',
    age: '',
    weight: '',
    height: "4'7",
    activity: 'sedentary',
    body_fat: '',
  });

  const router = useRouter();

  // logic to generate the height options dynamically
  const minHeight = 4; // minimum height in feet
  const maxHeight = 7; // maximum height in feet
  const heightOptions = [];
  for (let feet = minHeight; feet <= maxHeight; feet++) {
    for (let inches = 0; inches <= 11; inches++) {
      // height should be between 4'7" and 7'3"
      if ( (feet === 4 && inches <= 6) || (feet === 7 && inches >= 4)) {
        continue;
      }
      const optionValue = `${feet}'${inches}`;
      const optionLabel = `${feet}'ft ${inches}in`;
      heightOptions.push(
        <option key={optionValue} value={optionValue}>{optionLabel}</option>
      );
    }
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // redirect to TDEEPage and pass form data as query parameters
    router.push({
      pathname: '/TDEEPage',
      query: formData,
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(formData);
    // console.log(event.target.value);
    // console.log(formData);
    // create a shallowcopy of 'prevData', so that the new state object
    // retains any existing form data properties and only updates the specific field being changed
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  return (
    <div className={`card bg-light ${styles.container}`}>
      <form
        style={{ maxWidth: "576px", margin: "auto" }}
        onSubmit={handleFormSubmit}>

        <h3 className="text-center my-5">Calculate Your TDEE!</h3>

        {/* Gender Input */}
        <div className="mb-3">
            <input type="radio" id="male"
            name="gender" value="Male" onChange={handleInputChange}></input>
            <label className={styles.male_input} htmlFor="male">Male</label>

            <span className={styles.gender_span}></span>

            <input type="radio" id="female"
            name="gender" value="Female" onChange={handleInputChange}></input>
            <label className={styles.female_input} htmlFor="female">Female</label>
        </div>

        {/* Age Input */}
        <div className="mb-3">
          <label htmlFor="age">Age</label>
          <input
            required
            type="number"
            className="form-control"
            name="age"
            min="13"
            max="100"
            value={formData.age}
            onChange={handleInputChange}
          />
        </div>

        {/* Weight Input */}
        <div className="mb-3">
          <label htmlFor="weight">Weight</label>
          <input
            required
            type="number"
            className="form-control"
            name="weight"
            placeholder="lbs"
            min="50"
            max="450"
            value={formData.weight}
            onChange={handleInputChange}
          />
        </div>

        {/* Height Input */}
        <div className="mb-3">
          <label htmlFor="height">Height: </label>
          <select className="form-control"
          name="height" id="height" onChange={handleInputChange}
          >
            {heightOptions}
          </select>
        </div>

        {/* Activity Input */}
        <div className="mb-3">
          <label htmlFor="activity">Activity Level</label>
          <select
          className="form-control" name="activity" id="form_activity"
          value={formData.activity}
          onChange={handleInputChange}
          >
            <option value="sedentary" >Sedentary (Office Job) </option>
            <option value="light">Light Exercise (1-2 Days/Week) </option>
            <option value="moderate">Moderate Exercise (3-5 Days/Week) </option>
            <option value="heavy">Heavy Exercise (6-7 Days/Week) </option>
            <option value="athlete">Athlete (2x Per Day) </option>
          </select>
        </div>

        {/* Body Fat Input */}
        <div className="mb-3">
          <label htmlFor="body_fat">Body Fat %</label>
          <input
            type="number"
            className="form-control"
            name="body_fat"
            placeholder="Optional"
            min="2"
            max="50"
            value={formData.body_fat}
            onChange={handleInputChange}
          />
        </div>

        {/* Upload Button */}
        {<p className="text-danger text-center"></p>}
        <div className="mb-3 text-center">
          <button className="btn btn-secondary btn-sm" type="submit"
            >Calculate</button>
        </div>
      </form>
    </div>
  );
}

export default TDEEForm;