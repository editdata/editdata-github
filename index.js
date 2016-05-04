var request = require('./request')

module.exports = function GitHubClient (options) {
  function gh (opts, callback) {
    opts.token = opts.token || options.token
    return request(opts, callback)
  }

  gh.contents = require('./contents')(options)
  gh.branch = require('./branch')(options)
  gh.fork = require('./fork')(options)

  return gh
}
