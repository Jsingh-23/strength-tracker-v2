import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getLeagueData } from '@/utils/footballapi.js';
import Script from 'next/script';
import styles from "@/styles/nbastandings.module.css";

function NBAStandingsPage( {leagueData, nbaData }) {
  const router = useRouter();
  const [isRouterReady, setIsRouterReady] = useState(false);
  const [leagueID, setLeagueID] = useState(null);
  const [data, setData] = useState(null);

  // useEffect(() => {
  //   if (router.isReady) {
  //     setIsRouterReady(true);
  //   }
  // }, [router.isReady]);

  // useEffect(() => {
  //   if (isRouterReady && Object.keys(router.query).length !== 0) {
  //     console.log("sorted", nbaData.response);
  //   }
  //   else {
  //     return;
  //   }

  // }, [isRouterReady, router.query]);


  // filter all Western Conference teams and sort by their standings
  const westernConferenceData = nbaData.response[0]
    .filter(item => item.group.name === 'Western Conference')
    .sort((a, b) => a.position - b.position);

  // filter all Eastern Conference teams and sort by their standings
  const easternConferenceData = nbaData.response[0]
    .filter(item => item.group.name === 'Eastern Conference')
    .sort((a, b) => a.position - b.position);

  // console.log(easternConferenceData);


  return (
    <div>
      <h1 className={styles.header}> NBA Standings </h1>
      <div className={styles.container}>
        <div className={styles.western_div}>
          <h2>Western Conference</h2>
          <table className="table table-striped table-bordered table-rounded custom-table">
            <thead>
              <tr>
                <th>Position</th>
                <th> Team </th>
                <th> Wins </th>
                <th> Losses </th>
                <th> PCT </th>
              </tr>
            </thead>
            <tbody>
              {westernConferenceData.map(item => (
                <tr key={item.position}>
                  <td>{item.position}</td>
                  <td>{item.team.name}</td>
                  <td>{item.games.win.total}</td>
                  <td>{item.games.lose.total}</td>
                  <td>{item.games.win.percentage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.eastern_div} >
          <h2>Eastern Conference</h2>
          <table className="table table-striped table-bordered table-rounded custom-table" >
            <thead>
              <tr>
                <th>Position</th>
                <th> Team </th>
                <th> Wins </th>
                <th> Losses </th>
                <th> PCT </th>
              </tr>
            </thead>
            <tbody>
              {easternConferenceData.map(item => (
                <tr key={item.position}>
                  <td>{item.position}</td>
                  <td>{item.team.name}</td>
                  <td>{item.games.win.total}</td>
                  <td>{item.games.lose.total}</td>
                  <td>{item.games.win.percentage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}



export default NBAStandingsPage