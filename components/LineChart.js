import { Line } from "react-chartjs-2";
import styles from '@/styles/chart.module.css';


const LineChart = ({ my_data, options }) => {

  return (
    <div className={styles["chart-container"]}>
      <h2 style={{ textAlign: "center" }}></h2>
      <Line
        data={my_data}
        options = {options}
      />
    </div>
  );
};


export default LineChart;