import { useRouter } from 'next/router';
import styles from '@/styles/tdee.module.css';
import React, { useEffect, useState } from "react";

const TDEEPage = () => {
  const router = useRouter();
  const [BMR, setBMR] = useState(1);
  const [isRouterReady, setIsRouterReady] = useState(false);
  const [BMR_no_activity, setBMR_no_activity] = useState(1);
  const [BMI,setBMI] = useState(1);

  // when router's query parameters change, a re-render of the component is triggered
  var {activity, age, body_fat, gender, height, weight} = router.query;

  const activityMap = {
    "sedentary": 1.2,
    "light": 1.375,
    "moderate": 1.55,
    "heavy": 1.725,
    "athlete": 1.9
  };


  const convertHeightStringToInches = (heightString) => {
    var [feet, inches] = heightString.split("'");
    feet = parseInt(feet) * 12;
    inches = parseInt(inches);
    return feet + inches;
  }

  const BMRCalculation = (activity, age, body_fat, gender, height, weight) => {
    console.log("calculating...");
    var activityMultiplier = activityMap[activity];
    if (gender === "Male") {
      setBMR( Math.trunc(parseInt(66 + (6.23 * parseInt(weight)) + ( 12.7 * convertHeightStringToInches(height)) - (6.8 * parseInt(age))) * activityMultiplier) );

      setBMR_no_activity( Math.trunc(parseInt(66 + (6.23 * parseInt(weight)) + ( 12.7 * convertHeightStringToInches(height)) - (6.8 * parseInt(age)))) )
    } else {
      setBMR( Math.trunc(parseInt(655 + (4.35 * parseInt(weight)) + ( 4.7 * convertHeightStringToInches(height)) - (4.7 * parseInt(age))) * activityMultiplier ) );

      setBMR_no_activity( Math.trunc(parseInt(655 + (4.35 * parseInt(weight)) + ( 4.7 * convertHeightStringToInches(height)) - (4.7 * parseInt(age)))) )
    }
  }

  useEffect(() => {
    if (router.isReady) {
      setIsRouterReady(true);
    }
  }, [router.isReady]);

  useEffect(() => {
    if (isRouterReady && Object.keys(router.query).length !== 0) {
      BMRCalculation(activity, age, body_fat, gender, height, weight);
      setBMI( (parseInt(weight) / convertHeightStringToInches(height)**2) * 703 );
    }
    else {
      return;
    }

  }, [isRouterReady, router.query]);

  return (
    <div>
      <div className={styles.header_container}>
        <h1 className={styles.header}> TDEE </h1>
      </div>

      <div className={`card bg-light ${styles.card_container}`}>
        <div className={styles.text_center}>
          <p>
            <span className={styles.bmr}>{BMR}</span> Calories Per Day
          </p>
          <p>
          <span className={styles.bmr}>{BMR*7}</span> Calories Per Week
          </p>
        </div>
      </div>

      <div className={styles.card_container_stats}>
  <div className={styles.text_center}>
    <p>
      Based on your stats, the best estimate for your maintenance calories is
      <span className={styles.bmr}> {BMR}</span> calories per day based on the Harris-Benedict Equation, which is widely known to be the most accurate. The table below shows the difference if you were to have selected a different activity level.
    </p>
  </div>

  <table className={styles.table}>
    <thead>
      <tr>
        <th>Activity Level</th>
        <th>TDEE (Calories Per Day)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Basal Metabolic Rate</td>
        <td>{Math.trunc(BMR_no_activity)}</td>
      </tr>
      <tr className={router.query.activity === 'sedentary' ? styles.boldRow : ''}>
        <td>Sedentary</td>
        <td>{Math.trunc(BMR_no_activity * 1.2)}</td>
      </tr>
      <tr className={router.query.activity === 'light' ? styles.boldRow : ''}>
        <td>Light</td>
        <td>{Math.trunc(BMR_no_activity * 1.375)}</td>
      </tr>
      <tr className={router.query.activity === 'moderate' ? styles.boldRow : ''}>
        <td>Moderate</td>
        <td>{Math.trunc(BMR_no_activity * 1.55)}</td>
      </tr>
      <tr className={router.query.activity === 'heavy' ? styles.boldRow : ''}>
        <td>Heavy</td>
        <td>{Math.trunc(BMR_no_activity * 1.725)}</td>
      </tr>
      <tr className={router.query.activity === 'athlete' ? styles.boldRow : ''}>
        <td>Athlete</td>
        <td>{Math.trunc(BMR_no_activity * 1.9)}</td>
      </tr>
    </tbody>
  </table>

  <div className={styles.text_center}>
    <h1 className={styles.bmi_header}> BMI SCORE: {Math.trunc(BMI)}.0</h1>
    <p> Your <b>BMI</b> is <b>{Math.trunc(BMI)}.0</b> , which means you are classified as </p>

    <table className={styles.table}>
    <thead>
      <tr>
        <th>BMI</th>
        <th>Classification</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>18.5 or less</td>
        <td>Underweight</td>
      </tr>
      <tr>
        <td>18.5 - 24.99</td>
        <td>Normal Weight</td>
      </tr>
      <tr>
        <td>25 - 29.99</td>
        <td>Overweight</td>
      </tr>
      <tr>
        <td>30+</td>
        <td>Obese</td>
      </tr>
    </tbody>
  </table>
  </div>
</div>


    </div>
  )
}

export default TDEEPage;