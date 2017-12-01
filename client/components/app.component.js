'use strict'

import React, { Component } from 'react'
import * as request from 'superagent'

import Tracks from './tracks.component'
import Controls from './controls.component'

export default class App extends Component {

  constructor () {
    super()
    this.state = {
      tracks: [],
      currentTrack: ''
    }
  }

  onSubmit = (event) => {
    event.preventDefault()
    request.get('/api/sounds/search')
      .query({ term: this.search.value })
      .set('accept', 'json')
      .end((err, { body }) => {
        if (err) console.log(err)
        this.setState({
          tracks: body 
        })
      })
  }

  changeTrack = (track) => {
    this.setState({
      currentTrack: track
    })
  }

  render () {
    return (
      <div className="container">
        <div className="nav">
        <form name="search">
          <input ref={(search) => this.search = search}
            type="text" placeholder="Search for an awesome music... 🎧"/>
          <button type="submit" hidden="true"
            onClick={(event) => this.onSubmit(event)}></button>
        </form>
        </div>
        <Tracks tracks={this.state.tracks} changeTrack={this.changeTrack} />
        <Controls track={this.state.currentTrack}
                  tracks={this.state.tracks}
                  changeTrack={this.changeTrack}/>
      </div>
    )
  }
}
