import {useState} from "react";
import "./Hangman.css";
import img0 from  "./assets/0.jpg"
import img1 from  "./assets/1.jpg"
import img2 from  "./assets/2.jpg"
import img3 from  "./assets/3.jpg"
import img4 from  "./assets/4.jpg"
import img5 from  "./assets/5.jpg"
import img6 from  "./assets/6.jpg"
import {randomWord} from "./words.js"

const someDefault = { 
  maxWrong: 6, images: [img0, img1, img2, img3, img4, img5, img6]
};

export default function Hangman() {
 const [change, setChange] = useState({ nWrong: 0, guessed: new Set(), answer: randomWord() });
  /** by default, allow 6 guesses and use provided gallows images. */
 
  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  function guessedWord() {
    return change.answer
      .split("")
      .map(ltr => (change.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
    function handleGuess(evt) {
      let ltr = evt.target.value;
      setChange(st => ({
        guessed: st.guessed.add(ltr),
        nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
        answer: st.answer
      }));
    }
  

  /** generateButtons: return array of letter buttons to render */
  function generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        key={ltr}
        value={ltr}
        onClick={handleGuess}
        disabled={change.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  const handleClick = () => {
    setChange({nWrong: 0, guessed: new Set(), answer: randomWord()})
  }

  /** render: render game */
  const gameOver = change.nWrong >= someDefault.maxWrong;
  const isWinner = guessedWord().join("") === change.answer;
  let gameState = generateButtons();
  if(isWinner) gameState = "You Win!";
  if(gameOver) gameState = "You Lose!";
    return (
      <div className='Hangman'>
        <div className="left">
          <h1>Hangman</h1>
          <p>{change.answer}</p>
          <h2>Wrong guesses: {change.nWrong}</h2>
         
          <img src={someDefault.images[change.nWrong]} alt={`${change.nWrong}/${someDefault.maxWrong}`} />
        </div>
        <div className="right">
          <p className='Hangman-word'>{!gameOver ? guessedWord() : change.answer}</p>
          <p className='Hangman-btns'>{gameState}</p>
          <button className="restart" onClick={handleClick}>Restart</button>
        </div>
        
       
      </div>
    );
}
