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
    const { month, year, incrementMonth, decrementMonth, setMonth, setYear} = useMonthStore();
    const [activeDay, setActiveDay] = useState(null);
    const [gamesDetails, setGamesDetails] = useState([]);
    const [gameForTheDay, setGameForTheDay] = useState({});

    let gamesDetailsArr = [];
    let combined = [];
    
    function handleDayClick(idx, game)
    {
        //console.log(idx, game);
        if(activeDay == idx)
            setActiveDay(null);
        else
            setActiveDay(idx);

        setGameForTheDay(game);
    }

    function processGamesData(gamesData)
    {
        //TODO: Process and finally set the gamesData state
        let filteredGamesData = gamesData.filter((game) => game.background_image);

        for(let i = 1 ; i <= days.length; i++)
        {
            let gameDetailPerDay = filteredGamesData.filter((game) => {
                let date = new Date(game.released).getDate();
                if(date == i)
                    return game;
            })
            gamesDetailsArr.push(gameDetailPerDay);
        }

        //combineing two arrays( days and gamesDetailsArr) so that they can be mapped together while rendering
        combined = days.map((day, idx) => {
            return {date: day, detail: gamesDetailsArr[idx]}
        })
        setGamesDetails(combined);
        console.log(combined);
    }

    function handlePrevBtnClick()
    {
        decrementMonth();
        setDays();
        getGamesList(useMonthStore.getState().month, useMonthStore.getState().year).then((resp) => {
            processGamesData(resp.results);
        });
    }

    function handleNextBtnClick()
    {
        incrementMonth();
        setDays();
        getGamesList(useMonthStore.getState().month, useMonthStore.getState().year).then((resp) => {
            processGamesData(resp.results);
        });
    }

    function getMonthName(monthNum)
    {
        let date = new Date();
        date.setMonth(monthNum);

        console.log(date.toLocaleString('deault', {month : 'long'}));
        return date.toLocaleString('deault', {month : 'long'});
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
            let currentMonth = useMonthStore.getState().month;
            let currentYear = useMonthStore.getState().year;
            getGamesList(currentMonth, currentYear).then((resp) => {
                processGamesData(resp.results);
            });
        }
    }, [days]);

    return(
        <>
            <div className="heading">
                <h1>Games Release Calendar</h1>
            </div>

            <div className="btn-con">
                <button className="prevBtn" onClick={handlePrevBtnClick}>&#60; Prev</button>
                <span className="currMonthSpan">{getMonthName(month)} - {year}</span>
                <button className="nextBtn" onClick={handleNextBtnClick}>Next &#62;</button>
            </div>
            <div className="calendar-con">
                {gamesDetails.map((data, idx) =>(
                    <div key={idx} className="month-con">
                        <span id="day-span">{data.date}</span>
                        <div className="game-details">
                            {data.detail.map((game, index) =>(
                                <div className="gameDetails" key={index} onClick={()=>handleDayClick(index, game)}>
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
                idx={activeDay} game={gameForTheDay}></GameModal>}
            </div>

        </>
    )
}

export default Calendar;