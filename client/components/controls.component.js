'use strict'

import React, { Component } from 'react'
const CLIENT_ID = '?client_id=480c18c7ce22bbe09e989422102de2c8'

export default class Controls extends Component {

  handleEnding () {
    const previous = this.props.tracks.indexOf(this.props.track)
    this.props.changeTrack(this.props.tracks[previous + 1])
  }

  render () {
    return (
      <div className="controls">
        <audio autoPlay controls
          onEnded={() => this.handleEnding()}
          src={this.props.track.stream_url + CLIENT_ID}></audio>
      </div>
    )
  }
}
