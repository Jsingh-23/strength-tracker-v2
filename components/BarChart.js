import { Bar } from "react-chartjs-2";
import styles from '@/styles/chart.module.css';

const BarChart = ({ data }) => {
  // const my_data = {
  //   labels: ['1/15', '2/15', '3/15'],
  //   // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
  //   datasets: [
  //       {
  //         label: 'Popularity of colours',
  //         data: [105, 115, 155],
  //         // you can set indiviual colors for each bar
  //         backgroundColor: [
  //           'rgba(245, 173, 66, 0.6)',
  //           'rgba(245, 173, 66, 0.6)',
  //           'rgba(245, 173, 66, 0.6)',
  //         ],
  //         borderWidth: 1,
  //       }
  //   ]
  // }

  // const my_data = {
  //   labels: labels,
  //   datasets: datasets,
  // };

  return (
    <div className={styles["chart-container"]}>
      <h2 style={{ textAlign: "center" }}>Progression</h2>
      <Bar
        data={data}
        options={{
          plugins: {
            title: {
              display: false,
              text: "Progression Since Beginning"
            },
            legend: {
              display: false
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Date",
                font: {
                  weight: "bold",
                  size: 20,
                }
              }
            },
            y: {
              title: {
                display: true,
                text: "Weight (Lbs)",
                font: {
                  weight: "bold",
                  size: 20,
                }
              }
            }
          }
        }}
      />
    </div>
  );
};


export default BarChart;