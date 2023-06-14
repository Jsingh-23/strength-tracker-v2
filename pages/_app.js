import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import Script from "next/script";
import { SessionProvider } from "next-auth/react";

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState } from "react";
// import { Data } from "./Data";
// import PieChart from "../components/PieChart";
import BarChart from "../components/BarChart";
// import "./styles.css";
import styles from "@/styles/MyApp.module.css";
import { DateTime } from 'luxon';

Chart.register(CategoryScale);

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <div className={styles.container}>
        <Navbar />
        <div className={styles.content}>
          <Component {...pageProps} />
        </div>
      </div>
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" />
    </SessionProvider>
  );
}

export default MyApp;