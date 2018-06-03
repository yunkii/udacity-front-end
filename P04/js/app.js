// ==================
// Global variables
// ==================

var score = 0;
var level = 1;
var lives = 3;
var enemyY = [ 60, 150, 150 , 220, 220]
var playerImages = ['images/char-boy.png', 'images/char-cat-girl.png', 'images/char-horn-girl.png', 'images/char-pink-girl.png', 'images/char-princess-girl.png' ]
// var gemImages = ['images/Gem_Blue.png', 'images/Gem_Green.png', 'images/Gem_Orange.png'];
var heartCount = ['','<img src="images/Heart.png" alt="" width="50">','<img src="images/Heart.png" alt="" width="50"><img src="images/Heart.png" alt="" width="50">','<img src="images/Heart.png" alt="" width="50"><img src="images/Heart.png" alt="" width="50"><img src="images/Heart.png" alt="" width="50">']

function updateStatus() {
    document.getElementById("lives").innerHTML = heartCount[lives];

    if(lives <= 0 && level <= 10) {
        document.getElementById("gameover").style.display = 'block';
        document.querySelector('.overlay').style.display = 'block';
        document.getElementsByClassName('panel').style.display = 'none';
    }
    if(level === 6 && lives > 0)  {
         document.getElementById("youwin").style.display = 'block';
         document.querySelector('.overlay').style.display = 'block';
         document.getElementsByClassName('panel').style.display = 'none';
    }
}

function reload(){
    location.reload();
}

updateStatus();


// ==================
// Enemy function
// ==================


var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = enemyY[Math.floor(Math.random() * 4)];
    this.speed = Math.floor((Math.random()*200)+level*200);
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


// ==================
// Player function
// ==================

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(){
    this.sprite = playerImages[level-1]; 
    this.x = 200;
    this.y = 400;

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

Player.prototype.update = function(dt) {
    'use strict';

    var self = this;
    // Make sure the player doesn't go out of the canvas
    // left key pressed:
    if(this.direction === 'left' && this.x > 0) {
        this.x = this.x - 100;
    }

    //right key pressed:
    if(this.direction === 'right' && this.x < 400) { 
        this.x = this.x + 100;
    }

    //up key pressed:
    if(this.direction === 'up' && this.y > 0) {
        this.y = this.y - 90;
    }

    //down key pressed:
    if(this.direction === 'down' && this.y < 400) {
        this.y = this.y + 90;
    }

    this.direction = null;

    // reaches water
    if(this.y < 0) { 
    this.x = 0;
    this.y = 0;
    this.reset();
    score += 250;
    level += 1;
    updateStatus();
     // Each time level up, change character
    this.sprite = playerImages[level-1];
    }

// ==================
// Check collision
// ==================

    allEnemies.forEach(function(enemy) {
    if(self.x >= enemy.x - 50 && self.x <= enemy.x + 50) {
        if(self.y >= enemy.y - 50 && self.y <= enemy.y + 50) {
            self.reset();
            lives -= 1;
            updateStatus();
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
    this.direction = e;
};

//Reset player to beginning position
Player.prototype.reset = function() {
    'use strict';
   this.x = 200;
   this.y = 400;
};

// ==================
// Init
// ==================


var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var enemy4 = new Enemy();
var enemy5 = new Enemy();

var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5]; 

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
