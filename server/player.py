

from typing import List

from card import Card


class Player:
    def __init__(self, colour: str, id: int):

        self.colour = colour
        self.id = id
        self.name = "Player " + str(id)
        self.selected_cards = []
        self.points = 0

    def to_dict(self):
        return {
            "name": self.name,
            "colour": self.colour,
            "id": self.id,
            "selected_cards": self.selected_cards,
            "points": self.points
        }
    
# import { Card } from "./Card";

# export class Player {

#     public name: string;
#     public id: number;
#     public colour: string;

#     public selected_cards: Card[];

#     constructor(name: string, colour: string, id: number, selected_cards: Card[]) {
        
#         this.name = name;
#         this.colour = colour;
#         this.id = id;
#         this.selected_cards = selected_cards;

#     }
# }

