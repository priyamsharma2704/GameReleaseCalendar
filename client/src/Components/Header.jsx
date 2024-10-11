
function Header()
{
    return(
        <>
            <div className="heading">
                <h1>Game Release Calendar</h1>
            </div>

            <div className="btn-con">
                <button className="prevBtn">&#60; Prev</button>
                <span className="currMonthBtn">Current Month</span>
                <button className="nextBtn">Next &#62;</button>
            </div>
        </>
    )
}

export default Header;