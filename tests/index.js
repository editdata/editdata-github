var test = require('tape')
var request = require('../request')
var gh = require('../index')({ token: process.env.GITHUB_ACCESS_TOKEN })

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

test('request contents of a repo', function (t) {
  t.plan(4)

  var options = {
    owner: 'editdata',
    repo: 'editdata.org',
    path: 'README.md'
  }

  gh.contents.get(options, function (err, res, body) {
    t.notOk(err)
    t.ok(res)
    t.ok(body)
    t.equal(typeof body, 'string')
  })
})

test('request JSON contents of a repo', function (t) {
  t.plan(4)

  var options = {
    owner: 'editdata',
    repo: 'editdata.org',
    path: 'package.json'
  }

  gh.contents.getJSON(options, function (err, res, body) {
    t.notOk(err)
    t.ok(res)
    t.ok(body)
    t.equal(typeof body, 'object')
  })
})

test('request parsed CSV contents of a repo', function (t) {
  t.plan(4)

  var options = {
    owner: 'maxogden',
    repo: 'csv-spectrum',
    path: 'csvs/simple.csv'
  }

  gh.contents.getCSV(options, function (err, res, body) {
    t.notOk(err)
    t.ok(res)
    t.ok(body)
    t.equal(typeof body, 'object')
  })
})
