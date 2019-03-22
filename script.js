window.onload = function(){
  deck = [];
  cards = [];
  cards.push('Joker');
  for(var i = 2; i < 11; i++) {
    cards.push(i.toString());
  }
  cards.push('Jack', 'Queen', 'King', 'Ace');
  for (var x = 0; x < 4; x++) {
    deck.push(cards);
  }



  document.getElementById('draw-button').addEventListener('click', function(e) {draw()});

  function draw() {
    var suits = ['&#9824;', '&#9829;', '&#9827;', '&#9830;']
    var suitInd = deck.indexOf(deck[Math.floor(Math.random()*deck.length)]);
    var suit = deck[suitInd];
    var cardInd = suit.indexOf(suit[Math.floor(Math.random()*suit.length)]);
    var output = suits[suitInd] + " " + suit[cardInd];
    document.getElementById('output').innerHTML = output;

    // Remove card from deck, for future draws
    console.log(suitInd, cardInd);
    console.log(deck[suitInd]);
    deck[suitInd].splice(cardInd,1);
    console.log(deck);
  }
}
