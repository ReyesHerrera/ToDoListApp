var expect = require('chai').expect;
const tasks = require('../models/users');

describe('UserSchema.greet()', function() {
  it('should display greeting for this user', function() {

    var testGreet = 'Hello, ' + this.firstName;

    var actualGreet = UserSchema.greet();

    expect(actualGreet).to.be.equal(testGreet);
  });
  
});
