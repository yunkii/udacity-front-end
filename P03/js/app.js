// ============================================
// List of possible cards
// ============================================


let baseCards = ['beehive', 'koala', 'bird', 'tiger','panda','pelican','penguin','seals'];

let possibleCards = baseCards.concat(baseCards);

// ============================================
// Global Variables
// ============================================

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



// ============================================
// Shuffle
// source: http://stackoverflow.com/a/2450976
// ============================================

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

// ============================================
// Init the Game
// :: clear deck, init variables, shuffle cards and put them back on
// ============================================


function initGame() {
   $('.overlay').hide();
    // congrats();
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
   
   // $('.animal-title').empty().append($('<img src="img/animal/'+possibleCards[10]+'.svg" alt="" width="70">'));

   for(i=0;i<numCards;i++) {
        $('.deck').append($('<li class="card"><img src="img/animal/' + possibleCards[i] + '.svg"/></li>'));
   };





// ============================================
// Set up event listener
// ============================================

  $(".card" ).click(function() {

    if ($(this).hasClass('show')){
      return; // exit function if the card is already opened.
    }

    $(this).addClass('show animated flipInY');

    let currentCard = $(this).context.innerHTML;
    opened.push(currentCard);


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


initGame();


// ============================================
// Match + Unmatch function
// ============================================


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
  setTimeout(function(){
    $('.unmatch').removeClass().addClass('animated flipInY card');
  }, 600);
};


// ============================================
// Timer
// ============================================


function twoDigits(number) {
       return (number < 10 ? '0' : '') + number;
}

  let seconds = 0;
  let minutes = 0;

function timer() {
      seconds ++;
      
      // if(seconds = 60) {
      //   seconds = 0;
      //   minutes ++;
      // }

      $( ".timer-seconds" ).text(twoDigits(seconds));
}



// ============================================
// Restart
// ============================================

$('.restart').click(function() {
    initGame();
});


// ============================================
// StarCount
// ============================================

function starCount() {

  if(numMoves < 20) {
      numStars = 3;
    }else if (numMoves >= 20 && numMoves < 25) {
      numStars = 2;
    }else {
      numStars = 1;
    };

   $('.stars').empty().append(showStar[numStars-1]);
};



//   MoveCount

function moveCount(){
  $( ".moves" ).text(numMoves);
}


//   MatchCount

function matchCount(){
  $( ".matches" ).text(numMatch);
}


// ============================================
// Congrats Message
// ============================================


const finishImg = ['seals', 'penguin','tiger'];
const finishMsg = ['Oh man... even a seal can do better','Good Job, Pal! Well done','Geez, That\'s amazing!'];


function congrats() {

  setTimeout(function(){
      $('.msg').empty().prepend($('<h2>' + finishMsg[numStars-1] + '</h2>'));
      $('.msg').prepend($('<img src="img/animal/' + finishImg[numStars-1] + '.svg" alt="" width="300">'));
      $('.overlay-content').addClass('animated bounceIn')
  }, 100);

  setTimeout(function(){
      $('.overlay').fadeIn(100);
  }, 300);

};

