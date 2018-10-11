import React, { Component } from "react"
import styled from "styled-components"
import moment from "moment"

const colors = {
  grey_100: "hsl(221, 14%, 96%)",
  grey_500: "hsl(221, 14%, 60%)",
  grey_700: "hsl(221, 14%, 36%)",
  grey_900: "hsl(221, 14%, 24%)",

  blue_500: "hsl(230, 74%, 61%)",

  green_500: "hsl(187, 62%, 62%)"
}

// console.log(process.env.projectId)

class App extends Component {
  static defaultProps = {
    input: []
  }
  state = {
    isLoaded: false,
    isPlaying: false,
    value: "",
    words: [],
    level: 1,
    currentWordIndex: 0,
    currentLetterIndex: 0,
    timer: 0,
    score: 0
  }
  componentDidMount = async () => {
    document.addEventListener("keypress", this.handleKeyPress)
    const words = this.props.input.map(word => word.split("").map(l => l))
    this.setState({
      words,
      isLoaded: true
    })
  }
  handleStartGame = e => {
    const startTime = moment()
    this.timer = setInterval(() => this.startTimer(startTime), 10)
    this.setState({ isPlaying: true })
  }
  handleKeyPress = e => {
    const event = e

    // New game, start timer and show first word.
    if (!this.state.isPlaying && event.key === "Enter") {
      this.handleStartGame()
    }

    const word = this.state.words[this.state.currentWordIndex]
    let currentLetterIndex = this.state.currentLetterIndex
    let currentWordIndex = this.state.currentWordIndex
    let level = this.state.level
    let score = this.state.score

    // Wrong letter, return early.
    if (event.key !== word[currentLetterIndex]) return false

    ++score

    // Last letter in word. Move to next word.
    if (word.length - 1 === currentLetterIndex) {
      ++currentWordIndex
      currentLetterIndex = 0
    } else {
      ++currentLetterIndex
    }

    // Last word in level. Move to next level.
    if (this.state.words.length === currentWordIndex) {
      currentWordIndex = 0
      ++level
    }

    // TODO Last level in game. Stop Timer and exit game.

    // Update the state accordingly
    this.setState({
      currentLetterIndex,
      currentWordIndex,
      level,
      score
    })
  }
  startTimer = startTime =>
    this.setState({
      timer: moment().diff(startTime)
    })

  stopTimer = () => clearInterval(this.timer)
  getIsCurrent = index =>
    index === this.state.currentLetterIndex ? "current" : "not-current"
  getIsComplete = index =>
    index < this.state.currentLetterIndex ? "complete" : "not-complete"
  render() {
    const {
      isLoaded,
      isPlaying,
      timer,
      level,
      words,
      currentWordIndex,
      score
    } = this.state
    if (!isLoaded) return <h2>loading...</h2>
    return (
      <AppContainer>
        <Game>
          <h3>
            <span>Level: {level}</span>
            <span className="timer" onClick={this.stopTimer}>
              {moment(timer).format("mm:ss:SS")}
            </span>
          </h3>
          <ul className="legend">
            {words.map((word, i) => (
              <li key={i} className="level" />
            ))}
          </ul>
          {isPlaying ? (
            <h1 className="word">
              {words[currentWordIndex].map((letter, i) => (
                <span
                  key={`${letter}-${i}`}
                  className={`letter ${this.getIsCurrent(
                    i
                  )} ${this.getIsComplete(i)}`}
                >
                  {letter}
                </span>
              ))}
            </h1>
          ) : (
            <h2>Press enter to begin a game.</h2>
          )}
          <h3>
            <span className="timer">{score} :score</span>
          </h3>
        </Game>
        <h4 className="explanation">
          Typefast is a game of speed, type each word as fast as you can. Wrong
          letters decrease your score.
        </h4>
      </AppContainer>
    )
  }
}

const AppContainer = styled.main`
  position: relative;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: ${colors.grey_100};
  .explanation {
    margin-top: 4rem;
    max-width: 60rem;
    color: ${colors.grey_500};
  }
`

const Game = styled.section`
  padding: 4rem;
  background: ${colors.blue_500};
  color: ${colors.grey_100};
  width: 100%;
  max-width: 70rem;
  border-radius: 6px;
  box-shadow: 0 3rem 3rem -2rem rgba(84, 109, 229, 0.48);
  h3 {
    display: flex;
    .timer {
      margin-left: auto;
    }
  }
  h2 {
    text-align: center;
    margin: 2rem 0;
  }
  h1 {
    margin-top: 2rem;
    margin-bottom: 2rem;
    font-size: 5rem;
    color: ${colors.grey_100};
    text-align: center;
    span {
      opacity: 0.48;
    }
    .current {
      opacity: 1;
    }
    .complete {
      opacity: 0.72;
      color: ${colors.green_500};
    }
  }
`

export default App
