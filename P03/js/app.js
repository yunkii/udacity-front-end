// ========
// List of possible cards
// ========

let possibleCards = ['beehive', 'beehive', 'beetle', 'beetle','bird','bird',
'horse','horse','panda','panda','pelican','pelican','penguin','penguin','seals','seals'];

// ========
// Global Variables
// ========

const numCards = possibleCards.length;
const totalPairs = numCards /2;
let opened = [];
let numStars = 3;
let numMoves = 0;
let numMatch = 0;

const showStar = ['<li><i class="fa fa-star"></i></li><li><i class="fa fa-star-o"></i></li><li><i class="fa fa-star-o"></i></li>',  // 1 star
                  '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star-o"></i></li>',  // 2 stars
                  '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>' // 3 stars
                 ];



// ========
// Given Shuffle function
// source: http://stackoverflow.com/a/2450976
// ========

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

// ========
// Star Game
// :: clear deck, init variables, shuffle cards and put them back on
// ========


function startGame() {

   $('.deck').empty();
   shuffle(possibleCards);
   opened = [];
   numMoves = 0;
   numStars = 3;
   numMatch = 0;

  setInterval(timer, 1000);
   moveCount();
   starCount();
   matchCount();

   for(i=0;i<numCards;i++) {
        $('.deck').append($('<li class="card"><img src="img/animal/' + possibleCards[i] + '.svg"/></li>'))
   };


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


 $(".card:not(.match,.show)").click(function() {

    $(this).addClass('show animated flipInY');

    let currentCard = $(this).context.innerHTML;
    opened.push(currentCard);


    // verified match / unmatch

    if(opened.length > 1) {
      if(currentCard === opened[0]) {
        match();
      }else {
        unmatch();
      }
    };

    moveCount();
    starCount();
    matchCount();


    if(numMatch === totalPairs ) {
      congrats();
    }


  });

};


startGame();


// ========
// Match + Unmatch
// ========

function match() {
  numMoves++;
  numMatch++;
  opened = [];
  $('.show').addClass('match animated flip');
  $('.show').removeClass('.show');

};


function unmatch() {
  numMoves++;
  opened = [];
  $('.show:not(.match)').removeClass().addClass('card show unmatch animated shake');
  $('.unmatch:not(.match)').delay(600).queue(function(){$('.unmatch:not(.match)').removeClass().addClass('card')});
};


// ========
// Timer
// ========



// function seconds() {
//     setInterval(timer, 1000);

// }



function timer() {
let seconds = 0;
let minutes = 0;
seconds++;

if(seconds === 60) {
  seconds = 0;
  minutes ++;
}
$( ".timer-seconds" ).text(seconds);
$( ".timer-minutes" ).text(minutes);

}


// function seconds() {
// seconds++;
//   $( ".timer-seconds" ).text(seconds);
// };

// ========
// Restart
// ========

$('.restart').click(function() {
    startGame();
});


// ========
// StarCount
// ========

function starCount() {

  if(numMoves < 10) {
      numStars = 3;
    }else if (numMoves >= 10 && numMoves < 15) {
      numStars = 2;
    }else {
      numStars = 1;
    };

   $('.stars').empty().append(showStar[numStars-1]);
};


// ========
// MoveCount
// ========


function moveCount(){
  $( ".moves" ).text(numMoves);
}


// ========
// MatchCount
// ========

function matchCount(){
  $( ".matches" ).text(numMatch);
}

// ========
// Congrats Message
// ========


function congrats() {
   $('.congrats').slideDown();
};


