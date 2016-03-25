var test = require('tape')
var request = require('../request')

test('request an organization', function (t) {
  t.plan(3)

  var options = {
    endpoint: 'orgs/editdata',
    token: process.env.GITHUB_ACCESS_TOKEN,
    json: true
  }

  request(options, function (err, res, body) {
    t.notOk(err)
    t.ok(res)
    t.ok(body)
  })
})
