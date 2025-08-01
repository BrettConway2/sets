// App.js or Game.js
import React from 'react';
import { Card } from './Card';
import CardComponent from './CardComponent';
import { io, Socket } from 'socket.io-client';
import { Player } from './Player';
import styled from 'styled-components';


type ScoreBoardProps = {
    players: Player[];
};

const ScoreBoardCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
`;

const PlayerCard = styled.div<{ colour: string }>`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;

  border: 2px solid ${({ colour }) => colour};
  padding: 12px;
  border-radius: 8px;
  color: black;
  font-weight: bold;
`;

const Name = styled.div`
  font-size: 1.2rem;
`;

const Score = styled.div`
  font-size: 1rem;
`;


const ScoreBoard: React.FC<ScoreBoardProps> = ({ players }) => {

  return (
    <ScoreBoardCard>
        {players.map(player => (
        <PlayerCard key={player.id} colour={player.colour}>
          <Name>{player.name || 'Unnamed'}:</Name>
          <Score>{player.points}</Score>
        </PlayerCard>
      ))}
    </ScoreBoardCard>
  );
};

export default ScoreBoard