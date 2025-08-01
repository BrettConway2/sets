from random import sample
from typing import List
import eventlet

from player import Player
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
board = []


num_players = 0
players = [Player("#0000FF", 1), Player("#FF0000", 2), Player("#00FF00", 3), Player("#FFFF00", 4)]
game_started = False


app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*", async_mode='eventlet')




@socketio.on('connect')
def connect():
    print('A user connected')

@socketio.on('player_disconnected')
def player_disconnected():
    print('A user disconnected')



@socketio.on('new_player')
def new_player():

    global num_players
    ### TODO
    # global num_players
    # num_players = sum(players)
    # if num_players < 4:
    #     print("getting new player info...")
    #     pid = players.index(0)
    #     player = Player(colours[pid], num_players + 1)
    #     players[pid] = 1
    #     json_player = player.to_dict()

    #     print("new player with id " + str(pid) + "connected")

    #     emit('new_player')
    if num_players < 4:

        ### TEMP SOLUTION
        print("getting new player info...")
        
        player = players[num_players]
        num_players += 1
        json_player = player.to_dict()

        print("new player with id " + str(0) + "connected")

        json_players = [player.to_dict() for player in players[:num_players]]

        emit('player_joined', json_players, broadcast=True)

        emit('new_player')

        return json_player
    
    else:
        emit('game_full')

        return ""



    #    return json_player

    # else:
    #     print("game full")
    #     return None
    

# user submits a valid set:
#   that player has score increment and we replace cards from deck.
#   if no sets remain try add 4 or whats left
#   still no sets then game over
@socketio.on('found_set')
def handle_find_set(data):
    print(f"Set found, reducing deck size")

    player_id = data['playerId']
    set_of_cards = data['cards']  # This is the list of card dicts



    players[player_id].points += 1

    for card_to_remove in set_of_cards:
        for board_card in board:
            if card_to_remove['id'] == board_card.id:
                board.remove(board_card)

    new = sample(card_deck, 3)

    for card in new:
        board.append(card)

    json_cards = [card.to_dict() for card in board]

    emit('updating_board', json_cards, broadcast=True)

    json_players = [player.to_dict() for player in players[:num_players]]

    # TODO
    emit('update_scores', json_players, broadcast=True)


@socketio.on('get_starting_board')
def get_starting_board():
    global card_deck
    global board
    global game_started

    if not game_started :
        

        card_deck = create_deck()

        print("Deck created with " + str(len(card_deck)) + " cards")
        
        board = sample(card_deck, 12)

        for card in board:
            card_deck.remove(card)

        print("new board created, deck left with " + str(len(card_deck)) + " cards")

        game_started = True

        
    json_cards = [card.to_dict() for card in board]

    emit('updating_board', json_cards, broadcast=True)




if __name__ == '__main__':
    #for deployment #socketio.run(app, host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
    socketio.run(app, host='0.0.0.0', port=8000)

    



