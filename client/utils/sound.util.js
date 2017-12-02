'use strict'

import * as request from 'superagent'

export const fetchQuery = (value) => {
  return new Promise((resolve, reject) => {
    request.get('/api/sounds/search')
      .query({ term: value })
      .set('accept', 'json')
      .end((err, { body }) => {
        if (err) reject(err)
        
        resolve(body)
      })
  })

}
