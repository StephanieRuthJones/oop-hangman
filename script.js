// Create a Hangman class that represents the game logic
class Hangman {
    constructor(expected, guessCount) {
        this._state = {
            actual: "",
            expected: expected.toLowerCase(),
            guesses: guessCount,
            count: new Map(),
        };

        for (const [pos, letter] of [...this._state.expected.toLowerCase().split("").entries()]) {
            const value = this._state.count.get(letter);
            if (value !== undefined) {
                value.push(pos);
            } else {
                this._state.count.set(letter, [pos]);
            }
            this._state.actual += "*";
        }
    }
    // getPuzzle() is a method that returns a string that represents the current state of the puzzle
    getPuzzle() {
        return this._state.actual;
    }
    // getStatusMessage() is a method that returns a string that represents the current status message of the game
    getStatusMessage() {
        return this._state.guesses;
    }
    // makeGuess(guess) is a method that takes a single letter as a parameter and updates the game state accordingly
    makeGuess(guess) {
        if (this._state.guesses <= 0) return;

        for (const p of (this._state.count.get(guess) || [])) {
            this._state.actual = this._state.actual.substring(0, p) + guess + this._state.actual.substring(p + 1);
        }

        this._state.guesses--;
    }
    // calculateStatus() is a method that updates the status property based on the current state of the game
    calculateStatus() {

    }
}
// Define a global variable called hangman and assign it to a new instance of Hangman with a random word and a fixed number of guesses
// You can use any words you like, but make sure they are lowercase and have no special characters or numbers
// You can also use any number of guesses you like, but make sure it is reasonable for the difficulty level of your words
const hangman = new Hangman("javascript", 10);
// Define a function called render() that updates the puzzle and status paragraphs with their respective values from hangman.getPuzzle() and hangman.getStatusMessage()
function render() {
    document.querySelector("#puzzle").textContent = hangman.getPuzzle();
    document.querySelector("#status").textContent = `Remaining guesses: ${hangman.getStatusMessage()}`;
}
// Call render() once at the beginning of your script to display the initial state of the game to the player
render();
// Add an event listener to the window object that listens for the "keypress" event
window.addEventListener("keypress", ({ key }) => {
    // TODO: impl code
    hangman.makeGuess(key);
    render();
});