# editdata-github

**Work in progress.** An API client for GitHub that performs common actions needed by EditData projects.

## What does it do?
- Get a CSV file parsed into an array of objects, make changes, then commit the changes to the CSV.
- Fork a repository, make a branch, commit changes, then open a pull request.
- _probably some other things too_

## Example

This example shows:

- creating a branch on a repo
- getting a CSV file from the repo
- adding a row to the csv
- committing the change to the branch
- creating a pull request against the `master` branch

```js
var gh = require('editdata-github')
var branch = 'refs/heads/test-' + Date.now()
createBranch()

function createBranch () {
  var options = {
    owner: 'editdatabot',
    repo: 'test',
    ref: branch,
    sha: 'b6ceaa8cd4ae8f87c620f2504a0d3a42bd7d923f'
  }

  gh.branch.create(options, function (err, res, body) {
    if (err) return console.log(err)
    editCSV()
  })
}

function editCSV () {
  var options = {
    owner: 'editdatabot',
    repo: 'test',
    path: 'test.csv',
    message: 'add a row',
    branch: branch
  }

  gh.contents.getCSV(options, function (err, res, data) {
    if (err) return console.log(err)

    options.data = data
    options.data.push({ a: '4', b: '5', c: '6' })
    options.message = 'add a row'
    options.branch = branch
    options.sha = res.sha

    gh.contents.putCSV(options, function (err, res, body) {
      if (err) return console.log(err)
      createPR(branch)
    })
  })
}

function createPR (branch) {
  var options = {
    owner: 'editdatabot',
    repo: 'test',
    title: 'this is a pull request',
    user: 'editdatabot',
    head: branch,
    base: 'master',
    body: 'this is the body message of a pull request'
  }

  gh.pullRequest.create(options, function (err, res, body) {
    if (err) return console.log(err)
  })
}
```

## Status
Still under heavy development. Functionality is being pulled out of existing EditData projects like [editdata.org](http://github.com/editdata/editdata.org) and [submit-data](http://github.com/editdata/submit-data)

The above example is still too verbose, though much of the verbosity is due to the options passed to the methods.

Expect the API to change considerably.

## Tests
Right now tests rely on an access token & collaborator access on []().

If you're interested in contributing, make an issue on this repository.

### Running the tests:

```bash
npm test
```

## Install

```bash
npm install --save editdata-github
```

## license
MIT
