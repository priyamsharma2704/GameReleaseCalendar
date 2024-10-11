import GameModal from './GameModal.jsx';

function Calendar()
{

    let months = [1,2,3,4,5,6,7,8,9,10,
        11,12,13,14,15,16,17,18,19,20,
        21,22,23,24,25,26,27,28,29,30];

    
    function handleMonthClick()
    {
        console.log("click");
    }

    return(
        <>
            <div className="calendar-con">
                {months.map((month, idx) =>(
                    <div key={idx} className="month-con" onClick={handleMonthClick}>
                        <span id="day-span">{month}</span>

                    </div>
                ))}
            </div>
            <div className="modal-con">
                <GameModal></GameModal>
            </div>

        </>
    )
}

export default Calendar;