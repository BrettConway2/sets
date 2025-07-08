from enum import Enum

class Quantity(Enum):
    ONE = 0
    TWO = 1
    THREE = 2

class Colour(Enum):
    GREEN = 0
    PURPLE = 1
    RED = 2

class Shape(Enum):
    DIAMOND = 0
    OVAL = 1
    SQUIGGLE = 2

class Fill(Enum):
    FULL = 0
    STRIPED = 1
    EMPTY = 2


def shape_to_string(shape: Shape) -> str:
    return Shape(shape).name.lower()

def colour_to_string(colour: Colour) -> str:
    return Colour(colour).name.lower()

def fill_to_string(fill: Fill) -> str:
    return Fill(fill).name.lower()

def quantity_to_string(quantity: Quantity) -> str:
    return Quantity(quantity).name.lower()