# Overview
This repository deploys a game based on the 1974 pattern recognition game 'Set' created by geneticist Marsha Falco,
where the aim for players is to find as many sets as possible.

# A set
A set is comprised of 3 cards, where each attribute across those cards are either all the same or all different.
(Attributes being the colour, shape, fill and quantity).

# Architecture
This game is composed of a Flask backend serving a Typescript frontend using the React and Styled-Component libraries.
The backend is hosted on Railway, and the frontend on Vercel.
The backend uses eventlet sockets to serve connections for real-time player interaction

# Game Modes
(TODO)

# Play Now
The deployed game can be found at:   [https://sets-mu.vercel.app/](URL)



