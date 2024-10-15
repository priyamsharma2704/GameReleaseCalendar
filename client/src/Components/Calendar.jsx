import {useState, useEffect} from 'react';
import GameModal from './GameModal.jsx';
import { useMonthStore } from '../Store/store.js';
import { useDayStore } from '../Store/store.js';
import {getGamesList} from '../Global/utilities.js';
function Calendar()
{
    /*
    Months are 0 based
    FIXME: 
    
        1. DONE : daysInMonth should be a state
        2. change cursor to pointer when hovered over the date div
    */
    const { days, setDays} = useDayStore();
    const { setMonth, setYear} = useMonthStore();
    const [activeDay, setActiveDay] = useState(null);
    const [gamesDetails, setGamesDetails] = useState([]);
    let gamesDetailsArr = [];
    let combined = [];
    function handleDayClick(idx)
    {
        console.log(idx);
        if(activeDay == idx)
            setActiveDay(null);
        else
            setActiveDay(idx);
    }

    function processGamesData(gamesData)
    {
        //TODO: Process and finally set the gamesData state
        let filteredGamesData = gamesData.filter((game) => game.background_image);
        console.log(filteredGamesData);

        for(let i = 1 ; i <= days.length; i++)
        {
            let gameDetailPerDay = filteredGamesData.filter((game) => {
                let date = new Date(game.released).getDate();
                if(date == i)
                    return game;
            })
            gamesDetailsArr.push(gameDetailPerDay);
        }
        console.log(gamesDetailsArr);

        //combineing two arrays( days and gamesDetailsArr) so that they can be mapped together while rendering
        combined = days.map((day, idx) => {
            return {date: day, detail: gamesDetailsArr[idx]}
        })
        setGamesDetails(combined);
        console.log(combined);
    }

    useEffect(() =>
    {
        let currentMonth = new Date().getMonth(); //logs month num like -> 9
        setMonth(currentMonth);

        let currentYear = new Date().getFullYear();// logs year -> 2024
        setYear(currentYear);

        let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); //logs max num of days in a month -> 31
        setDays(daysInMonth);
    }, [])

    // Second useEffect: Triggers when the 'days' state is updated
    useEffect(() => {
        if (days && days.length > 0) { 
            let currentMonth = new Date().getMonth();
            let currentYear = new Date().getFullYear();
            getGamesList(currentMonth, currentYear).then((resp) => {
                //setGamesData(resp.results);
                processGamesData(resp.results);
            });
        }
    }, [days]);

    return(
        <>
            <div className="calendar-con">
                {gamesDetails.map((data, idx) =>(
                    <div key={idx} className="month-con" onClick={()=>handleDayClick(idx)}>
                        <span id="day-span">{data.date}</span>
                        <div className="game-details">
                            {/* {data.detail.map((game, gameIdx) => (
                                <div key={gameIdx} className="game-item">
                                    <p><strong>Title:</strong> {game.name}</p>
                                    <p><strong>Release Date:</strong> {game.released}</p>
                                    <img src={game.background_image} alt={game.name} className="game-image" />
                                </div>
                            ))} */}
                            {data.detail.map((game, index) =>(
                                <div className="gameDetails" key={index}>
                                    <img id="gameImg" src={game.background_image}/>
                                    <span id="gameTitle" >{game.name}</span>
                                </div>
                            ))}
                        </div>
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