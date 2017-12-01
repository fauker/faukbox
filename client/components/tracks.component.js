'use strict'

import React, { Component } from 'react'

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
        <ul>
          {tracks}
        </ul>     
      </div>
    )
  }
}
