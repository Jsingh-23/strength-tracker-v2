import { Line } from "react-chartjs-2";
// import { Doughnut, Pie } from "react-chartjs-2";
import DonutChart from "./DonutChart";

// import styles from '@/styles/chart.module.css';
import styles from '@/styles/overview.module.css';


const Overview = ({ my_data, options, num_workouts, total_weight_lifted, total_reps, heaviest, goals_data, my_exercises}) => {
  
    function calculatePercentage(x, y) {
        const result = (x / y) * 100;
        return result.toFixed(0);
    }

    const progressData = goals_data.map(goal => ({
        label: goal.exercise,
        data: [goal.current_max, goal.weight - goal.current_max ],
    }));

    const filterExerciseFromGoalsData = (exercise) => {
        return progressData.find( (obj) => obj['label'] === exercise);
    }

    const get_goal_weight = (exercise) => {
        let exerciseobj = filterExerciseFromGoalsData(exercise);
        return exerciseobj.data[0] + exerciseobj.data[1];
    }

    const get_prog_percentage = (exercise) => {
        let exerciseobj = filterExerciseFromGoalsData(exercise);
        return calculatePercentage( exerciseobj.data[0], get_goal_weight(exercise));
    }

    // set up chart data based on inputted exercise
    const exercise_data = (exercise) => {
        return {
            labels: [
                'Current Max',
                'Goal',
            ],
            datasets: [{
                label: 'My First Dataset',
                data: filterExerciseFromGoalsData(exercise).data,
                backgroundColor: [
                    '#ffc00',
                    '#808080',
                ],
                hoverOffset: 4
            }]
        }
    };
    
    // set up chart config based on inputted exercise
    const exercise_config = (exercise) => {
        return {
            plugins: {
                title: {
                    text: [exercise + ' ' + get_goal_weight(exercise) + " lb", get_prog_percentage(exercise) + " %" ],
                    display: true,
                    position: 'bottom',
                    color: 'white'
                },
                legend : {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem, data) {
                            // since chartjs does not support donut progression charts, I tried to customize the tooltip and filter my data so that 
                            // progress was more easily visible on the donut chart. This was done by showing the difference between my current PR and my goal PR
                            // as the smaller dataset on the donut chart
                            if (tooltipItem['dataIndex'] === 0) {
                                return " " + exercise_data(exercise)['datasets'][0]['data'][tooltipItem['dataIndex']] + " pounds";
                            } else if (tooltipItem['dataIndex'] === 1) {
                                let total = exercise_data(exercise)['datasets'][0]['data'][0] + exercise_data(exercise)['datasets'][0]['data'][1]
                                return " " + total + " pounds";
                            }
                        },
                    }
                }
            }
        };
    }
  
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
                    <p className={styles.text}> <span className={styles.widget_label}> Heaviest: </span> {heaviest} pounds </p>
                </div>
            </div>

        </div>
        
        <div className={styles.goals_overview_container}>
            <p className={styles.label}> My Goals </p>
            <div className={styles.circle_charts_container}>

                <DonutChart
                    my_data={exercise_data('Bench Press')}
                    options={exercise_config('Bench Press')}>
                 </DonutChart>

                <DonutChart
                    my_data={exercise_data('Squat')}
                    options={exercise_config('Squat')}>
                 </DonutChart>

                <DonutChart
                    my_data={exercise_data('Deadlift')}
                    options={exercise_config('Deadlift')}>
                 </DonutChart>

            </div>


        </div>
        
    </div>
  );
};

// To Do: Add feature to let users pick which exercises they want to see on My Goals interface donut charts


export default Overview;