// To run test type 'mocha --harmony' within project structure.
require('co-mocha');

var should = require('should');
var data = require('../user-data');
var fs = require('co-fs');

// Before test is run we clearing the json file
before(function *() {
  yield fs.writeFile('./users.json', '[]');
});

describe('user data', function() {
  // Asterics marks a funciton as a generator.
  it('should have +1 user count after saving', function*() {
    var users = yield data.users.get();

    yield data.users.save({ name: 'Sam'});

    var newUsers = yield data.users.get();

    newUsers.length.should.equal(users.length + 1);
  });
});
