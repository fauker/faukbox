'use strict'

import React, { Component } from 'react'

export default class Tracks extends Component {
  render () {
    const tracks = this.props.tracks.map((track, index) => 
      <li key={index}>{track.title}</li>
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
