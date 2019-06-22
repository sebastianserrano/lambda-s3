'use strict'

const handler = require('../upload.js').handler
const testEvent = require('./file64String.json')
const LambdaTester = require('lambda-tester')

describe('Upload', function () {
  it('verifies a successful response', async () => {
    return LambdaTester(handler)
      .event(testEvent)
      .expectResult()
  })
})
