import "../styles/globals.css";
// import Navbar from "@/components/Navbar";
import Custom_Nav from "@/components/Custom_Nav";
import Script from "next/script";
import {NextUIProvider} from '@nextui-org/react'
import { SessionProvider } from "next-auth/react";

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import React, { useEffect, useState } from "react";

import styles from "@/styles/MyApp.module.css";

// import util to allow fetch request to footballapi
import { getLeagueData } from '@/utils/footballapi.js';
import { getNBAData } from '@/utils/basketballapi.js';

Chart.register(CategoryScale);

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  // fetch request to API is sent only once when the app initially loads, and is stored
  // in leagueData state. This allows leagueData to be accessed anywhere within the app
  const [leagueData, setLeagueData] = useState(null);
  const [nbaData, setnbaData] = useState(null);

  useEffect(() => {
    getLeagueData()
      .then((data) => {
        setLeagueData(data || {});
      })
      .catch((error) => {
        console.error('Error fetching football league data:', error);
      });
  }, []);

  useEffect(() => {
    getNBAData()
      .then((data) => {
        setnbaData(data || {});
      })
      .catch((error) => {
        console.error('Error fetching nba data:', error);
      });
  }, []);

  return (
    <NextUIProvider>
      <main className="dark text-foreground bg-background">
        <SessionProvider session={session}>
          <div className={styles.container}>
            {/* <Navbar /> */}
            <Custom_Nav />
            <div className={styles.content}>
              <Component {...pageProps} leagueData={leagueData} nbaData={nbaData}/>
            </div>
          </div>
          <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" />
          <Script
          type="module"
          src="https://widgets.api-sports.io/2.0.3/widgets.js"
        />
        </SessionProvider>
      </main>
    </NextUIProvider>
  );
}

// myApp.getInitialProps = async (appContext) => {}

export default MyApp;