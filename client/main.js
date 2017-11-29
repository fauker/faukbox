'use strict'

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import * as io from 'socket.io-client'
import 'eric-meyer-reset.scss/_reset.scss'
import './styles/app.scss'

// Components
//import Player from './containers/player.container'

const socket = io.connect()
const MOUNT_NODE = document.getElementById('app')

class App extends Component {

  render () {
    return (
      <div className="container">
        <div className="search">
          <input type="text" placeholder="Search for an awesome music..."/>
        </div>
        <div className="player">
          <audio controls></audio>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  MOUNT_NODE
)

if (module.hot) {
  module.hot.accept()
}
