import { Card } from "./Card";

export class Player {

    public name: string;
    public id: number;
    public colour: string;
    public points: number
    public selected_cards: Card[];

    constructor(name: string, colour: string, id: number) {
        
        this.name = name;
        this.colour = colour;
        this.id = id;

        this.selected_cards = [];
        this.points = 0;


    }
}
