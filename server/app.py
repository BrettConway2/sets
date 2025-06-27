from flask import Flask
from flask_socketio import SocketIO, emit
import os

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

@socketio.on('connect')
def connect():
    print('A user connected')

@socketio.on('find_set')
def handle_find_set(data):
    print(f"Set found: {data}")
    emit('update_scores', data, broadcast=True)

if __name__ == '__main__':
    socketio.run(app, host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))

