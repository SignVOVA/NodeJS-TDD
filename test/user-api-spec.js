// To run test type 'mocha --harmony' within project structure.
require('co-mocha');

var should = require('should');
var data = require('../user-data');
var fs = require('co-fs');
var api = require('../user-web.js');
var request = require('co-supertest').agent(api.listen());

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

describe('user web', function() {
  it('should have +1 user count after saving', function* () {
    //'data' renamed to 'res' for response
    var users = (yield request.get('/user').expect(200).end()).body;

    yield data.users.save({ name: 'John'});

    var newUsers = (yield request.get('/user').expect(200).end()).body;

    newUsers.length.should.equal(users.length + 1);
  });
});
