import React from 'react';
import { Card } from './Card';

type CardProps = {
  card: Card;
};

const CardComponent: React.FC<CardProps> = ({ card }) => {

    const card_images = Array.from({ length: card.quantity + 1 }).map((_, i) => (
        <img
        key={i}
        src={card.image_path}
        alt={`img-${card.id}-${i}`}
        style={{ width: "22%"}}
        />
    ));

    return (
        <button
            key={card.id}
            onClick={() => alert(`Card ${card.id + 1} clicked`)}
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: '5%',
                padding: "2%",
                border: "1px solid #ccc",
                borderRadius: "8px",
                backgroundColor: "#ffffff",
                cursor: "pointer",
                width: '75%'
            }}
            >
            
            {card_images}

            </button>
    );
};

export default CardComponent;
