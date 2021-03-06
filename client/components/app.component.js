'use strict'

import React, { Component } from 'react'
import * as request from 'superagent'

import Tracks from './tracks.component'
import Controls from './controls.component'
import { fetchQuery } from '../utils/sound.util'

const DEFAULT_ARTIRST = 'Martin Garrix'

export default class App extends Component {

  constructor () {
    super()
    this.state = {
      tracks: [],
      currentTrack: {
        stream_url: ''
      }
    }
    fetchQuery(DEFAULT_ARTIRST)
      .then(results => {
        this.setState({
          tracks: results,
          currentTrack: results[0]
        })
      }).catch(error => console.log(error))     
  }

  onSubmit = (event) => {
    event.preventDefault()
    this.setState({
      tracks: []
    })
    fetchQuery(this.search.value)
      .then(results => {
        this.setState({
          tracks: results,
          currentTrack: results[0]
        })
        window.scrollTo(0, 0)
      }).catch(error => console.log(error))
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
          <div className="logo">
            <img src="/assets/Deadmau5_logo.png" />
            <em>faukbox</em>
          </div>
          <form name="search">
            <input ref={(search) => this.search = search}
              type="text" placeholder="Search for an awesome music or artist... 🎧"/>
            <button type="submit" hidden="true"
              onClick={(event) => this.onSubmit(event)}></button>
          </form>
        </div>
        <Tracks tracks={this.state.tracks} changeTrack={this.changeTrack} 
                track={this.state.currentTrack} />
        <Controls track={this.state.currentTrack}
                  tracks={this.state.tracks}
                  changeTrack={this.changeTrack}/>
      </div>
    )
  }
}
