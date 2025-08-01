import React from 'react';
import { Card } from './Card';


type CardProps = {
    card: Card;
    selectedCards: Card[];
    setSelectedCards: React.Dispatch<React.SetStateAction<Card[]>>; // updated type
    foundSet: (playerId: number, cards: Card[]) => void;
    playerId: number;
    playerColour: string;
};

const CardComponent: React.FC<CardProps> = ({ card, selectedCards, setSelectedCards, foundSet, playerId, playerColour }) => {

    const isSelected = selectedCards.some(c => c.id === card.id);

    function handleSelectCard() {
        const alreadySelected = selectedCards.some(c => c.id === card.id);
        let newSelection: Card[];

        if (alreadySelected) {
            // Remove card if already selected
            newSelection = selectedCards.filter(c => c.id !== card.id);
        } else {
            // Add card to selection
            newSelection = [...selectedCards, card];
        }

        setSelectedCards(newSelection);

        if (newSelection.length === 3) {
            const quantities = newSelection.map(c => c.quantity);
            const colours = newSelection.map(c => c.colour);
            const shapes = newSelection.map(c => c.shape);
            const fills = newSelection.map(c => c.fill);

            const isValidSet = (values: number[]) => {
                const unique = new Set(values);
                return unique.size === 1 || unique.size === 3;
            };

            const valid =
                isValidSet(quantities.map(Number)) &&
                isValidSet(colours.map(Number)) &&
                isValidSet(shapes.map(Number)) &&
                isValidSet(fills.map(Number));

            
            if (valid) {
                console.log("Found valid set")
                foundSet(playerId, newSelection)
                
            } else {
                console.log("Invalid set")
            }

            // Reset selection
            setTimeout(() => setSelectedCards([]), 500); // Small delay to see outline before clearing

        }
    }

    const card_images = Array.from({ length: card.quantity + 1 }).map((_, i) => (
        <img
            key={i}
            src={card.image_path}
            alt={`img-${card.id}-${i}`}
            style={{ width: "22%" }}
        />
    ));

    return (
        <button
            key={card.id}
            onClick={handleSelectCard}
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: '5%',
                padding: "2%",
                border: isSelected ? "3px solid blue" : "1px solid #ccc",
                borderRadius: "8px",
                backgroundColor: "#ffffff",
                cursor: "pointer",
                width: '75%',
                transition: 'border 0.2s'
            }}
        >
            {card_images}
        </button>
    );
};

export default CardComponent;
