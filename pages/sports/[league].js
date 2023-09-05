import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getLeagueData } from '@/utils/footballapi.js';

// async function getLeagueData() {
//   var myHeaders = new Headers();
//   myHeaders.append("x-rapidapi-key", process.env.FOOTBALL_API_KEY);
//   myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

//   var requestOptions = {
//     method: 'GET',
//     headers: myHeaders,
//     redirect: 'follow'
//   };

//   try {
//     const response = await fetch(`https://v3.football.api-sports.io/leagues`, requestOptions);
//     if (!response.ok) {
//       throw new Error(`HTTP Error! Status: ${response.status}`);
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('API Request Error:', error);
//     throw error;
//   }
// }


function LeaguePage( {leagueData }) {
  const router = useRouter();
  const [isRouterReady, setIsRouterReady] = useState(false);
  const [leagueID, setLeagueID] = useState(null);
  const [data, setData] = useState(null);

  // console.log(data);
  // const data = use(getLeagueData());
  // console.log(data);


  // useEffect(() => {
  //   if (router.isReady) {
  //     setIsRouterReady(true);

  //     const getLeagueData = async () => {
  //       var myHeaders = new Headers();
  //       myHeaders.append("x-rapidapi-key", process.env.NEXT_PUBLIC_FOOTBALL_API_KEY);
  //       myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

  //       var requestOptions = {
  //         method: 'GET',
  //         headers: myHeaders,
  //         redirect: 'follow'
  //       };

  //       try {
  //         const response = await fetch(`https://v3.football.api-sports.io/leagues`, requestOptions);
  //         if (!response.ok) {
  //           throw new Error(`HTTP Error! Status: ${response.status}`);
  //         }
  //         console.log(process.env.NEXT_PUBLIC_FOOTBALL_API_KEY);
  //         console.log("STATUS", response.status);
  //         const jsonData = await response.json();
  //         console.log(jsonData);
  //         setData(jsonData);
  //         // return data;
  //       } catch (error) {
  //         console.error('API Request Error:', error);
  //         throw error;
  //       }
  //     }
  //     getLeagueData();
  //   }

  // }, [router.isReady]);

  // the first time you fetch data from server, the data will be null. The API call to the server is async. Therefore, you must wait until router.query does not return undefined or null, to get params
  useEffect(() => {
    if (isRouterReady && Object.keys(router.query).length !== 0) {
      setLeagueID(router.query.league);
    }
    else {
      return;
    }

  }, [isRouterReady, router.query]);

  // const data = await getLeagueData();


  // const leagueID = params?.leagueID
  // const { leagueID } = router.query.league;
  // console.log(router.query);
  // console.log(data);
  console.log(leagueData);
  return (
    <div>
      <h1>League ID: {leagueID} </h1>
    </div>
  )
}



export default LeaguePage