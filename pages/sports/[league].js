import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getLeagueData } from '@/utils/footballapi.js';
import Script from 'next/script';
import styles from "@/styles/footballstandings.module.css";


function LeaguePage( {leagueData, nbaData }) {
  const router = useRouter();
  const [isRouterReady, setIsRouterReady] = useState(false);
  const [leagueID, setLeagueID] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (router.isReady) {
      setIsRouterReady(true);
    }
  }, [router.isReady]);

  useEffect(() => {
    if (isRouterReady && Object.keys(router.query).length !== 0) {
      setLeagueID(router.query.league);
    }
    else {
      return;
    }

  }, [isRouterReady, router.query]);

  // different football leagues
  const leagues = {
    "Ligue 1 🇫🇷": 61,
    "Serie A 🇮🇹": 135,
    "Bundesliga 🇩🇪": 78,
    "Premier League 🇬🇧": 39,
    "Primera Division 🇪🇸": 140,
    "Primeira Liga 🇵🇹": 94,
    "Eredivise 🇳🇱": 88,
  };

  const leagueStandings = leagueData.response[0].league.standings[0];
  console.log(leagueStandings);

  return (
    <div>
      <h1 className={styles.header}> Premier League 🇬🇧 </h1>

      <div className={styles.container}>
        <table className="table table-striped table-bordered table-rounded custom-table">
              <thead className="table-dark">
                <tr>
                  <th>Position</th>
                  <th> Team </th>
                  <th> Played </th>
                  <th> Wins </th>
                  <th> Draws </th>
                  <th> Losses </th>
                  <th> GF </th>
                  <th> GA </th>
                  <th> GD </th>
                  <th> Points </th>
                </tr>
              </thead>
              <tbody>
                {leagueStandings.map(item => (
                  <tr key={item.rank}>
                    <td>{item.rank}</td>
                    <td>{item.team.name}</td>
                    <td>{item.all.played}</td>
                    <td>{item.all.win}</td>
                    <td>{item.all.draw}</td>
                    <td>{item.all.lose}</td>
                    <td>{item.all.goals.for}</td>
                    <td>{item.all.goals.against}</td>
                    <td>{item.all.goals.for - item.all.goals.against}</td>
                    <td>{item.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
      </div>

    </div>

  )
}



export default LeaguePage