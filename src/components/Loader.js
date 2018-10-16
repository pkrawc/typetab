import React from "react"
import styled, { keyframes } from "styled-components"

const Loader = props => (
  <LoaderWrapper>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192">
      <g fill="none" fill-rule="evenodd">
        <rect
          width="152"
          height="152"
          x="20"
          y="20"
          fill="#F8F8F8"
          fill-rule="nonzero"
          rx="8"
        />
        <g fill="#283C9C" fill-rule="nonzero" transform="translate(48 48)">
          <rect width="24" height="12" x="12" y="42" />
          <rect width="36" height="12" x="6" y="84" />
          <rect width="48" height="12" />
          <rect width="12" height="96" x="18" />
        </g>
        <rect
          className="cursor"
          width="6"
          height="96"
          x="132"
          y="48"
          fill="#4BBECE"
          fill-rule="nonzero"
        />
      </g>
    </svg>
  </LoaderWrapper>
)

const blink = keyframes`
0%, 100% { opacity: 0;}
50% {opacity: 1;}
`

const LoaderWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    height: 20rem;
    width: 20rem;
  }
  .cursor {
    animation: ${blink} 1s ease infinite;
  }
`

export default Loader
