var request = require('./request')

module.exports = function (client) {
  var pullRequest = {}

  pullRequest.create = function GitHubClient_pullRequest_create (opts, callback) {
    var options = {
      endpoint: 'repos/' + opts.owner + '/' + opts.repo + '/pulls',
      token: client.token,
      method: 'POST',
      json: {
        title: opts.title,
        head: opts.user + ':' + opts.head,
        base: opts.base,
        body: opts.body
      }
    }

    return request(options, callback)
  }

  return pullRequest
}
