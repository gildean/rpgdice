var events = require('events'),
    util = require('util');

var Dice = function () {
    events.EventEmitter.call(this);
    var self = this;
    this.roll = function (dice, roller, game) {
        var roller = roller || 'player',
            game = game || null,
            error = false,
            i, dices, times, withoutmod, result, mod, die;
        if (dice) {
            self.emit('rolling', dice, roller, game);
            dices = dice.split('d');
            if (dices.length > 1) {
                times = parseInt(dices[0]);
                withoutmod = dices[1].split('+');
                die = parseInt(withoutmod[0]) - 1;
                result = 0;
                if (withoutmod.length > 1) {
                    mod = parseInt(withoutmod[1]);
                    if (!isNaN(mod)) {
                        result += mod;
                    }
                }
                function rolling() {
                    return parseInt(Math.round(Math.random() * die) + 1);
                };
                if (!isNaN(die) && die > 0 && die < 1000001 && times > 0 && times < 1001) {
                    for (i = 0; i < times; i += 1) {
                        roll = rolling();
                        self.emit('roll', roll, roller, game);
                        result += roll;
                    };
                } else {
                    error = true;
                    self.emit('misroll', 'A die must have 2 to 1M sides and you must roll 1 to 1k times', roller, game);
                }
            } else {
                error = true;
                self.emit('misroll', 'Malformed dice', roller, game);
            }
            if (result && !error) {
                self.emit('result', result, roller, game);
            }
        } else {
            error = true;
            self.emit('misroll', 'No dice', roller, game);
        }
    };
};

util.inherits(Dice, events.EventEmitter);

module.exports = new Dice();
