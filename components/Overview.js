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

    const benchobj = filterExerciseFromGoalsData('Bench Press');
    const bench_goal_weight = benchobj.data[0] + benchobj.data[1];
    const bench_prog_percentage = calculatePercentage( benchobj.data[0], bench_goal_weight);

    const squatobj = filterExerciseFromGoalsData('Squat');
    const squat_goal_weight = squatobj.data[0] + squatobj.data[1]; 
    const squat_prog_percentage = calculatePercentage( squatobj.data[0], squat_goal_weight);

    const deadliftobj = filterExerciseFromGoalsData('Deadlift');
    const deadlift_goal_weight = deadliftobj.data[0] + deadliftobj.data[1]; 
    const deadlift_prog_percentage = calculatePercentage( deadliftobj.data[0], deadlift_goal_weight);

    // console.log(benchobj);

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

    console.log("first: ", exercise_data('Bench Press'));

    const bench_data = {
        labels: [
            'Current Max',
            'Goal',
        ],
        datasets: [{
            label: 'My First Dataset',
            data: benchobj.data,
            backgroundColor: [
                '#ffc00',
                '#808080',
            ],
            hoverOffset: 4
        }]
    }

    // console.log("second: ", bench_data);
    // console.log(JSON.stringify(exercise_data('Bench Press')) === JSON.stringify(bench_data));

    const squat_data = {
        labels: [
                'Current Max',
                'Goal',
                ],
        datasets: [{
            label: 'My First Dataset',
            data: squatobj.data,
            backgroundColor: [
                '#ffc00',
                '#808080',
            ],
            hoverOffset: 4
            }]
    }

    const deadlift_data = {
        labels: [
            'Current Max',
            'Goal',
            ],
        datasets: [{
            label: 'My First Dataset',
            data: deadliftobj.data,
            backgroundColor: [
                '#ffc00',
                '#808080',
            ],
            hoverOffset: 4
            }]
    }

    const bench_config = {
        plugins: {
            title: {
                text: ['Bench Press ' + bench_goal_weight + " lb", bench_prog_percentage + " %" ],
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
                            return " " + bench_data['datasets'][0]['data'][tooltipItem['dataIndex']] + " pounds";
                            // return "hello!!!";
                        } else if (tooltipItem['dataIndex'] === 1) {
                            // return "wtf";
                            // console.log(typeof bench_data['datasets'][0]['data'][0] );
                            let total = bench_data['datasets'][0]['data'][0] + bench_data['datasets'][0]['data'][1]
                            return " " + total + " pounds";
                        }
                    },
                }
            }
        }
    };

    const squat_config = {
        plugins: {
            title: {
                text: ['Squat ' + squat_goal_weight + " lb", squat_prog_percentage + " %"],
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
                        if (tooltipItem['dataIndex'] === 0) {
                            return " " + squat_data['datasets'][0]['data'][tooltipItem['dataIndex']] + " pounds";
                            // return "hello!!!";
                        } else if (tooltipItem['dataIndex'] === 1) {
                            // return "wtf";
                            // console.log(typeof squat_data['datasets'][0]['data'][0] );
                            let total = squat_data['datasets'][0]['data'][0] + squat_data['datasets'][0]['data'][1]
                            return " " + total + " pounds";
                        }
                    },
                }
            }
        }
    };

    const deadlift_config = {
        plugins: {
            title: {
                text: ['Deadlift ' + deadlift_goal_weight + " lb", deadlift_prog_percentage + " %"],
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
                        if (tooltipItem['dataIndex'] === 0) {
                            return " " + deadlift_data['datasets'][0]['data'][tooltipItem['dataIndex']] + " pounds";
                            // return "hello!!!";
                        } else if (tooltipItem['dataIndex'] === 1) {
                            // return "wtf";
                            // console.log(typeof bench_data['datasets'][0]['data'][0] );
                            let total = deadlift_data['datasets'][0]['data'][0] + deadlift_data['datasets'][0]['data'][1]
                            return " " + total + " pounds";
                        }
                    },
                }
            }
        }
    };

      
  
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
        
        <div className={styles.goals_overview_container}>
            <p className={styles.label}> My Goals </p>
            <div className={styles.circle_charts_container}>


            {/* <DonutChart
                    my_data={bench_data}
                    options={bench_config}>
                    
                 </DonutChart>

                <DonutChart
                    my_data={squat_data}
                    options={squat_config}>

                 </DonutChart>

                <DonutChart
                    my_data={deadlift_data}
                    options={deadlift_config}>

                 </DonutChart> */}

                <DonutChart
                    my_data={exercise_data('Bench Press')}
                    options={bench_config}>
                    
                 </DonutChart>

                <DonutChart
                    my_data={exercise_data('Squat')}
                    options={squat_config}>

                 </DonutChart>

                <DonutChart
                    my_data={exercise_data('Deadlift')}
                    options={deadlift_config}>

                 </DonutChart>

            </div>


        </div>
        
    </div>
  );
};


export default Overview;