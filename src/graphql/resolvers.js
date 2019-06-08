const merge = require('deepmerge');
const User = require('../data-sources/USER/resolver');
const Application = require('../data-sources/APPLICATION/resolvers');
const ConfrenceApplication = require('../data-sources/APPLICATION/CONFRENCE/resolvers');

module.exports = merge.all([
	User,
	Application,
	ConfrenceApplication,
]);