// App.js or Game.js
import { useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io("sets-production.up.railway.app"); // 🔗 use your Railway backend URL

function App() {
  useEffect(() => {
    socket.on('connect', () => {
      console.log("Connected to server");
    });

    socket.on('update_scores', (data) => {
      console.log("Score Update:", data);
      // You can update state here
    });

    // Clean up on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  // Example function to send data
  const sendSet = () => {
    socket.emit('find_set', { player: 'John', points: 1 });
  };

  return (
    <div>
      <h1>Real-Time Game</h1>
      <button onClick={sendSet}>Found a Set</button>
    </div>
  );
}

export default App;




