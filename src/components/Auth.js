import React from "react"
import styled from "styled-components"
import { colors } from "../constants"

import { auth } from "../index"

class Auth extends React.Component {
  componentDidMount = () => {
    auth.onAuthStateChanged(change => {
      console.log(change)
    })
  }
  render = () => (
    <AuthWrapper>
      <button>Sign in to save progress.</button>
    </AuthWrapper>
  )
}

const AuthWrapper = styled.div`
  margin-top: 1rem;
  margin-bottom: 4rem;
  button {
    background: ${colors.red_500};
    color: ${colors.grey_100};
  }
`

export default Auth
