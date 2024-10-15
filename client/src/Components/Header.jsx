import { useMonthStore } from "../Store/store";
import { useDayStore } from "../Store/store";
import { getGamesList } from "../Global/utilities";
function Header()
{
    const { month, year, incrementMonth, decrementMonth} = useMonthStore();
    const { setDays} = useDayStore();
    function handlePrevBtnClick()
    {
        decrementMonth();
        setDays();
        getGamesList(month, year);
    }

    function handleNextBtnClick()
    {
        incrementMonth();
        setDays();
        getGamesList(month, year);
    }

    return(
        <>
            <div className="heading">
                <h1>Games Release Calendar</h1>
            </div>

            <div className="btn-con">
                <button className="prevBtn" onClick={handlePrevBtnClick}>&#60; Prev</button>
                <span className="currMonthBtn">Current Month</span>
                <button className="nextBtn" onClick={handleNextBtnClick}>Next &#62;</button>
            </div>
        </>
    )
}

export default Header;