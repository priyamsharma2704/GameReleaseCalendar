
async function getGamesList(month, year)
{
    let startDate = "";
    let endDate = "";
    if(month < 9 && month  > 0)
    {
        startDate =`${year}-0${month + 1}-01`;
        endDate = `${year}-0${month + 1}-30`;
    }
    else
    {
        startDate =`${year}-${month + 1}-01`;
        endDate = `${year}-${month + 1}-30`;
    }

    let api_key = import.meta.env.VITE_API_KEY;

    let url = "https://api.rawg.io/api/games?key=" + api_key + "&dates=" + startDate + "," + endDate;

    let resp = await fetch(url);
    let data = await resp.json();

    return data;
}

export { getGamesList};