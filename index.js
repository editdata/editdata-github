module.exports = function GitHubClient (options) {
  var client = { token: options.token }

  client.contents = require('./contents')(client)
  client.branch = require('./branch')(client)

  return client
}
