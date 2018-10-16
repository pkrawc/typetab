import React, { Component } from "react"
import moment from "moment"

export default class Timer extends Component {
  timer = null

  state = {
    startTime: null,
    milliseconds: 0
  }

  componentDidMount = () => {
    this.timer = setInterval(this.update, 50)
  }

  update = () => {
    const startTime = this.state.startTime || moment()
    this.setState({ milliseconds: moment().diff(startTime), startTime })
  }

  stop = () => clearInterval(this.timer)

  reset = () => this.setState({ milliseconds: 0 })

  componentWillUnmount = () => this.stop()

  render = () => this.props.children(this.state.milliseconds)
}
