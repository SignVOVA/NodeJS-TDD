var fs = require('co-fs');

var userFile = './users.json';

module.exports = {
  users : {
    get: function *() {
      var data = yield fs.readFile(userFile, 'utf-8');
      return JSON.parse(data);
    },
    save: function *(user) {
      var users = yield this.get();
      //console.log('Users status on GET: ' + users);

      users.push(user);
      //console.log('Users status after PUSH: ' + users);

      yield fs.writeFile(userFile, JSON.stringify(users));
    }
  }
}
