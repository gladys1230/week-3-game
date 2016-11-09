//languages to guess
var languages = ["mandarin", "spanish", "english", "hindi", "arabic", 
				 "portuguese", "russian", "japanese","german", "wu",
				 "korean", "malay","vietnamese","italian","xiang",
				 "odia", "yue", "dutch", "zulu", "mossi"];

//scores
var wins = 0;
var losses = 0;
var usedCharacters = [];
var lives = 5;
var currentWord = "";
var winWord = "";

function setupGame()
{
	console.log("I speak a stupid language");
	//this is the part randomly pick from the languages Array
	currentWord = languages[Math.floor(Math.random() * languages.length)];
	console.log(currentWord);
	updateHiddenCharacter();
	document.getElementById("lives").innerHTML = lives;
	document.getElementById("loss").innerHTML = losses;
	lives = 5;
	usedCharacters = [];
}

//initilize the game when the window loads up
window.onload = setupGame();

//display hidden word with _
function updateHiddenCharacter()
{
	document.getElementById("hiddenWord").innerHTML = " ";

	for(var i = 0; i < currentWord.length; i++)
	{
		//each letter is _ unless they are replaced with a letter
		var displayLetter = " _ ";

		for(var j = 0; j < usedCharacters.length; j++)
		{
			if(currentWord.charAt(i)=== usedCharacters[j])
			{
				displayLetter = usedCharacters[j] + " ";
			}
		}
		document.getElementById("hiddenWord").innerHTML +=displayLetter;
	}
	console.log("updatewordtesting");
}

//the playerWins function
function playerWins()
{
	var playerWins = true;
	for(var i = 0; i < currentWord.length; i++)
	{
		//each character in currentWord, check if that character is in usedCharacters 
		var foundCharacter = false;
		for(j = 0; j < usedCharacters.length; j++)
		{
			if(currentWord.charAt(i) === usedCharacters[j])
			{
				foundCharacter = true;
			}
		}
		//what if the character not in used character? haha, player has not win yet
		if(foundCharacter === false)
		{
			playerWins = false;
		}
	}
	return playerWins; //after all characters are found
}


//player Input
document.onkeyup = function(event)
{
	//Need Help!!!
	var eventInput = String.fromCharCode(event.keyCode).toLowerCase();
	console.log("eventInput " + eventInput);

	var foundCharacter = false;

	for(var i = 0; i < usedCharacters.length; i++)
	{
		//if eventInput matches the character in usedCharacter
		if (eventInput === usedCharacters[i])
		{
			foundCharacter = true;
			
		}

	}
	console.log(foundCharacter);

	var showWrongCharacters = function()
	{	//the following 2 lines need to be fixed
		
		var usedCharactersNotInWord = usedCharacters.filter(function(c){ return currentWord.indexOf(c) === -1})
		
		var wrongCharacter = "<p> Wrong Character Guessed: " + usedCharactersNotInWord + "</p>";
		document.querySelector("#wrongGuess").innerHTML = wrongCharacter;
	}

	if(foundCharacter === false)
	{
		usedCharacters.push(eventInput);
		console.log(usedCharacters);//show the wrong character
		showWrongCharacters();

		if(currentWord.indexOf(eventInput) <= -1)
		{
			lives--;

			if (lives === 0)
			{
				losses++;

				setupGame();
			}
		}
	}

	//check word that matches
	for(var i = 0; i < currentWord.length; i++)
	{
		if(eventInput === currentWord.charAt(i))
		{
			console.log("Dude, I found that Character, Blah!");
		}
		if (playerWins())
		{
			wins++;
			winWord = "<p> The Language is: " + currentWord + "</p>";
			console.log(winWord);
			document.querySelector("#winWord").innerHTML = winWord;


			setupGame();
		}

		//gets the hidden word on keypress, haha, no wonder I did not see anything from the screen
		updateHiddenCharacter();
		document.getElementById("lives").innerHTML = lives;
		document.getElementById("loss").innerHTML = losses;
		document.getElementById("wins").innerHTML = wins;
	}
}


