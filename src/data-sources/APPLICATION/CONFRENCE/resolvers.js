const Controller = require('./controller');

module.exports = {
	Mutation: {
		submitConfrenceApplication: (_, { input }, context) => Controller.submitConfrenceApplication(input, context),
		reSubmitConfrenceApplication: (_, { input }, context) => Controller.reSubmitConfrenceApplication(input, context),
	},
};