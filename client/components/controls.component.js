'use strict'

import React, { Component } from 'react'
const CLIENT_ID = '?client_id=480c18c7ce22bbe09e989422102de2c8'

export default class Controls extends Component {

  constructor () {
    super()
    this.state = {
      playing: false 
    }
    this.audioCtx = new AudioContext()
    this.analyser = this.audioCtx.createAnalyser()
    this.analyser.fftSize = 32768

    // Canvas visualizer config
    this.meterWidth = 2 //width of the meters in the spectrum
    this.capHeight = 2
    this.capStyle = '#FD000A'
    this.meterNum = 2000 / (8 + 2) //count of the meters
    this.capYPositionArray = [] //store the vertical position of the caps for the preivous frame
  }

  handleAudio = (audio) => {
    this.source = this.audioCtx.createMediaElementSource(audio)
    const bassFilter = this.audioCtx.createBiquadFilter()

    bassFilter.type = 'lowshelf'
    bassFilter.frequency.value = 9999 

    this.source.connect(bassFilter)
    bassFilter.connect(this.audioCtx.destination)
  }

  initializeVisualizer = (canvas) => {
    this.source.connect(this.analyser)
    this.analyser.connect(this.audioCtx.destination)

    this.cwidth = canvas.width
    this.cheight = canvas.height
    this.ctx = canvas.getContext('2d')

    this.renderFrame()
  }

  renderFrame = () => {
    const array = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(array);
    const step = Math.round(array.length / this.meterNum); //sample limited data from the total array
    this.ctx.clearRect(0, 0, this.cwidth, this.cheight);
    for (let i = 0; i < this.meterNum; i++) {
      let value = array[i * step];
      if (this.capYPositionArray.length < Math.round(this.meterNum)) {
        this.capYPositionArray.push(value);
      };
      this.ctx.fillStyle = this.capStyle;
      //draw the cap, with transition effect
      if (value < this.capYPositionArray[i]) {
        this.ctx.fillRect(i * 3, this.cheight - (--this.capYPositionArray[i]), this.meterWidth, this.capHeight);
      } else {
        this.ctx.fillRect(i * 3, this.cheight - value, this.meterWidth, this.capHeight);
        this.capYPositionArray[i] = value;
      };
      this.ctx.fillStyle = '#FD000A'; //set the filllStyle to gradient for a better look
      this.ctx.fillRect(i * 3 /*meterWidth+gap*/ , this.cheight - value + this.capHeight, this.meterWidth, this.cheight); //the meter
    }
    requestAnimationFrame(this.renderFrame)
  }

  handleEnding () {
    const previous = this.props.tracks.indexOf(this.props.track)
    this.props.changeTrack(this.props.tracks[previous + 1])
  }

  handlePause () {
    this.setState({
      playing: false 
    })
  }

  handlePlay () {
    this.setState({
      playing: true 
    })
  }

  render () {
    return (
      <div className="controls">
        <audio autoPlay controls
          crossOrigin="anonymous"
          onEnded={() => this.handleEnding()}
          onPause={() => this.handlePause()}
          onPlay={() => this.handlePlay()}
          ref={this.handleAudio}
          src={this.props.track.stream_url + CLIENT_ID}></audio>
          <canvas style={{display: this.state.playing ? 'block' : 'none' }}
            ref={this.initializeVisualizer}></canvas>
      </div>
    )
  }
}
