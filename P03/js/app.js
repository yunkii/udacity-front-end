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
const scorePanel = $('.score-panel');
const numCards = possibleCards.length;
let opened = [];
let numStars = 3;
let numMoves = 0;
let numMatch = 0;

const showStar = ['<li><i class="fa fa-star-o"></i></li><li><i class="fa fa-star-o"></i></li><li><i class="fa fa-star-o"></i></li>', // 0 star
                  '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star-o"></i></li><li><i class="fa fa-star-o"></i></li>',  // 1 star
                  '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star-o"></i></li>',  // 2 stars
                  '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>' // 3 stars
                 ];








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




function startGame() {
  // Clear deck, shuffle the cards and put the cards
   $('.deck').empty();
   shuffle(possibleCards);
   opened = [];
   numMoves = 0;
   numStars = 3;
   numMatch = 0;


   $( ".moves" ).text(numMoves);

   for(i=0;i<numCards;i++) {
        $('.deck').append($('<li class="card"><img src="img/animal/' + possibleCards[i] + '.svg"/></li>'))
   };

   $('.stars').empty().append(showStar[numStars]);


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

    $(this).addClass('show');
    let currentCard = $(this).context.innerHTML;
    opened.push(currentCard);

    // when click the second card of the pair
    if(opened.length > 1) {
      if(currentCard === opened[0]) {
        numMoves++;
        numMatch++;
        opened = [];
        $('.show').addClass('match animated flip');
        $('.show').removeClass('');
      }else {
        numMoves++;
        opened = [];
        $('.show:not(.match').removeClass().addClass('card show unmatch animated shake');
        $('.unmatch').delay(600).queue(function(){$('.unmatch').removeClass().addClass('card')});
      }
    }

    $( ".moves" ).text(numMoves);
    starCount();


  });



};




startGame();

// Restart
restart.click(function() {
    startGame();
});




function starCount() {

  if(numMoves < 10) {
      numStars = 3;
    }else if (numMoves >= 10 && numMoves < 15) {
      numStars = 2;
    }else {
      numStars = 1;
    };

   $('.stars').empty().append(showStar[numStars]);
  };





