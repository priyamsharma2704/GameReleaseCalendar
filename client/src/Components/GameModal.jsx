

function GameModal({closeModal, idx})
{
console.log(idx);
    function handleClose()
    {
        closeModal(idx);
    }

    return(
        <>
        <div className="modal">
            <div className="details">
                <span id="close" onClick={handleClose}>X</span>
                <br></br>
                <p>
                    <span className="label"> Description</span> : <span id="description">sada</span>
                </p>
                <p>
                    <span className="label">Release Date : </span><span id="releaseDate">asdaswd</span>
                </p>
                <p>
                    <span className="label">Genre : </span><span id="genre">asdawd</span>
                </p>
                <p>
                    <span className="label">Platform : </span><span id="platform">asdawd</span>
                </p>
                <p>
                    <span className="label">Rating : </span><span id="rating">asdawd</span>
                </p>
            </div>
        </div>

        </>
    );
}

export default GameModal;