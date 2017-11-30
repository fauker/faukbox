
'use strict'

const Soundcloud = require('node-soundcloud')
const _shuffle = require('lodash/shuffle')

Soundcloud.init({
  id: '480c18c7ce22bbe09e989422102de2c8',
  secret: '645c9dfed9d3dea4e02854e268c379ff',
  uri: 'foo'
})

let uri = '/users/8553751/tracks'

class SoundController {
  
  static fetchTrack (req, res) {
    Soundcloud.get('/tracks', {
      limit: 100,
      q: req.query.term 
    }, (err, tracks) => {
      if (err) res.send(err.err_message) 
      res.json(tracks)
    })
  }

}

module.exports = (router) => {
  router.get('/api/sounds/search', SoundController.fetchTrack)
}
