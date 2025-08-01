from card_enums import Colour, Fill, Quantity, Shape, colour_to_string, fill_to_string, shape_to_string


class Card:
    def __init__(self, quantity: Quantity, colour: Colour, shape: Shape, fill: Fill):
        self.quantity = quantity
        self.colour = colour
        self.shape = shape
        self.fill = fill

        self.image_path = f"/sets_shapes/{shape_to_string(shape)}_{colour_to_string(colour)}_{fill_to_string(fill)}.png"
        self.id = quantity.value * 27 + colour.value * 9 + shape.value * 3 + fill.value * 1 + 1

        #print(self.id)

    def to_dict(self):
        return {
            "id": self.id,
            "quantity": self.quantity.value,
            "colour": self.colour.value,
            "shape": self.shape.value,
            "fill": self.fill.value,
            "image_path": self.image_path
        }
