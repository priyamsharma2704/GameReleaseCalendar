import {useState, useEffect} from 'react';
import GameModal from './GameModal.jsx';

function Calendar()
{
    /*
    Months are 0 based
    FIXME: 
    
        1. DONE: daysInMonth should be a state
        2. change cursor to pointer when hovered over the date div
    */
    let days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];

    const [activeDay, setActiveDay] = useState(null);

    async function getGamesList(month, year)
    {
        let api_key = "5ff25c01d3034d34a2cef382cc6dcc36";
        let startDate = "" + year + "-" + (month+1) + "-01";
        let endDate =  "" + year + "-" + (month+1) + "-" + "30";

        let url = "https://api.rawg.io/api/games?key=" + api_key + "&dates=" + startDate + "," + endDate;

        let resp = await fetch(url);
        let data = await resp.json();
        console.group(data);

        processGamesData(data.results);
    }

    function processGamesData(gamesData)
    {
        //TODO: Process and finally set the gamesData state
        let filteredGamesData = gamesData.filter((game) => game.background_image);
        console.log(filteredGamesData);
    }

    function handleDayClick(idx)
    {
        console.log(idx);
        if(activeDay == idx)
            setActiveDay(null);
        else
            setActiveDay(idx);
    }

    useEffect(() =>
    {
        //getMonth is 0 based
        let currentMonth = new Date().getMonth(); //logs month num like -> 9

        setActiveMonth(currentMonth);
        let currentYear = new Date().getFullYear();// logs year -> 2024
        setActiveYear(currentYear);
        console.log(currentMonth, currentYear);

        let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); //logs max num of days in a month -> 31

        getGamesList(currentMonth, currentYear)
    }, [])

    return(
        <>
            <div className="calendar-con">
                {days.map((day, idx) =>(
                    <div key={idx} className="month-con" onClick={()=>handleDayClick(idx)}>
                        <span id="day-span">{day}</span>

                    </div>
                ))}
            </div>
            <div className="modal-con">
                {activeDay !== null && <GameModal closeModal={()=>handleDayClick(activeDay)} 
                idx={activeDay}></GameModal>}
            </div>

        </>
    )
}

export default Calendar;