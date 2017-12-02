'use strict'

const SoundUtil = require('../utils/sound.util')

class SoundController {
  
  static async fetchTracks (req, res) {
    let tracks

    try {
      tracks = await SoundUtil.queryTracks(req.query.term)
    } catch (err) {
      return res.send(err.err_message)
    }

    res.json(tracks)
  }

}

module.exports = (router) => {
  router.get('/api/sounds/search', SoundController.fetchTracks)
}
