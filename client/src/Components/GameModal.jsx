

function GameModal({closeModal, idx, game})
{
    console.log(game);
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
                    <span className="description"> {game.name}</span>
                </p>
                <div className="imgCon">
                    {game.short_screenshots.map((ss, idx)=>(
                        <img key={idx}
                        src={ss.image} 
                        id="screenshots" />
                    ))}
                </div>
                <p>
                    <span className="label">Release Date : </span><span id="releaseDate">{game.released}</span>
                </p>
                <p>
                    <span className="label">Genre : </span><span id="genre">
                        {game.genres.map((genre, idx)=>(
                            <span key={idx}>{genre.name} </span>))}</span>
                </p>
                <p>
                    <span className="label">Platform : </span><span id="platform">
                        {game.platforms.map((platform, idx)=>(
                            <span key={idx}>{platform.platform.name} </span>))}</span>
                </p>
                <p>
                    <span className="label">Rating : </span><span id="rating">
                        {game.ratings && game.ratings.length ? game.ratings.map((rate,idx)=>(
                            <span key={idx}>{rate.title} - <strong>{rate.count}</strong> </span>)) :<span>N/A</span>}</span>
                </p>
            </div>
        </div>

        </>
    );
}

export default GameModal;