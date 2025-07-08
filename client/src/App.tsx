// App.js or Game.js
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Board from './Board';
import React from 'react';
import Start from './Start';



// FOR DEPLOYMENT
// const socket = io("https://sets-production.up.railway.app", {
//   transports: ["websocket"],
// });


// FOR LOCAL TESTING
const socket = io("http://localhost:8000", {
  transports: ["websocket"],
});

function App() {

  const [gameStarted, setGameStarted] = useState(false)


  useEffect(() => {
    socket.on('connect', () => {
      console.log("Connected to server");
      
      // TODO: get a new player object w/ id and colour and points and a set
    });

    socket.on('update_scores', (data) => {
      console.log("Score Update:", data);
      // You can update state here
    });

    // Listener for starting board
    socket.on("starting_board", (cards) => {
      console.log("Received starting cards:", cards);
      setBoardCards(cards);
      setGameStarted(true)

      // TODO should send started to backend and start for all players
    });


    // Clean up on unmount
    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  const [boardCards, setBoardCards] = useState([])


  // Example function to send data
  // const sendSet = () => {
  //   socket.emit('find_set', { player: 'John', points: 1 });
  // };


  return (
    <div>
      {gameStarted ? <Board cards={boardCards} /> : <Start onStart={() => socket.emit('get_starting_board')} numPlayers={0} />}
    </div>
  );
}

export default App;




