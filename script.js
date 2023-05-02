// Create a Hangman class that represents the game logic
class Hangman {
    constructor(expected, guessCount) {
        // if (guessCount < expected.length) throw new Error("Guess count must be greater than or equal to the length of the expected word");

        this._state = {
            actual: "",
            expected: expected.toLowerCase(),
            guesses: guessCount,
            count: new Map(),
        };

        for (const [position, letter] of [...this._state.expected.toLowerCase().split("").entries()]) {
            // NOTE: this could be done cleaner
            const value = this._state.count.get(letter);
            if (value !== undefined) {
                value.push(position);
            } else {
                this._state.count.set(letter, [position]);
            }
            this._state.actual += "*";
        }

        // throw error if guess count is less than the length of unique letters
        if (this._state.guesses < this._state.count.size) throw new Error("Guess count must be greater than or equal to the length of the expected word");
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

        for (const position of (this._state.count.get(guess.toLowerCase()) || [])) {
            this._state.actual = this._state.actual.substring(0, position) + guess.toLowerCase() + this._state.actual.substring(position + 1);
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
const hangman = new Hangman("javascript", 9);
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