import React, { Component } from "react"
import styled from "styled-components"
import moment from "moment"
import { colors } from "./constants"
import { db } from "./index"
import Loader from "./components/Loader"
import Legend from "./components/Legend"
import Timer from "./components/Timer"
import Auth from "./components/Auth"

class App extends Component {
  timer = null
  state = {
    startTimer: false,
    isLoaded: false,
    isPlaying: false,
    levels: [],
    levelIndex: 0,
    wordIndex: 0,
    letterIndex: 0,
    score: 0
  }
  componentDidMount = async () => {
    document.addEventListener("keypress", this.handleKeyPress)
    try {
      const levels = []
      const levelsSnapshots = await db.collection("levels").get()
      levelsSnapshots.forEach(doc => {
        const level = doc.data()
        const words = level.words.map(word => word.split(""))
        levels.push(words)
      })
      this.setState({
        levels,
        isLoaded: true
      })
    } catch (error) {
      console.log(error)
    }
  }
  startLevel = levelIndex =>
    this.setState({
      startTimer: true,
      isPlaying: true
    })
  completeLevel = () => this.setState({ isPlaying: false, startTimer: false })
  handleKeyPress = e => {
    const event = e

    let letterIndex = this.state.letterIndex
    let wordIndex = this.state.wordIndex
    let levelIndex = this.state.levelIndex
    let score = this.state.score
    let word = this.state.levels[levelIndex][wordIndex]

    // New level, start timer and show first word.
    if (!this.state.isPlaying && event.key === "Enter") {
      return this.startLevel(levelIndex)
    }

    // Wrong letter, return early.
    if (event.key !== word[letterIndex]) return false

    ++score

    // Last letter in word. Move to next word.
    if (word.length - 1 === letterIndex) {
      ++wordIndex
      letterIndex = 0
    } else {
      ++letterIndex
    }

    // Last word in level. Move to next level.
    if (this.state.levels[levelIndex] === wordIndex) {
      wordIndex = 0
      ++levelIndex
      this.completeLevel()
    }

    // TODO Last level in game. Stop Timer and exit game.

    // Update the state accordingly
    this.setState({
      letterIndex,
      wordIndex,
      levelIndex,
      score
    })
  }
  getIsCurrent = index =>
    index === this.state.letterIndex ? "current" : "not-current"
  getIsComplete = index =>
    index < this.state.letterIndex ? "complete" : "not-complete"
  render() {
    const {
      isLoaded,
      isPlaying,
      startTimer,
      levels,
      levelIndex,
      wordIndex,
      score
    } = this.state
    if (!isLoaded) return <Loader />
    return (
      <AppContainer>
        <Auth />
        <Game>
          <Legend length={levels[levelIndex].length} currentIndex={wordIndex} />
          <h3 className="top-info">
            <span>Level: {levelIndex + 1}</span>
            {startTimer && (
              <Timer>
                {time => (
                  <span className="timer">
                    {moment(time).format("mm:ss:SS")}
                  </span>
                )}
              </Timer>
            )}
          </h3>
          {isPlaying ? (
            <h1 className="word">
              {levels[levelIndex][wordIndex].map((letter, i) => (
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
            <h2>[ PRESS ENTER TO BEGIN ]</h2>
          )}
          <h3>
            <span className="timer">{score} :score</span>
          </h3>
        </Game>
        <h4 className="explanation">
          TypeTab is a game of speed, type each word quickly and accurately.
          Wrong letters will count against your score. Move through the levels
          and see your score climb. Highscores are based on letters per minute.
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
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 4rem;
  background: ${colors.blue_500};
  border-radius: 6px;
  box-shadow: 0 3rem 3rem -2rem rgba(84, 109, 229, 0.48);
  color: ${colors.grey_100};
  min-height: 25rem;
  width: 100%;
  max-width: 70rem;

  .top-info {
    margin-top: 1rem;
  }
  h3 {
    display: flex;
    .timer {
      margin-left: auto;
    }
  }
  h2 {
    text-align: center;
    margin: 2rem 0;
    color: ${colors.grey_300};
  }
  h1 {
    margin: 1.5rem;
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
