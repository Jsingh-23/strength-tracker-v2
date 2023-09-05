import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import Script from "next/script";
import { SessionProvider } from "next-auth/react";

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import React, { useEffect, useState } from "react";
// import { Data } from "./Data";
// import PieChart from "../components/PieChart";
import BarChart from "../components/BarChart";
// import "./styles.css";
import styles from "@/styles/MyApp.module.css";
import { DateTime } from 'luxon';

import { getLeagueData } from '@/utils/footballapi.js';

Chart.register(CategoryScale);

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [leagueData, setLeagueData] = useState(null);

  useEffect(() => {
    getLeagueData()
      .then((data) => {
        setLeagueData(data);
      })
      .catch((error) => {
        console.error('Error fetching league data:', error);
      });
  }, []);

  return (
    <main>
      <SessionProvider session={session}>
        <div className={styles.container}>
          <Navbar />
          <div className={styles.content}>
            <Component {...pageProps} leagueData={leagueData}/>
          </div>
        </div>
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" />
      </SessionProvider>
    </main>
  );
}

export default MyApp;