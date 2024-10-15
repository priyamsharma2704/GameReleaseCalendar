import { useMonthStore } from "../Store/store";
import { useDayStore } from "../Store/store";
function Header()
{
    const { incrementMonth, decrementMonth} = useMonthStore();
    const { setDays} = useDayStore();
    function handlePrevBtnClick()
    {
        decrementMonth();
        setDays();
    }

    function handleNextBtnClick()
    {
        incrementMonth();
        setDays();
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