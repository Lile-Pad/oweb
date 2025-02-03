import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface GameState {
  displayWord: string;
  guessesLeft: number;
  guessedLetters: Set<string>;
  result: string;
  isGameOver: boolean;
}

@Component({
  selector: 'app-hangman',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './hangman.component.html',
  styleUrl: './hangman.component.css'
})
export class HangmanComponent implements OnInit {
  private readonly WORDS = [
    "PLAIN", "RETRO", "GREAT", "VINYL", "VIDEO",
    "AUDIO", "CODED", "DREAM", "BOOKS", "DIGIT"
  ];
  private chosenWord: string = '';
  
  displayWord: string = '';
  guessesLeft: number = 6;
  guessedLetters: Set<string> = new Set();
  inputLetter: string = '';
  result: string = '';
  isGameOver: boolean = false;
  currentImage: string = '';
  
  readonly Array = Array;

  ngOnInit(): void {
    this.initializeGame();
  }

  private initializeGame(): void {
    this.chosenWord = this.WORDS[Math.floor(Math.random() * this.WORDS.length)];
    this.guessedLetters.clear();
    this.guessesLeft = 6;
    this.result = '';
    this.isGameOver = false;
    this.inputLetter = '';
    this.currentImage = 'assets/hangman/hangman-0.svg';
    

    const positions = new Set<number>();
    while (positions.size < 2) {
      positions.add(Math.floor(Math.random() * this.chosenWord.length));
    }
    
    this.updateDisplayWord(positions);
  }

  private updateDisplayWord(revealedPositions: Set<number>): void {
    this.displayWord = this.chosenWord
      .split('')
      .map((letter, index) => revealedPositions.has(index) ? letter : '_')
      .join(' ');
  }

  submitGuess(): void {
    if (!this.inputLetter || this.isGameOver) return;

    const guess = this.inputLetter.toUpperCase();
  
    if (guess.length === this.chosenWord.length) {
      if (guess === this.chosenWord) {
        this.displayWord = this.chosenWord;
        this.handleWin();
      } else {
        this.handleIncorrectGuess();
      }
    }
    else if (guess.length === 1) {
      if (this.guessedLetters.has(guess)) {
        this.result = "You already guessed that letter!";
        this.inputLetter = '';
        return;
      }

      this.guessedLetters.add(guess);
      
      if (this.chosenWord.includes(guess)) {
        const newRevealedPositions = new Set<number>();
        [...this.chosenWord].forEach((letter, index) => {
          if (letter === guess || this.displayWord[index * 2] !== '_') {
            newRevealedPositions.add(index);
          }
        });
        
        this.updateDisplayWord(newRevealedPositions);
        this.result = "Good guess!";
        
        if (!this.displayWord.includes('_')) {
          this.handleWin();
        }
      } else {
        this.handleIncorrectGuess();
      }
    }

    this.inputLetter = '';
  }

  private handleWin(): void {
    this.result = "Congratulations! You guessed the word!";
    this.isGameOver = true;
    setTimeout(() => this.showPlayAgainPrompt("You won!"), 500);
  }

  private handleIncorrectGuess(): void {
    this.guessesLeft--;
    this.currentImage = `assets/hangman/hangman-${6 - this.guessesLeft}.svg`;
    this.result = "Wrong guess!";
    
    if (this.guessesLeft === 0) {
      this.result = `Game over! The word was: ${this.chosenWord}`;
      this.isGameOver = true;
      setTimeout(() => this.showPlayAgainPrompt("Game over!"), 500);
    }
  }

  private showPlayAgainPrompt(message: string): void {
    if (confirm(`${message} Would you like to play again?`)) {
      this.initializeGame();
    }
  }
}