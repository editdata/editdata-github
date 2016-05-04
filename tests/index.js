var test = require('tape')
var gh = require('../index')({ token: process.env.GITHUB_ACCESS_TOKEN })

test('request an organization', function (t) {
  t.plan(3)

  var options = {
    endpoint: 'orgs/editdata',
    token: process.env.GITHUB_ACCESS_TOKEN,
    json: true
  }

  gh(options, function (err, res, body) {
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

test('create a branch', function (t) {
  t.plan(3)

  var options = {
    owner: 'editdatabot',
    repo: 'test',
    ref: 'refs/heads/test-' + Date.now(),
    sha: 'b6ceaa8cd4ae8f87c620f2504a0d3a42bd7d923f'
  }

  gh.branch.create(options, function (err, res, body) {
    t.notOk(err)
    t.ok(res)
    t.ok(body)
  })
})

test('create a fork', function (t) {
  t.plan(3)

  var options = {
    owner: 'editdatabot',
    repo: 'test'
  }

  gh.fork.create(options, function (err, res, body) {
    t.notOk(err)
    t.ok(res)
    t.ok(body)
  })
})
