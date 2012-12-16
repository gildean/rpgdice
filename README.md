rpgdice
=======
by: ok 2012


Simple eventful dice for rpg or any dicegame.

Designed to support multiple games and players using the same dice, for example in multiple socket.io rooms.

Usage
-----
Install the module:
`npm install rpgdice`

Require the module:
`var dice = require('rpgdice');`

Roll the dice:
`dice.roll('1d6+4', 'player1', 'game1')`
*the modifier (+4 etc.), the playername and the gamename can be omitted*

Dice has the following events:

`dice.on('rolling', function (dice, roller, game) {});` *when a player rolls*

`dice.on('roll', function (roll, roller, game) {});` *when a single dice rolls*

`dice.on('result', function (result, roller, game) {});` *when all the dice have been rolled*

`dice.on('misroll', function (error, roller, game) {});` *if the dice was malformed or other errors occur*

License
-------
MIT
