window.onload = function(){
  draw = {};
  discard = {};
  var keys;
  function reset() {
    draw = {
      spades: [],
      hearts: [],
      clubs: [],
      diamonds: [],
      jokers: ['Joker','Joker']
    };
    discard = {
      spades: [],
      hearts: [],
      clubs: [],
      diamonds: [],
      jokers: ['Joker','Joker']
    };
    cards = [];
    for(var i = 2; i < 11; i++) {
      cards.push(i.toString());
    }
    cards.push('J', 'Q', 'K', 'A');
    draw.spades = cards;
    draw.hearts = cards;
    draw.clubs = cards;
    draw.diamonds = cards;
    keys = Object.keys(draw);
    document.getElementById('output').innerHTML = 'Click Draw to Draw a card';
    document.getElementById('output-card').classList.add('hide');
  }
  reset();


  // Add event listeners for buttons
  document.getElementById('draw-button').addEventListener('click', function(e) {drawCard()});
  document.getElementById('reset-button').addEventListener('click', function(e) {reset()});

  function drawCard() {
    let output = '';
    var suitInd; // Need to define here to pass to styling function
    var card;
    if (keys.length < 1) {
      output = 'No More Cards to Draw'
    } else {
      // Choose suit
      suitInd = Math.floor(Math.random()*keys.length);
      let suit = keys[suitInd];
      // Choose card from Suit
      let cards = draw[keys[suitInd]];
      card = cards[Math.floor(Math.random()*cards.length)];
      // Set Output = Card info
      if (card == 'Joker') {
        output = card;
      } else {
          output = card + ' of ' + suit;
      }
      // Add Card to Discard Object
      discard[keys[suitInd]].push(card);
      // Remove Card from Draw Pile
      if (keys[suitInd] == 'jokers') {
        draw[keys[suitInd]].pop();
      } else {
        draw[keys[suitInd]] = draw[keys[suitInd]].filter(el => el !== card);
      }
      // Update keys array for any empty suits
      for (let i = 0; i < keys.length; i++) {
        let suit = keys[i];
        if (draw[suit].length < 1) {
          keys = keys.filter(el => el !== suit)
        }
      }
    }
    document.getElementById('output').innerHTML = output;
    styling(keys[suitInd], card);
  }


  function styling(suit, card) {
    // Unhide Card
    document.getElementById('output-card').classList.remove('hide');
    // Icon styling
    let icon = '';
    let color = 'black';
    let icons = document.querySelectorAll('.card-icon');
    let center = document.getElementById('card-center');
    let playingCard = document.getElementById('output-card');
    switch(suit) {
      case 'spades':
        icon = '&#9824';
        break;
      case 'hearts':
        icon = '&#9829';
        color = 'red';
        break;
      case 'clubs':
        icon = '&#9827';
        break;
      case 'diamonds':
        icon = '&#9830';
        color = 'red';
        break;
      case 'jokers':
        icon = 'J';
        color = 'black';
    };
    // Insert and style Icons
    icons.forEach(e => {
      e.innerHTML = icon;
      e.classList.remove('black');
      e.classList.remove('red');
      e.classList.add(color);
    });
    // Insert and Style Text
    center.classList.remove('black');
    center.classList.remove('red');
    center.classList.add(color);
    center.innerHTML = card;
    // Add and remove animation class to card;
    playingCard.classList.add('card-animation');
    setTimeout(() => {playingCard.classList.remove('card-animation')}, 500);
  }
}
