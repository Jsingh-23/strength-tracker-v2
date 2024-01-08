import { Line } from "react-chartjs-2";
// import styles from '@/styles/chart.module.css';
import styles from '@/styles/overview.module.css';


const Overview = ({ my_data, options, num_workouts, total_weight_lifted, total_reps, heaviest}) => {

  return (
    <div className={styles["chart-container"]}>

        {/* Line Chart Portion */}
        <p className={styles.label}> Workouts </p>
        <Line
        data={my_data}
        options = {options} />


        {/* Statistics Portion */}
        <div className={styles.widgets_container}>
            <div className={styles.widgets_row}>

                <div className={styles.left_widget}>
                    <button className={styles.widget_button} disabled={true} > </button>
                    <p className={styles.text}> <span className={styles.widget_label}> Workouts: </span> {num_workouts} </p>
                </div>

                <div className={styles.right_widget}>
                    <button className={styles.widget_button} disabled={true} > </button>
                    <p className={styles.text}> <span className={styles.widget_label}> Lifted: </span> {total_weight_lifted} pounds </p>
                </div>

            </div>

            <div className={styles.widgets_row}>

                <div className={styles.left_widget}>
                    <button className={styles.widget_button} disabled={true} > </button>
                    <p className={styles.text}> <span className={styles.widget_label}> Reps: </span> {total_reps} </p>
                </div>

                <div className={styles.right_widget}>
                    <button className={styles.widget_button} disabled={true} > </button>
                    <p className={styles.text}> <span className={styles.widget_label}> Heaviest: </span> {heaviest} </p>
                </div>

            </div>

        </div>
        
    </div>
  );
};


export default Overview;