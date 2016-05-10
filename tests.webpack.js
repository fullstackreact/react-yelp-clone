require('babel-polyfill');
// some setup first

var chai = require('chai');
var chaiEnzyme = require('chai-enzyme');

chai.use(chaiEnzyme())

var context = require.context('./src', true, /\.spec\.js$/);
context.keys().forEach(context);
