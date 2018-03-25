/*
 * Create a list that holds all of your cards
 */


// let possibleCards = ['diamond', 'diamond', 'paper-plane-o', 'paper-plane-o','anchor','anchor',
// 'bolt','bolt','cube','cube','leaf','leaf','bicycle','bicycle','bomb','bomb'];
// icons from font-awesome


let possibleCards = ['beehive', 'beehive', 'beetle', 'beetle','bird','bird',
'horse','horse','panda','panda','pelican','pelican','penguin','penguin','seals','seals'];

// Global variables

const restart = $('.restart');
const moves = $('.moves');
const scorePanel = $('.score-panel');
const deck = $('.deck');
const numCards = possibleCards.length;
let opened = [];
let firstCard = opened[0];
let secondCard = opened[1];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


// Restart
restart.click(function() {
    startGame();
});


function startGame() {
  // Clear deck, shuffle the cards and put the cards
   deck.empty();
   shuffle(possibleCards);
  
   for(i=0;i<numCards;i++) {
        deck.append($('<li class="card"><img src="img/animal/' + possibleCards[i] + '.svg"/></li>'))
        // deck.append($('<li class="card"><i class="fa fa-' + possibleCards[i] + '"></i></li>'))
   };
  $(".card").click(function() { 
    $(this).addClass("open show animated tada")
  });
};

startGame();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */



function match() {
    firstCard.addClass("match");
    secondCard.addClass("match");
    firstCard.removeClass("show open");
    secondCard.removeClass("show open");  
    opened = [];
};


function unMatch() {
    firstCard.addClass("unmatch");
    secondCard.addClass("unmatch");
    firstCard.removeClass("show open");
    secondCard.removeClass("show open");  
    opened = [];
};



if(firstCard === secondCard) {
  match();
}

if(firstCard !== secondCard) {
  unMatch();
}






