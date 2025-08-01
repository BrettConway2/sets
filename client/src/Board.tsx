// App.js or Game.js
import React from 'react';
import { Card } from './Card';
import CardComponent from './CardComponent';
import { io, Socket } from 'socket.io-client';


type BoardProps = {
  cards: Card[];
  selectedCards: Card[];
  setSelectedCards: React.Dispatch<React.SetStateAction<Card[]>>;
  foundSet: (playerId: number, cards: Card[]) => void;
};




const Board: React.FC<BoardProps> = ({ cards, selectedCards, setSelectedCards, foundSet }) => {

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2%", padding: "5%"}}>
      {cards.map((card, idx) => (
          <CardComponent key={idx} card={card} selectedCards={selectedCards} setSelectedCards={setSelectedCards} foundSet={foundSet} playerId={0} playerColour={''} />
      ))}
    </div>
  );
};

export default Board