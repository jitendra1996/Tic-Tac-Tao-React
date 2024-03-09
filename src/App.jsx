import React, { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import GameLogo from "./assets/game-logo.png";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import {
  driveActivePlayer,
  driveGameBoard,
  driveWinner,
} from "./utils/helpers";
import { PLAYERS } from "./utils/constants";

const App = () => {
  const [gameTurns, setGameTurns] = useState([]);
  const [playerName, setPlayerName] = useState(PLAYERS);

  const activePlayer = driveActivePlayer(gameTurns);

  const gameBoard = driveGameBoard(gameTurns);

  const winner = driveWinner(gameBoard, playerName);

  const hasDraw = gameTurns.length === 9 && !winner;

  const setActivePlayerHandler = (rowIndex, colIndex) => {
    setGameTurns((prevTurns) => {
      const currentPlayer = driveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  };

  const handleRestartGame = () => {
    setGameTurns([]);
  };

  const handlePlayerName = (symbol, newName) => {
    setPlayerName((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  };

  return (
    <main>
      <header>
        <img src={GameLogo} alt="game logo" />
        <h1>Tic-Tac-Tao</h1>
      </header>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            isActivePlayer={activePlayer === "X"}
            initialName={PLAYERS.X}
            symbol="X"
            onChangeName={handlePlayerName}
          />
          <Player
            isActivePlayer={activePlayer === "O"}
            initialName={PLAYERS.O}
            symbol="O"
            onChangeName={handlePlayerName}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestartGame} />
        )}
        <GameBoard
          onSelectedSquare={setActivePlayerHandler}
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
};

export default App;
