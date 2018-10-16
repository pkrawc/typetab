import React, { PureComponent } from "react"
import styled from "styled-components"
import { colors } from "../constants"

class Legend extends PureComponent {
  render = () => {
    const { length, currentIndex } = this.props
    const width = Math.floor((currentIndex / length) * 100)
    return (
      <LegendWrapper>
        <div className="complete" style={{ width: `${width}%` }} />
      </LegendWrapper>
    )
  }
}

const LegendWrapper = styled.ul`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  .complete {
    height: 0.5rem;
    border-radius: 6px;
    background: ${colors.green_500};
    transition: width 200ms ease;
  }
`

export default Legend
