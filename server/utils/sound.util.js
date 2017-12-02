'use strict'

const Soundcloud = require('node-soundcloud')

Soundcloud.init({
  id: '480c18c7ce22bbe09e989422102de2c8',
  secret: '645c9dfed9d3dea4e02854e268c379ff',
  uri: 'foo'
})

class SoundUtil {

  static queryTracks (term) {
    return new Promise((resolve, reject) => {
      Soundcloud.get('/tracks', {
        limit: 100,
        q: term
      }, (err, tracks) => {
        if (err) reject(err)

        resolve(tracks)
      })
    })
  }


}

module.exports = SoundUtil
