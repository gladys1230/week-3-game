/*  Kit Chan
Coding Bootcamp UT-Austin
Oct 2016 
Assignment week-3-game/ */

//Languages to Guess
var languages = ["mandarin", "spanish", "english", "hindi", "arabic", 
				 "portuguese", "russian", "japanese","german", "wu",
				 "korean", "malay","vietnamese","italian","xiang",
				 "odia", "yue", "dutch", "zulu", "mossi"];

//variables
var wins = 0;
var losses = 0;
var usedCharacters = [];
var lives = 5;
var currentWord = "";
var winWord = "";

//This function displays the hidden word with _
function updateHiddenWord()
{
		document.querySelector("#hiddenWord").innerHTML = " ";

//for each letter in the word
	for (var i = 0; i < currentWord.length; i++)
	{
		var displayCharacter = "_ ";
		//if this letter is in usedCharacters then display the letter otherwise display _
		
		//for each letter in usedCharacters
		for (var k = 0; k < usedCharacters.length; k++)
		{
			//if this letter in currentWord matches this letter in usedCharacters the display letter instead of _
			if (currentWord.charAt(i) === usedCharacters[k])
			{
				displayCharacter = usedCharacters[k] + " ";
			}
		}

		document.querySelector("#hiddenWord").innerHTML += displayCharacter;
	}
}

function setUpGame() 
{
	//Pick a random Language word
	currentWord = languages[Math.floor(Math.random() * languages.length)];
	updateHiddenWord();
	document.querySelector("#lives").innerHTML = lives;
	document.querySelector("#loss").innerHTML = losses;
	lives = 5;
	usedCharacters = [];
}
//initialize the game when the browser loads
window.onload = setUpGame();


//the playerWins function
function playerWins ()
{ 
	var playerWins = true;
	for (var i = 0; i < currentWord.length; i++)
	{

		//each character in currentWord, check if that character is in usedCharacters 
		var foundCharacter = false;
		for (var j = 0; j < usedCharacters.length; j++)
		{
		
			if (currentWord.charAt(i) === usedCharacters[j])
			{
				foundCharacter = true;
			}
		}

		//what happen if the character not in used? player has not win yet 
		if (foundCharacter === false)
		{
			playerWins = false;
		}
	} 

	//after all characters are filled
	return playerWins;
}

//Get player's input
document.onkeyup = function(event) 
{
	//make sure everything is lowrcase
	var eventInput = String.fromCharCode(event.keyCode).toLowerCase();

	//if the letter is not already in used letters add to used letters

	var foundCharacter = false;
	//for each letter in usedCharacters
	for (var j = 0; j < usedCharacters.length; j++)
	{
		//if eventInput matches this letter in usedCharacters
		if (eventInput === usedCharacters[j])
		{
			//found that Character
			foundCharacter = true;
		}
	}

	if (foundCharacter === false)
	{
		//Key press goes into useCharacters var
		usedCharacters.push(eventInput);

		if (currentWord.indexOf(eventInput) <= -1)
		{
			lives--;
			if (lives === 0)
			{
				losses++;
				document.getElementById("ohNoImage").src = "assets/images/ohNo.jpeg";
				setTimeout("ohNoImage",2000);
				var aww = new Audio("assets/sound/AWW.wav");
				aww.play();
				setUpGame();
			}
		}
	}

//checks the word that matches
	for (var j = 0; j < currentWord.length; j++)
	{
		if (eventInput === currentWord.charAt(j))
		{

		}
	}

	if (playerWins())
	{
		wins++;
		var yeah = new Audio("assets/sound/horray.wav");
		yeah.play();

		document.getElementById("winImage").src = "assets/images/winner.jpeg";
		setTimeout("winImage",2000);
		//<img id="winner-img" src="assets/images/winner.jpeg" alt="winner-image" width="200" height="200">
		winWord = "<p> You got it: " + currentWord + "</p>";
			document.querySelector("#winWord").innerHTML = winWord.toUpperCase();
		  setUpGame();
	}

//updates hidden word on keypress
//Order does matter, must upates first before showing the wrong character guessed
	updateHiddenWord();
	document.querySelector("#lives").innerHTML = lives;
	document.querySelector("#loss").innerHTML = losses;
	document.querySelector("#wins").innerHTML = wins;

//displays used letters with spaces 
	document.querySelector("#wrongGuess").innerHTML = " ";

	for (var i = 0; i < usedCharacters.length; i++)
	{
		//if the current word does not contain the same used character 
		if (currentWord.indexOf(usedCharacters[i]) <= -1)
		{
			document.querySelector("#wrongGuess").innerHTML += usedCharacters[i] + " ";
		}

	}
}





