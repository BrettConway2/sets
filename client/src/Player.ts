import { Card } from "./Card";

export class Player {

    public name: string;
    public id: number;
    public colour: string;

    public selected_cards: Card[];
    public set_selected_cards: React.Dispatch<React.SetStateAction<Card[]>>;

    constructor(name: string, colour: string, id: number, selected_cards: Card[], set_selected_cards: React.Dispatch<React.SetStateAction<Card[]>>,) {
        
        this.name = name;
        this.colour = colour;
        this.id = id;

        this.selected_cards = selected_cards;
        this.set_selected_cards = set_selected_cards;

    }
}
