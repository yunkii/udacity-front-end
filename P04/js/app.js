// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = Math.floor((Math.random()*200)+150);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if(this.x <= 505) {  //canvas.width = 505
        this.x = this.x + this.speed * dt;
    } else {
        this.x = -2;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(){
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

Player.prototype.update = function(dt) {
    'use strict';

    var self = this;
    //if left key is pressed:
    if(this.pressedKey === 'left' && this.x > 0) { //player isn't on left edge
        this.x = this.x - 100;
    }

    //if right key is pressed:
    if(this.pressedKey === 'right' && this.x < 400) { //player isn't on right edge
        this.x = this.x + 100;
    }

    //if up key is pressed:
    if(this.pressedKey === 'up' && this.y > 0) {
        this.y = this.y - 90;
    }

    //if down key is pressed:
    if(this.pressedKey === 'down' && this.y < 400) {
        this.y = this.y + 90;
    }

    //this will make player jump only once when key is pressed:
    this.pressedKey = null;

    //if player reaches water, position reset:
    if(this.y < 0) {
         this.reset();
    }

    allEnemies.forEach(function(enemy) {
    if(self.x >= enemy.x - 25 && self.x <= enemy.x + 25) {
        if(self.y >= enemy.y - 25 && self.y <= enemy.y + 25) {
            self.reset();
            }
        }
    });
};

Player.prototype.render = function() {
    'use strict';
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//handleInput() method for player:
Player.prototype.handleInput = function(e) {
    'use strict';
    this.pressedKey = e;
};

//Reset player to beginning position
Player.prototype.reset = function() {
    'use strict';
   this.x = 200;
   this.y = 400;
};


// Instantiation of enemies and player objects:
var allEnemies = []; //creates an array of Enemies

//this function will DISPLAY Enemies:
(function displayEnemies() {
    'use strict';
    allEnemies.push(new Enemy(0, 50));
    allEnemies.push(new Enemy(0, 140));
    allEnemies.push(new Enemy(0, 230));
}());


var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
