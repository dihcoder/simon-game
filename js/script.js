// HERE I CREATE AN OBJECT WITH THE ELEMENTS AND AUDIOS THAT I'LL USE
const gameComponents = {
	title: document.querySelector('h1'),
	background: document.querySelector('body'),
	buttons: document.querySelectorAll('.btn'),
	btnsNames: ['green', 'red', 'yellow', 'blue'],
	thisBtn: {
		green: document.querySelector('.btn.green-btn'),
		red: document.querySelector('.btn.red-btn'),
		yellow: document.querySelector('.btn.yellow-btn'),
		blue: document.querySelector('.btn.blue-btn')
	},
	sounds: {
		green: '../sounds/green.mp3',
		red: '../sounds/red.mp3',
		yellow: '../sounds/yellow.mp3',
		blue: '../sounds/blue.mp3',
		wrong: '../sounds/wrong.mp3'
	}
}

// HERE'S ANOTHER OBJECT TO KEEP TRACK OF THE GAME
const gameStatus = {
	userLevel: 0,
	sequence: [],
	userClick: null,
	userKeydown: null,
	running: false
}

// THIS IS KIND OF A JOKE
// I tried to implement an object's property, but I couldn't put it to work. so I ended up declaring this variable -só de raiva-
let juju = 0;

// HERE IS A FUNCTION TO MAKE THE SOUND ACCORDING TO A STRING
// IT'S INPUT VALUES CAN BE: green, red, yellow, blue or wrong
function makeSound(sound) {
	var audio = new Audio(gameComponents.sounds[`${sound}`]);
	audio.play()
}

// HERE'S A FUNCTION TO SORT THE NEXT BUTTON
function playTheGame() {
	const random = Math.floor(Math.random() * 4);

	const sortedBtn = gameComponents.btnsNames[random];

	gameStatus.sequence.push(sortedBtn);

	setTimeout(() => {
		animate(sortedBtn);
		makeSound(sortedBtn);
	}, 1000);

	juju = 0;
}

// HERE IS ANOTHER FUNCTION TO TOGGLE CLASSES OF THE HTML ELEMENTS
// IT USES THE SAME INPUTS AS 'makeSound' FUNCTION
function animate(what) {

	if (what === 'wrong') {

		gameComponents.background.classList.add('error');

		setTimeout(() => {
			gameComponents.background.classList.remove('error');
		}, 100)
	}

	else {
		gameComponents.thisBtn[`${what}`].classList.add('current');

		setTimeout(() => {
			gameComponents.thisBtn[`${what}`].classList.remove('current');
		}, 100);
	}
}

// NOW IT IS THE KEYDOWN EVENT LISTENER APPLIED TO ALL THE DOCUMENT
document.addEventListener('keydown', (keydown) => {
	gameStatus.userKeydown = keydown.key.toUpperCase();

	if (gameStatus.running === false && gameStatus.userKeydown === 'A') {

		gameStatus.userLevel = 1;
		gameStatus.running = true;
		gameComponents['title'].textContent = `Level ${gameStatus.userLevel}.`;
		playTheGame();
	}
})

// HERE'S THE CLICK EVENT LISTENER APPLIED TO THE BUTTONS
gameComponents.buttons.forEach((btn) => {
	btn.addEventListener('click', () => {
		var clickedBtn = btn.classList[1].slice(0, btn.classList[1].length - 4);

		gameStatus.userClick = clickedBtn;
		makeSound(clickedBtn);
		animate(clickedBtn);

		// THE MAGIC HAPPENS HERE
		// THIS WAS THE WORST PICE OF CODE TO BUILD. I WAS TRYING TO USE A LOOP (AND NOW I DON'T KNOW HOW IT WOULD WORKS)
		// BASICLY, THIS CONDITION CHECKS IF THE USER CLICKED THE WRITE BUTTON, AND IF SO, IT CHANGES THE 'gameStatus' OBJECT PROPERTIES AND CALLS THE FUNCTION 'playTheGame'
		if (gameStatus.userClick === gameStatus.sequence[juju] && juju < gameStatus.sequence.length - 1 && gameStatus.running === true) {

			juju++;
		}

		else if (gameStatus.userClick === gameStatus.sequence[juju] && juju === gameStatus.sequence.length - 1 && gameStatus.running === true) {

			juju = 0;
			gameStatus.userLevel++;
			gameComponents['title'].textContent = `Level ${gameStatus.userLevel}.`;
			playTheGame();

		} else {

			juju = 0;
			gameStatus.userLevel = 0;
			gameStatus.sequence = [];
			gameStatus.running = false;
			animate('wrong');
			makeSound('wrong');
			gameComponents['title'].textContent = `Game Over! Press 'A' to Restart the Game`;
		}
	})
})