var csvWriter = require('csv-write-stream')
var fromString = require('from2-string')
var fromArray = require('from2-array')
var csvParser = require('csv-parser')
var base64 = require('base-64')
var utf8 = require('utf8')

var request = require('./request')

module.exports = function GitHubClient_contents (options) {
  var client = { token: options.token }

  client.get = function GitHubClient_contents_get (opts, callback) {
    var options = {
      endpoint: 'repos/' + opts.owner + '/' + opts.repo + '/contents/' + opts.path,
      token: client.token,
      json: { ref: opts.ref || 'master' }
    }

    request(options, function (err, res, body) {
      if (err) return callback(err)
      var content = base64.decode(body.content)
      callback(err, body, content)
    })
  }

  client.getJSON = function GitHubClient_contents_getJSON (opts, callback) {
    client.get(opts, function (err, res, body) {
      if (err) return callback(err)
      callback(null, res, JSON.parse(body))
    })
  }

  client.getCSV = function GitHubClient_contents_getCSV (opts, callback) {
    client.get(opts, function (err, res, body) {
      if (err) return callback(err)
      var data = []

      function each (row) {
        data.push(row)
      }

      function end () {
        callback(null, res, data, body)
      }

      fromString(body)
        .pipe(csvParser())
        .on('data', each)
        .on('end', end)
    })
  }

  client.getYAML = function GitHubClient_contents_getYAML (opts, callback) {
    throw new Error('todo: contents.getYAML')
  }

  client.putYAML = function GitHubClient_contents_putYAML (opts, callback) {
    throw new Error('todo: contents.putYAML')
  }

  client.putJSON = function GitHubClient_contents_putJSON (opts, callback) {
    throw new Error('todo: contents.putJSON')
  }

  client.putCSV = function GitHubClient_contents_putCSV (opts, callback) {
    var data = opts.data
    var csv = ''

    var writer = csvWriter({ headers: Object.keys(data[0]) })

    fromArray.obj(data)
      .pipe(writer)
      .on('data', each)
      .on('end', end)

    function each (data) {
      csv += data
    }

    function end () {
      var options = {
        endpoint: 'repos/' + opts.owner + '/' + opts.repo + '/contents/' + opts.path,
        token: client.token,
        method: 'put',
        json: {
          path: opts.path,
          message: opts.message,
          content: base64.encode(utf8.encode(csv)),
          branch: opts.branch,
          sha: opts.sha
        }
      }

      request(options, callback)
    }
  }

  return client
}
