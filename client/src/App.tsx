// App.js or Game.js
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Board from './Board';
import React from 'react';
import Start from './Start';
import { Player } from './Player';
import { Card } from './Card';
import ScoreBoard from './ScoreBoard';



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
  const [joinedGame, setJoinedGame] = useState(false)
  const [gameFull, setGameFull] = useState(false)
  const [boardCards, setBoardCards] = useState([])
  const [totalPlayers, setTotalPlayers] = useState(0)

  const [playerName, setPlayerName] = useState("")
  const [playerPoints, setPlayerPoints] = useState(0)
  var playerId = -1
  var playerColour = ""

  const [allPlayers, setAllPlayers] = useState<Player[]>([])

  const [selectedCards, setSelectedCards] = useState<Card[]>([])

  // Assuming you have socket imported and initialized
  const foundSet = (playerId: number, cards: Card[]) => {
    socket.emit('found_set', {
      playerId,
      cards,
    });
  };


  useEffect(() => {

    // ------  Socket ons: when something broadcasts this do... ------

    socket.on('connect', () => {
      console.log("Connected to server");
      
      // TODO: get a new player object w/ id and colour and points and a set
    });

    socket.on('update_scores', (players: Player[]) => {
      console.log("Score Update:", players);
      setAllPlayers(players)

    });

    socket.on('player_joined', (players: Player[]) => {
      console.log("New player joined");
      setAllPlayers(players)
    });

    socket.on("updating_board", (cards) => {
      console.log("Received starting cards:", cards);
      setBoardCards(cards);
      setGameStarted(true)


      // TODO should send started to backend and start for all players
    });

    socket.on("game_full", (cards) => {
      setGameFull(true)
    });

    socket.on("new_player", (cards) => {
      setTotalPlayers(totalPlayers + 1)
    });





    // --------  Socket emits --- sending to backend ----------

    socket.emit('new_player', (player: Player) => {
      if (player == null) {
        console.log("Game full");
      } else {
        console.log("Getting player info")
        setJoinedGame(true);
        setPlayerName(player.name)
        playerId = player.id
        var playerColour = player.colour
      }
    });

    
  // return () => {
  //   socket.off('connect');
  //   socket.off('disconnect');
  //   socket.off('update_scores');
  //   socket.off('updating_board');
  //   socket.off('new_player');
  // };

  }, []);


  return (
    <div>
      <ScoreBoard players={allPlayers} />
      {!gameFull ? (gameStarted ? <Board cards={boardCards} selectedCards={selectedCards} setSelectedCards={setSelectedCards} foundSet={foundSet}/> : <Start onStart={() => socket.emit('get_starting_board')} numPlayers={totalPlayers} />) : "Sorry! Game is full"}
    </div>
  );
}

export default App;




