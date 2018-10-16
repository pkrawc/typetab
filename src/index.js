import React from "react"
import { render } from "react-dom"
import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

import App from "./App"

firebase.initializeApp({
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId
})

export const db = firebase.firestore()

db.settings({
  timestampsInSnapshots: true
})

export const auth = firebase.auth()

const root = document.getElementById("root")

render(<App />, root)
