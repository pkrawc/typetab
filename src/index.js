import React from "react"
import { render } from "react-dom"
import App from "./App"

const words = ["cat", "dog", "wolf", "kitten"]

const root = document.getElementById("root")

render(<App input={words} />, root)
