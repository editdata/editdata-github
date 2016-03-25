var req = require('request')

/*
* Make a request to the GitHub API
* @name request
*/
module.exports = function request (opts, callback) {
  opts.auth = opts.auth || 'token ' + opts.token

  var options = {
    url: 'https://api.github.com/' + opts.endpoint,
    headers: {
      authorization: opts.auth,
      'User-Agent': opts.userAgent || 'EditData'
    },
    method: opts.method,
    json: opts.json,
    body: opts.body
  }

  req(options, function (err, res, body) {
    if (err) return callback(err)
    if (res.statusCode >= 400) return callback(body)
    callback(err, res, body)
  })
}
