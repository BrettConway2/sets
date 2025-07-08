// this.number = number;
// this.colour = colour;
// this.shape = shape;
// this.fill = fill;

export enum Quantity {
    One,
    Two,
    Three
}

export enum Colour {
    Green,
    Purple,
    Red
}

export enum Shape {
    Diamond,
    Oval,
    Squiggle
}

export enum Fill {
    Full,
    Striped,
    Empty
}

export function quantityToString(q: Quantity): string {
  return (Quantity[q]).toLowerCase();
}

export function colourToString(c: Colour): string {
  return (Colour[c]).toLowerCase();
}

export function shapeToString(s: Shape): string {
  return (Shape[s]).toLowerCase();
}

export function fillToString(f: Fill): string {
  return (Fill[f]).toLowerCase();
}

