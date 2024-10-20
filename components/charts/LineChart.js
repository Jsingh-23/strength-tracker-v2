import { Line } from "react-chartjs-2";
import styles from '@/styles/chart.module.css';


const LineChart = ({ my_data, rep_data }) => {

  var callback_config = {
    label: (tooltipItem, data) => {
      const dataIndex = tooltipItem.dataIndex;
      const repetitionsData = rep_data;
      var labels = [`Weight: ${my_data.datasets[0].data[dataIndex]}`, `Repetitions: ${repetitionsData[dataIndex]}`];
      return labels;
      // return `Repetitions: ${repetitionsData[dataIndex]}`;
    }
  }

  var line_chart_options = {
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: callback_config
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
          display: false,
          text: "Date",
          font: {
            weight: "bold",
            size: 15,
          }
        },
        ticks: {
          color: 'white',
          // callback: function(val, index) {
          //   // Hide every 2nd tick label
          //   return index % 2 === 0 ? this.getLabelForValue(val) : '';
          // },
        },
      },
      y: {
        title: {
          display: true,
          text: "Weight (Lbs)",
          font: {
            weight: "bold",
            size: 20,
          },
          color: 'white',
        },
        ticks: {
          color: 'white',
        }
      },
    },
    elements: {
      point: {
        backgroundColor: 'white'
      },
      line: {
        borderWidth: 2,
        fill: true,
        tension:0.5
      }
    }
  }

  return (
    <div className={styles["chart-container"]}>
      <h2 style={{ textAlign: "center" }}></h2>
      <Line
        data={my_data}
        options={line_chart_options}
      />
    </div>
  );
};


export default LineChart;