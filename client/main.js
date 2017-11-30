'use strict'

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import * as io from 'socket.io-client'
import 'eric-meyer-reset.scss/_reset.scss'
import './styles/app.scss'

// Components
import App from './components/app.component'

const socket = io.connect()
const MOUNT_NODE = document.getElementById('app')

ReactDOM.render(
  <App />,
  MOUNT_NODE
)

if (module.hot) {
  module.hot.accept()
}
