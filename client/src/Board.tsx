// App.js or Game.js
import React from 'react';
import { Card } from './Card';
import CardComponent from './CardComponent';


type BoardProps = {
  cards: Card[];
};


const Board: React.FC<BoardProps> = ({ cards }) => {

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2%", padding: "5%"}}>
      {cards.map((card, idx) => (
          <CardComponent key={idx} card={card} />
      ))}
    </div>
  );
};

export default Board