var request = require('./request')

module.exports = function (client) {
  var fork = {}

  fork.create = function GitHubClient_fork_create (opts, callback) {
    var options = {
      endpoint: 'repos/' + opts.owner + '/' + opts.repo + '/forks',
      method: 'POST',
      token: client.token,
      json: {
        organization: opts.organization
      }
    }

    return request(options, callback)
  }

  return fork
}
