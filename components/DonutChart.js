import { Doughnut, Pie } from "react-chartjs-2";
import styles from '@/styles/donut.module.css';

const DonutChart = ({ my_data, options }) => {
    return <div className={styles.donut_container}>
        <Doughnut
            className={styles.donut}
            data={my_data}
            options={options}>

        </Doughnut>
    </div>
}

export default DonutChart;

