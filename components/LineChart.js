import { Line } from "react-chartjs-2";
import styles from '@/styles/chart.module.css';


const LineChart = ({ my_data, rep_data }) => {

  return (
    <div className={styles["chart-container"]}>
      <h2 style={{ textAlign: "center" }}></h2>
      <Line
        data={my_data}
        options={{
          plugins: {
            tooltip: {
              enabled: true,
              callbacks: {
                label: (tooltipItem, data) => {
                  const dataIndex = tooltipItem.dataIndex;
                  const repetitionsData = rep_data;
                  var labels = [`Weight: ${my_data.datasets[0].data[dataIndex]}`, `Repetitions: ${repetitionsData[dataIndex]}`];
                  return labels;
                }
              }
            },
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
          },
          elements: {
            point: {
              backgroundColor: 'white'
            },
            line: {
              borderWidth: 2,
              fill: true,
            }
          }

        }}
      />
    </div>
  );
};


export default LineChart;