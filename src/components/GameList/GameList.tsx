import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./GameList.css";
import { gameImage } from "../../config/util";
import { IGame } from "../Interfaces/Game";

function GameList() {
  const dispatch = useDispatch();
  const history = useHistory();

  // grab all games from redux store
  const games: IGame[] = useSelector((store: any) => store.games);

  // on load, fetch games from the DB
  useEffect(() => {
    dispatch({ type: "FETCH_GAMES" });
  }, []);

  // on image click, grab the single game details from DB
  // store data in redux so we can use in the GameDetailsPage
  const handleImageClick = (gameId: number) => {
    dispatch({
      type: "FETCH_SINGLE_GAME",
      payload: gameId,
    });
    // on image click, direct user to a details page
    toDetailsPage(gameId);
  };

  const toDetailsPage = (gameId: number) => {
    history.push(`/details/${gameId}`);
  };

  return (
    <main>
      <section className="games">
        {/* map through the games date from redux store */}
        {games.map((game: IGame) => {
          return (
            <div
              key={game.id}
              className="game-image-div"
              onClick={() => handleImageClick(game.id)}
            >
              <img
                className="list-image"
                src={gameImage(game.poster)}
                alt={game.title}
              />
              <h3>{game.title}</h3>
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default GameList;
