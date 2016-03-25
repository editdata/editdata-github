var request = require('./request')

module.exports = function GitHubClient_branch (options) {
  var client = { token: options.token }

  client.create = function GitHubClient_branch_create (opts, callback) {
    var options = {
      endpoint: 'repos/' + opts.owner + '/' + opts.repo + '/git/refs',
      token: client.token,
      method: 'POST',
      json: {
        ref: opts.ref,
        sha: opts.sha
      }
    }

    request(options, callback)
  }

  return client
}
