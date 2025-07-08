from random import sample
import eventlet
eventlet.monkey_patch()
from flask import Flask
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import os

from card_enums import Colour, Fill, Quantity, Shape, colour_to_string, fill_to_string, shape_to_string
from card import Card

# Deck initialisation
def create_deck():
    deck = []
    for quantity in range(3):
        for shape in range(3):
            for colour in range(3):
                for fill in range(3):
                    deck.append(Card(Quantity(quantity), Colour(colour), Shape(shape), Fill(fill)))
    return deck

card_deck = create_deck()



app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*", async_mode='eventlet')




@socketio.on('connect')
def connect():
    print('A user connected')

# user submits a valid set:
#   that player has score increment and we replace cards from deck.
#   if no sets remain try add 4 or whats left
#   still no sets then game over
@socketio.on('find_set')
def handle_find_set(data):
    print(f"Set found: {data}")
    emit('update_scores', data, broadcast=True)


@socketio.on('get_starting_board')
def get_starting_board():
    print("getting starting board")
    
    starting_cards = sample(card_deck, 12)

    json_cards = [card.to_dict() for card in starting_cards]

    emit('starting_board', json_cards)




if __name__ == '__main__':
    socketio.run(app, host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
    #socketio.run(app, host='0.0.0.0', port=8000)

    



