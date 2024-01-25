import { Bar } from "react-chartjs-2";
import styles from '@/styles/chart.module.css';
import 'chartjs-plugin-datalabels';

const BarChart = ({ my_data, rep_data }) => {

  // if rep_data has length 0, then this means I am rendering this BarChart component
  // on the Goals page and the barchart should be a stacked barchart
  if (rep_data.length === 0) {
    console.log("empty rep data");
    var callback_config = {};
  } else {
    var callback_config = {
      label: (tooltipItem, data) => {
        const dataIndex = tooltipItem.dataIndex;
        const repetitionsData = rep_data;
        var labels = [`Weight: ${my_data.datasets[0].data[dataIndex]}`, `Repetitions: ${repetitionsData[dataIndex]}`];
        return labels;
        // return `Repetitions: ${repetitionsData[dataIndex]}`;
      }
    }
  }



  return (
    <div className={styles["chart-container"]}>
      <h2 style={{ textAlign: "center" }}></h2>
      <Bar
        data={my_data}
        options={
          {
          plugins: {
              tooltip: {
                enabled: true,
                callbacks: callback_config,
              },
              chartAreaBorder: {
                borderColor: 'red',
                borderWidth: 2,
                borderDash: [5, 5],
                borderDashOffset: 2,
              },
              legend: {
                display: rep_data.length === 0,
              },
              title: {
                display: false,
                text: "Progression Since Beginning"
              },
            },
            legend: {
              display: false
            },
          scales: {
            x: {
              stacked: rep_data.length === 0,
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
              stacked: false,
              // stacked: rep_data.length === 0,
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