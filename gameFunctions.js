
//Author: Jared Lawson
//htmlGame
//This function handles writing the html for the game
function htmlGame() {

    //Game View Consists of Two CSS grid containers
    //First container holds two sub containers: game controls, and players
    //Second container holds a grid layout: cards currently in board
  
    //Write the divs for both grids
    htmlWriteGame();
  
    //Container One: First item is the game control buttons
    gameControllers();
  
  }
  
  //Author: Jared Lawson
  //htmlWriteGame
  //This function handles writing the grid layout for the game
  function htmlWriteGame() {
  
    //start tag of wrapper
    document.writeln("<div class=" + gameSections[0] + ">");
  
    //Creates each section of the game (starts at index 2)
    for (let k = 1; k < gameSections.length; k++) {
  
      //section start tag
      document.writeln("<div class=" + gameSections[k] + ">");
  
      //write each game control div
      htmlWriteGameControls(k);
  
      //section end tag
      document.writeln("</div>");
    }
  
  
    //end tag of wrapper
    document.writeln("</div>");
  }
  
  //Author: Jared Lawson
  //htmlWriteGameControls
  //This function writes the divs for each control
  function htmlWriteGameControls(k) {
  
    //size of each game control writes div
    for (let j = 0; j < gameControls[k].length; j++) {
      document.writeln("<div class=\"controllers\">" + gameControls[k][j] + "</div>");
    }
  }
  
  //Author: Jared Lawson
  //htmlGameControl
  //This function creates the eventListeners for game controls
  function gameControllers() {
  
    //create four buttons with event listeners and one item display
    //Buttons: Deal, Hint, New Game, Quit
    //Display: Cards Remaining
    let gameDivs = document.getElementsByClassName("gameControls");
    console.log(gameDivs.item(0));
    console.log(gameDivs.item(0).style);
    console.log(gameDivs.item(0).style.gridColumnStart);
  
    let gameButtons = gameDivs.item(0); //grabs the game control div
    let gameStyle = gameDivs.item(0).style; //grabs the styling for game
  
    //set up the html buttons
    for (let k = 0; k < gameButtons.childElementCount; k++) {
  
      let buttonName = gameControls[1][k];
      //create the buttons by changing innerHtml of each div
      gameButtons.children.item(k).innerHTML =
        "<button class=\"gameButtons\">" + buttonName + "</button>";
    }
  
    //returns list of game buttons (5)
    let gameButt = document.getElementsByClassName("gameButtons");
  
    //a list of functions used to link buttons to functions
    let functions = [deal, hint, newGame, quit, deckLeft];
  
    //add event listeners to each button
    for (let k = 0; k < gameButt.length; k++) {
      gameButt[k].addEventListener(
        "click",
        functions[k],
        false);
    }
  }
  
  ////////////////////////////////////////////////////////////// END OF STYLING SETUP CODE ////////////////////////////////////////////////////////////////////////
  
  /*code for Deal button*/
  function deal() {
    if (!gameGoing) {
      gameGoing = true;
      startGame();
      start();
    }
  }
  
  /*code for Hint button*/
  function hint() {
    if (gameGoing) {
      //prevent clicking hint in the middle of a turn
      if (set.length == 0) {
  
        /*if there is a set on the board, describe 2 cards*/
        if (setsExist()) {
          window.alert("A set is on the board! Card description below\n\n" +
            board[set[0]].number + " " + board[set[0]].color + " " + board[set[0]].texture + " " + board[set[0]].shape +
            "\n" + board[set[2]].number + " " + board[set[2]].color + " " + board[set[2]].texture + " " + board[set[2]].shape);
          set = [];
  
          /*if there is no set on the board*/
        } else {
          window.alert("No sets exist.");
          addBoardDraw();
          gameCardControllers();
          set = [];
        }
      } else {
        window.alert("You have already started selecting a set! Unselect cards or finish your turn.");
  
      }
    } else {
      window.alert("You need to start a game before you can get a hint! Please hit Deal");
  
    }
  }
  
  /*code for newGame button*/
  function newGame() {
    if (!gameGoing) {
      window.alert("You need to start a game before you can do a new one! Please hit Deal");
    } else {
      deck = [];
      set = [];
      board = [];
      for (let i = 0; i < players.length; i++) {
        players[i].score = 0;
      }
      create();
      board = draw(12);
      playerIndex = 0; // do we still use this?
      gamePlayerControllers();
      gameCardControllers();
      start();
    }
    //function resets only deck and its board
    //continue playing game with same players
  }
  
  /*code for quit button*/
  function quit() {
    if (!gameGoing) {
      window.alert("You need to start a game before you can quit! Please hit Deal");
    } else {
    end();
    endGame();
    gameGoing = false;
    deck = [];
    set = [];
    players = [];
    board = [];
    gamePlayerControllers();
    gameCardControllers();
    // function resets EVERYTHING to basic
  }
  }
  
  /*code for Deck button*/
  function deckLeft() {
    if (!gameGoing) {
      window.alert("You need to start a game before you can know how many cards are left! Please hit Deal");
    } else {
    window.alert("Cards left:" + deck.length);
    }
  }
  
  
  //Author: Jared Lawson
  //htmlGamePlayers
  //This function creates the grid of html game controls
  function gamePlayerControllers() {
  
    let playerDivs = document.getElementsByClassName("players");
  
    console.log(playerDivs);
    console.log(playerDivs.item(0));
  
    console.log(players);
    console.log(players[0]);
  
    //allows us to edit the players div obj
    let playerName = playerDivs.item(0);
  
    let playerHtml = htmlPlayerDivs(players.length);
    //update the html with all player names and scores
    playerName.innerHTML = playerHtml;
  }
  
  //Author: Jared Lawson
  //htmlPlayerDivs
  //This function handles creating the necessary number of divs based on num players
  function htmlPlayerDivs(divLength) {
  
    let answer = "";
  
    for (let k = 0; k < divLength; k++) {
      answer += "<div class=player>" + players[k].fname + "<br>" + players[k].score + "</div>\n";
    }
  
    console.log(answer);
    return answer;
  }
  
  //Author: Jared Lawson
  //htmlGameCards
  //This function creates the controls for cards
  function gameCardControllers() {
  
    //create card view
    game_view();
  
    //create button assignment
    button_assignment();
  }
  
  // function to call what is needed for intial start of game
  function startGame() {
    //let deck = [];
    create();
  
    /* draw(12) cards */
    board = draw(12);
  
    /*get players for the game*/
    get_players();
  
    gamePlayerControllers();
    let num = 0;
  
    playerIndex = 0; //pretty darn close to playerTurn but same diff lol |:)
  
    gameCardControllers();
  }
  
  /* takes in current array and embedds it into HTML */
  function game_view() {
  
    let cardDivs = document.getElementsByClassName("cardWrapper");
    console.log(cardDivs);
    console.log(cardDivs.item(0));
  
    //grabs the cardWrapper div
    cardDivs = cardDivs.item(0);
  
    for (let k = 0; k < cardDivs.childElementCount; k++) {
      if (k > board.length - 1) {
        cardDivs.children.item(k).innerHTML = "";
      } else {
        board[k].position = k;
        //window.alert(board[i].position);
        cardDivs.children.item(k).innerHTML =
          "<button id=\"" + k + "\"class=\"card\"><img src=\"" + board[k].image + "\"></button>";
      }
    }
  }
  
  
  /* states if there is a set on the board */
  function setsExist() {
    // check every combination of 3 cards from the dealt cards
    isSet = false;
    // make an array of all combinations, as arrays
    choices = combination(3);
  
    // check every combination for set correctness
    for (var i = 0; i < choices.length; i++) {
      /*intialize set*/
      set = [];
  
      /*put positions into set variable*/
      for (var j = 0; j < 3; j++) {
        pos = (choices[i][j].position);
        set[j] = pos;
      }
  
      /*if a set is found, return true*/
      if (correct()) {
        isSet = true
        return isSet;
      }
    }
  
    return isSet;
  }
  
  /*generates all combinations of an array of k length*/
  /*writen with help from stackexchange.com and Sery Gunawardena*/
  function combination(k) {
    combi = [];
    letLen = Math.pow(2, board.length);
  
    for (var i = 0; i < letLen; i++) {
  
      temp = [];
  
      for (let j = 0; j < board.length; j++) {
  
        if (i & (Math.pow(2, j))) {
          temp.push(board[j]);
        }
      }
  
      if (temp != []) {
  
        combi.push(temp)
      }
    }
  
    results = [];
  
    for (var r = 0; r < combi.length; r++) {
  
      /*remove the array if it is not the correct length*/
      if (combi[r].length == 3) {
  
        results.push(combi[r]);
      }
  
    }
  
    return results;
  }

  
