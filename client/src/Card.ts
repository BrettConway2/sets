import { Colour, colourToString, Fill, fillToString, Quantity, Shape, shapeToString } from "./card_enums";

export class Card {

    public image_path: string;
    public id: number;


    public quantity: Quantity;
    public colour: Colour;
    public shape: Shape;
    public fill: Fill;

    constructor(quantity: Quantity, colour: Colour, shape: Shape, fill: Fill) {
        
        this.quantity = quantity;
        this.colour = colour;
        this.shape = shape;
        this.fill = fill;

        // determined from factors
        this.image_path = "/sets_shapes/" + shapeToString(shape) + "_" + colourToString(colour) + "_" + fillToString(fill) + ".png";
        this.id = quantity * 27 + colour * 9 + shape * 3 + fill * 1 + 1;

        console.log(this.id)

    }
}
