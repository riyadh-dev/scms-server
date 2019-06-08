const path = require('path');
const fs = require('fs');

const User = fs.readFileSync(path.join(__dirname, '../data-sources/USER/typeDefs.graphql'), 'utf8');
const Application = fs.readFileSync(path.join(__dirname, '../data-sources/APPLICATION/typeDefs.graphql'), 'utf8');
const ConfrenceApplication = fs.readFileSync(path.join(__dirname, '../data-sources/APPLICATION/CONFRENCE/typeDefs.graphql'), 'utf8');

module.exports = ([
	User,
	Application,
	ConfrenceApplication
]);