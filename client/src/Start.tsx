// App.js or Game.js
import React from 'react';


type BoardProps = {
  onStart: (...args: any[]) => void;
  numPlayers: number;
};


const Start: React.FC<BoardProps> = ({ onStart, numPlayers }) => {


  const handleStart = () => {
    onStart();
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Welcome to Sets</h1>
      <p>{numPlayers} Players joined </p>
  
      <br />
      <button onClick={handleStart} style={{ padding: '0.5rem 1rem' }}>
        Start Game
      </button>
    </div>
  );
};

export default Start