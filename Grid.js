import * as React from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';
import $ from 'jquery';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

import Box from './Box';
import Keyboard from './Keyboard';

export default class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      submits: 0,
      letters: new Array(30).fill(null),
      colors: new Array(30).fill(null),
      greenLetters: [],
      yellowLetters: [],
      grayLetters: [],
      gameOver: false,
      win: false
    };
    this.updateLetters = this.updateLetters.bind(this);
    this.deleteLetter = this.deleteLetter.bind(this);
    this.submitWord = this.submitWord.bind(this);
    this.renameWord = this.colorWord.bind(this);
    this.playAgain = this.playAgain.bind(this);
    this.focusKeyboard = this.focusKeyboard.bind(this);
  }

  focusKeyboard() {
    $('#keyboard').focus();
  }

  updateLetters(letter) {
    if(!this.state.gameOver) {
      const allowedAdd = this.state.index <= (this.state.submits + 1) * 5 - 1;
      this.setState({
        letters: this.state.letters.map((a, ai) => ai == this.state.index && allowedAdd ? letter : this.state.letters[ai]),
        index: allowedAdd ? this.state.index + 1 : this.state.index
      });
    }
  }

  deleteLetter() {
    const allowedDelete = this.state.index <= this.state.submits * 5;
    this.setState({
      letters: this.state.letters.map((a, ai) => ai < this.state.index - 1 || allowedDelete ? this.state.letters[ai] : null),
      index: this.state.index - 1 < 0 ? 0 : allowedDelete ? this.state.index : this.state.index - 1
    });
  }

  colorWord() {
    var wordColor = [];
    var wordPos = 0;
    var letterCount = {};
    var newGreen = this.state.greenLetters;
    var newYellow = this.state.yellowLetters;
    var newGray = this.state.grayLetters;

    this.props.word.split("").forEach(a => letterCount[a] = letterCount[a] + 1 || 1);
    for(var i = 0; i < this.state.letters.length; i++) {
      if(i >= this.state.submits * 5 - 5 && i <= this.state.submits * 5 - 1) {
        if(this.state.letters[i].toLowerCase() == this.props.word.charAt(wordPos)) {
          wordColor[wordPos] = 'green';
          letterCount[this.state.letters[i].toLowerCase()]--;
          newGreen.push(this.state.letters[i].toLowerCase());
        }
        wordPos++;
      }
    }
    wordPos = 0;
    for(var i = 0; i < this.state.letters.length; i++) {
      if(i >= this.state.submits * 5 - 5 && i <= this.state.submits * 5 - 1) {
        if(this.props.word.includes(this.state.letters[i].toLowerCase()) && letterCount[this.state.letters[i].toLowerCase()] > 0 && this.state.letters[i].toLowerCase() != this.props.word.charAt(wordPos)) {
          wordColor[wordPos] = 'yellow';
          letterCount[this.state.letters[i].toLowerCase()]--;
          newYellow.push(this.state.letters[i].toLowerCase());
        } else if(this.state.letters[i].toLowerCase() != this.props.word.charAt(wordPos)) {
          wordColor[wordPos] = 'gray';
          newGray.push(this.state.letters[i].toLowerCase());
        }
        wordPos++;
      }
    }
    var colorIndex = 0;
    this.setState({
      colors: this.state.colors.map((a, ai) => a != null ? a : ai >= this.state.submits * 5 - 5 && ai <= this.state.submits * 5 - 1 ? wordColor[colorIndex++] : null),
      greenLetters: newGreen,
      yellowLetters: newYellow,
      grayLetters: newGray,
      gameOver: wordColor[0] == 'green' && wordColor[1] == 'green' && wordColor[2] == 'green' && wordColor[3] == 'green' && wordColor[4] == 'green' ? true : false,
      win: wordColor[0] == 'green' && wordColor[1] == 'green' && wordColor[2] == 'green' && wordColor[3] == 'green' && wordColor[4] == 'green' ? true : false
    });

    if(!this.state.letters.includes(null)) {
      toastr.info("The word was " + this.props.word);
      this.setState({
        gameOver: true
      });
    }
  }

  submitWord(){
    if(!this.state.gameOver) {
      var count = 0;
      for(var i = 0; i < this.state.letters.length; i++) {
        if(this.state.letters[i] != null)
          count++;
      }
      if(this.state.submits + 1 != count / 5) {
        toastr.error("I want a 5 letter word!");
      } else if(!this.props.wordList.includes(this.state.letters.map((a, ai) => ai >= (this.state.submits + 1) * 5 - 5 && ai <= (this.state.submits + 1) * 5 - 1 ? a : "").join('').toLowerCase())) {
        toastr.error("I think you made that word up...");
      } else {
        this.setState({
          submits: this.state.submits + 1,
        }, () => {this.colorWord()});
      }
    }
  }

  playAgain() {
    this.setState({
      index: 0,
      submits: 0,
      letters: new Array(30).fill(null),
      colors: new Array(30).fill(null),
      greenLetters: [],
      yellowLetters: [],
      grayLetters: [],
      gameOver: false,
      win: false
    });
    this.props.restart(this.state.win);
  }

  render() {
    let index = 0;
    const list = [1, 2, 3, 4, 5, 6].map(a => 
      <Row className="justify-content-md-center">
        <Col className='no-frame' sm md="auto"><Box letter={this.state.letters[index]} color={this.state.colors[index++]}/></Col>
        <Col className='no-frame' sm md="auto"><Box letter={this.state.letters[index]} color={this.state.colors[index++]}/></Col>
        <Col className='no-frame' sm md="auto"><Box letter={this.state.letters[index]} color={this.state.colors[index++]}/></Col>
        <Col className='no-frame' sm md="auto"><Box letter={this.state.letters[index]} color={this.state.colors[index++]}/></Col>
        <Col className='no-frame' sm md="auto"><Box letter={this.state.letters[index]} color={this.state.colors[index++]}/></Col>
      </Row>
    );

    return (
      <div id='backgound' onClick={() => this.focusKeyboard()}>
        <div id='header'>Wordle<p id='streak-info'>{this.props.winStreak} Game Win Streak</p></div>
        <div id='frame'>
          {list}
        </div>
        <Keyboard update={this.updateLetters} delete={this.deleteLetter} submit={this.submitWord} green={this.state.greenLetters} yellow=
      {this.state.yellowLetters} gray={this.state.grayLetters}/>
        {this.state.gameOver && <Button id='button-3' onClick={() => this.playAgain()}>Play Again</Button>}
      </div>
    );
  }
}