/*prompts user for the number and names of players*/
function get_players() {
    let numPlayers = window.prompt("How many players will be playing the game?");
  
    /*correction if they don't enter a number*/
    if (isNaN(numPlayers) || (numPlayers==null) || (numPlayers ==0)) {
      while (isNaN(numPlayers) || (numPlayers==null) || (numPlayers ==0)) {
        numPlayers = window.prompt("Must be a number greater than 0. How many players will be playing the game?")
      }
    }
  
    let i = 1;
    while (i <= numPlayers) {
      /*prompt user for player names*/
      let name = window.prompt("What is player #" + i + "'s name?");
  
      /*make a new player object*/
      var player = {
        fname: name,
        score: 0
      };
  
      /*add to array of players*/
      players.push(player);
      i++;
    }
  }
  
  /*adds event listeners to all buttons*/
  function button_assignment() {
  
    //returns all the card divs
    let cardButtons = document.getElementsByClassName("card");
    //let ids = document.getElementsByClassName("card").getElementById;
    for (let k = 0; k < cardButtons.length; k++) {
      cardButtons[k].addEventListener(
        "click",
        function() {
          var htmlElement = this;
          cardButton(htmlElement);
        },
        false);
    }
  }
  
  //Author: Jared Lawson
  //cardButton
  //This function creates the functionality of the card buttons
  function cardButton(obj) {
  
    //all buttons use this activation if clicked turned green, clicked again gray
    obj.activated = obj.activated || false;
    obj.activated = !obj.activated;
    obj.style.borderColor = (obj.activated ? "green" : "grey");
  
    //calls function that handles incrementing/decrementing count based on activation
    countSet(obj);
  
  
    if (count >= 3) {
      //if number of cards selected is 3 or somehow greater call func to handle
      cardSelectionReset();
    }
  }
  
  //Author: Jared Lawson
  //countSet
  //This function handles incrementing and decrementing the number of cards selected
  function countSet(objVal) {
  
    //if true, increment count add selected id, else decrement count del selected id
    if (objVal.activated) {
      count++;
      set.push(parseInt(objVal.id));
    } else {
      count--;
      //delete set[parseInt(objVal.id)];
      set.splice(set.indexOf(parseInt(objVal.id)), 1);
    }
  }
  
  //Author: Jared Lawson
  //cardSelectionReset
  //This function handles resetting the card elements after a selection has been completed
  function cardSelectionReset() {
  
    //reset count
    count = 0;
  
    //reset cards select
    let cardButtons = document.getElementsByClassName("card");
  
    //this loop turns all the activated cards back to null
    for (let k = 0; k < cardButtons.length; k++) {
      if (cardButtons[k].activated) {
        cardButtons[k].activated = false;
        cardButtons[k].style.borderColor = "grey";
      }
    }
  
    //call function that checks if the selection was correct
    checkSet();
  }
  
  /*check a selection of cards for correctness*/
  function checkSet() {
  
    var time = end();
  
    if (correct()) {
  
      //update players score
      players[playerIndex].score++;
  
      //alert player to their choice
      window.alert(players[playerIndex].fname + " found a set! Score is " + players[playerIndex].score + "\n" + "that took " + time + " seconds");
  
      //delete set selected
      deleteBoardSet();
  
      //draw (3) more cards to add to the board
      addBoardDraw();
  
      //update the buttons/player panel
      gameCardControllers();
      gamePlayerControllers();
  
    } else {
  
      //alert player to their choice
      window.alert("Selected set was incorrect\n" + "that took " + time + " seconds"); //new
  
    }
  
    start();
    //empty set selection
    set = [];
  
    //increment playerIndex (being used to track playerTurn)
    playerIndex = (playerIndex + 1) % players.length;
  
  }
  
  /* takes the board array and deletes the cards that are found as a set */
  function deleteBoardSet() {
  
    //if the set is correct you will always delete them from board
    set.sort(function(a, b) {
      return a - b
    });
    board.splice(set[2], 1);
    board.splice(set[1], 1);
    board.splice(set[0], 1);
  
  }
  
  // draws and deals 3 cards to the gameboard only if the deck has enough cards
  function addBoardDraw() {
  
    if (deck.length >= 3) {
      let card = draw(3);
      board.push(card[2]);
      board.push(card[1]);
      board.push(card[0]);
    } else if (!setsExist()) { //if the deck is empty when trying to add cards check that a set exists if none does end game
      quit();
    }
  }
  
  //Author: Jared Lawson
  //endGame
  //This function declares a winner after there are no more sets available or user quits/new game
  function endGame() {
    //builds the string of players and their scores
    let stringPlayers = "";
    for (let i = 0; i < players.length; i++) {
      stringPlayers += players[i].fname + ": " + players[i].score + "\n";
    }
  
    //alert players of their scores and what to do next
    window.alert("Game Over! Final scores\n\n" + stringPlayers + "\nSelect Deal to play again!");
  
  }
  
  /*create the deck of cards*/
  function create() {
    const numbers = [1, 2, 3];
    const textures = ["empty", "filled", "striped"];
    const shapes = ["diamond", "oval", "tilde"];
    const colors = ["blue", "green", "red"]
    let images = [];
    /* populates array of image links */
    for (let c = 0; c < colors.length; c++) {
      for (var i = 1; i < 28; i++) {
        images.push("SetDeckImages/" + colors[c] + "Card" + i + ".png");
      }
    }
    /* populates deck with cards and their attributes for comparing */
    for (let c = 0; c < colors.length; c++) {
      for (let t = 0; t < textures.length; t++) {
        for (let s = 0; s < shapes.length; s++) {
          for (let n = 0; n < numbers.length; n++) {
            var card = {
              number: numbers[n],
              texture: textures[t],
              shape: shapes[s],
              color: colors[c]
            };
            deck.push(card);
          }
        }
      }
    }
    /* add image links to card object */
    for (var i = 0; i < images.length; i++) {
      deck[i].position = 0;
      deck[i].image = images[i];
    }
  }
  
  /* randomly takes out n amount of cards from deck, returns an array of drawn cards */
  function draw(n) {
    var drawn = [];
    /* n random numbers from 0 to deck.length-1 */
    for (let i = 0; i < n; i++) {
      randomNumber = Math.floor(Math.random() * deck.length);
      /* find card at randomNumber and extract it, saving in drawn array */
      let card = deck.splice(randomNumber, 1);
      drawn.push(card[0]);
    }
    return drawn;
  }
  
  /*checks the correctness of three selected cards*/
  function correct() {
    let card1 = board[set[0]];
    let card2 = board[set[1]];
    let card3 = board[set[2]];
  
    let texture_check = false;
    let color_check = false;
    let shape_check = false;
    let number_check = false;
  
    // Check Texture
    if (((card1.texture == card2.texture) && (card1.texture == card3.texture) && (card2.texture == card3.texture)) ||
      ((card1.texture != card2.texture) && (card1.texture != card3.texture) && (card2.texture != card3.texture))) {
  
      texture_check = true;
      //window.prompt ("texture" + texture_check);
    }
  
    // Check Color
    if (((card1.color == card2.color) && (card1.color == card3.color) && (card2.color == card3.color)) ||
      ((card1.color != card2.color) && (card1.color != card3.color) && (card2.color != card3.color))) {
  
      color_check = true;
      //window.prompt("color" +color_check);
    }
  
    // Check Shape
    if (((card1.shape == card2.shape) && (card1.shape == card3.shape) && (card2.shape == card3.shape)) ||
      ((card1.shape != card2.shape) && (card1.shape != card3.shape) && (card2.shape != card3.shape))) {
  
      shape_check = true;
      //window.prompt("shape" +shape_check);
    }
  
    // Check Number
    if (((card1.number == card2.number) && (card1.number == card3.number) && (card2.number == card3.number)) ||
      ((card1.number != card2.number) && (card1.number != card3.number) && (card2.number != card3.number))) {
  
      number_check = true;
      //window.prompt("number"+number_check);
    }
  
    // returns a boolean
    is_correct = (texture_check && color_check && shape_check && number_check);
  
    return is_correct
  }
  
  
