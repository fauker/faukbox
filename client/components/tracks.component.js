'use strict'

import React, { Component } from 'react'
import Loading from './loading.component'

export default class Tracks extends Component {

  selectTrack (track) {
    this.props.changeTrack(track)
  }

  render () {
    const tracks = this.props.tracks.map((track, index) => 
      <li key={index} onClick={() => this.selectTrack(track)}>{track.title}</li>
    )
    return (
      <div className="tracks">
        { this.props.tracks.length === 0 ? <Loading /> : null } 
        <ul>
          {tracks}
        </ul>     
      </div>
    )
  }
}
