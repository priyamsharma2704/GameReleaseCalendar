
async function getGamesList(month, year)
{
    let api_key = "5ff25c01d3034d34a2cef382cc6dcc36";
    let startDate = "" + year + "-" + (month+1) + "-01";
    let endDate =  "" + year + "-" + (month+1) + "-" + "30";

    let url = "https://api.rawg.io/api/games?key=" + api_key + "&dates=" + startDate + "," + endDate;

    let resp = await fetch(url);
    let data = await resp.json();

    return data;
}

export { getGamesList};