//Author: Jared Lawson
//exampleSetAddEvent
//This function adds event listeners to the button classes exampleSet
function exampleSetEvents() {

  //Returns a list of elements with class name example Set (4)
  let example = document.getElementsByClassName("exampleSet");

  //adds event listeners to each button
  for (let k = 0; k < example.length; k++) {
    example[k].addEventListener(
      "click",
      function() {
        var htmlElement = this;
        exampleSetSelection(htmlElement);
      },
      false);
  }
}

//Author: Jared Lawson
//exampleSetSelect
//This function handles event selection
function exampleSetSelection(obj) {

  //first example shouldn't impact the exampleCount
  let firstExample = 0;

  //all examples use this activation if clicked turned green, clicked again gray
  obj.activated = obj.activated || false;
  obj.activated = !obj.activated;
  obj.style.borderColor = (obj.activated ? "green" : "grey");

  //the first example should not effect the exampleCount
  if (obj.id != firstExample) {
    //if this.activated is true, increment count, else decrement count
    countExampleSet(obj.activated);
  }

  //if all cards selected congrats user and reset borders
  if (exampleCount >= 3) {
    //call function to handle when the whole set selected
    exampleTwoReset();
  }
}

//Author: Jared Lawson
//countExampleSet
//This function handles incrementing/decrementing exampleCount
function countExampleSet(boolValue) {

  //if true, increment exampleCount, else decrement exampleCount
  if (boolValue) {
    exampleCount++;
  } else {
    exampleCount--;
  }
}

//Author: Jared Lawson
//resetExampleTwo
//This function handles reseting the example two cards
function exampleTwoReset() {

  //grab all the exampleSet buttons used when needing to reset example two
  let example = document.getElementsByClassName("exampleSet");

  //this loop turns exampleTwo back to gray after selecting the correct set
  for (let k = 1; k < example.length; k++) {
    //reset border to gray and set activated to false
    example[k].style.borderColor = "grey";
    example[k].activated = false;
  }

  //alert player they selected a correct match!
  window.alert("Correct set match! Congrats!");

  //reset the number of selected examples back to zero
  exampleCount = 0;
}
