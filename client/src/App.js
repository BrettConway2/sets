import React, { useEffect } from 'react';
import socket from './socket';

function App() {
  useEffect(() => {
    socket.on("update_scores", (data) => {
      console.log("Score update:", data);
    });

    return () => socket.disconnect();
  }, []);

  const sendSet = () => {
    socket.emit("find_set", { player: "Player1", cards: [1, 2, 3] });
  };

  return (
    <div>
      <h1>Find the Set!</h1>
      <button onClick={sendSet}>Found a Set</button>
    </div>
  );
}

export default App;
