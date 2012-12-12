rpgdice
=======
by: ok 2012


Simple eventful dice for rpg or any dicegame.

Usage
-----
Install the module:
`npm install rpgdice`

Require the module:
`var dice = require('rpgdice');`

Roll the dice:
`dice.roll('1d6+4', 'player1')`
*the modifier (+4 etc.) and the playername can be omitted*

Dice has the following events:

`dice.on('rolling', function (dice, roller) {});` *when a player rolls*

`dice.on('roll', function (roll, roller) {});` *when a single dice rolls*

`dice.on('result', function (result, roller) {});` *when all the dice have been rolled*

`dice.on('misroll', function (error, roller) {});` *if the dice was malformed or other errors occur*

License
-------
MIT
