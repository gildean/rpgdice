var events = require('events'),
    util = require('util');

var Dice = function () {
    events.EventEmitter.call(this);
    var self = this,
        error = false;
    this.roll = function (dice, roller) {
        var roller = roller || 'player',
            i, dices, times, withoutmod, result, mod;
        if (dice) {
            self.emit('rolling', dice, roller);
            dices = dice.split('d');
            if (dices.length > 1) {
                times = parseInt(dices[0]);
                withoutmod = dices[1].split('+');
                die = parseInt(withoutmod[0].replace('d','')) - 1;
                result = 0;
                if (withoutmod.length > 1) {
                    mod = parseInt(withoutmod[1].replace('+',''));
                    result += mod;
                }
                function rolling() {
                    return parseInt(Math.round(Math.random() * die) + 1);
                };
                if (die > 0 && die < 1000001 && times > 0 && times < 1001) {
                    for (i = 0; i < times; i += 1) {
                        roll = rolling();
                        self.emit('roll', roll, roller);
                        result += roll;
                    };
                } else {
                    error = true;
                    self.emit('misroll', 'A die must have 2 to 1M sides and you must roll 1 to 1k times', roller);
                }
            } else {
                error = true;
                self.emit('misroll', 'Malformed dice', roller);
            }
            if (result && !error) {
                self.emit('result', result, roller);
            }
        } else {
            error = true;
            self.emit('misroll', 'No dice', roller);
        }
    };
};

util.inherits(Dice, events.EventEmitter);

module.exports = new Dice();
