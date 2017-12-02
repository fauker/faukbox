'use strict'

import React, { Component } from 'react'
import Loading from './loading.component'

export default class Tracks extends Component {

  selectTrack (track) {
    this.props.changeTrack(track)
  }

  render () {
    const tracks = this.props.tracks.map((track, index) => 
      <li key={index} onClick={() => this.selectTrack(track)} className={this.props.track.id === track.id ? 'playing' : ''}>
        <div className="title">
          <img src={track.artwork_url != null ? track.artwork_url :
            'https://images.vexels.com/media/users/3/134743/isolated/lists/97ae591756f3dc69db88c09fd097319a-emoticon-de-cara-triste-emoji.png'} />
          <p>{track.title}</p>
        </div>
        <div className="stats">
          <div className="stat">
            <i className="fa fa-heart"></i>
            <em>{track.likes_count}</em>
          </div>
          <div className="stat">
            <em className="genre">{track.genre}</em>
          </div>
        </div>
        { this.props.track.id === track.id ?
          <div className="playing-now">
            <em>PLAYING NOW</em>
          </div>       
          : ''
        }

      </li>
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



