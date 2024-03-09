import React, { useState } from "react";

const Player = ({ initialName, symbol, isActivePlayer, onChangeName }) => {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  const onEditModeHandler = () => {
    setIsEditing((isEditing) => !isEditing);
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  };

  const nameChangeHandler = (e) => {
    e.preventDefault();
    setPlayerName(e.target.value);
  };
  return (
    <li className={isActivePlayer ? "active" : undefined}>
      <span className="player">
        {isEditing ? (
          <span>
            <input
              type="text"
              required
              id="playerName"
              value={playerName}
              onChange={nameChangeHandler}
            />
          </span>
        ) : (
          <span className="player-name">{playerName.toUpperCase()}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={onEditModeHandler}>{isEditing ? `Save` : `Edit`}</button>
    </li>
  );
};

export default Player;
