export async function getLeagueData() {
  var myHeaders = new Headers();
  myHeaders.append("x-rapidapi-key", process.env.NEXT_PUBLIC_FOOTBALL_API_KEY);
  myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  try {
    const response = await fetch(`https://v3.football.api-sports.io/leagues`, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    // console.log(process.env.NEXT_PUBLIC_FOOTBALL_API_KEY);
    // console.log("STATUS", response.status);
    const jsonData = await response.json();
    // console.log(jsonData);
    // setData(jsonData);
    return jsonData;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
}