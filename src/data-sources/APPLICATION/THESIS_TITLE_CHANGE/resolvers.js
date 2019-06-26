const Controller = require('./controller');

module.exports = {
	Mutation: {
		submitThesisTitleChangeApplication: (_, { input }, context) => Controller.submitThesisTitleChangeApplication(input, context),
		reSubmitThesisTitleChangeApplication: (_, { input }, context) => Controller.reSubmitThesisTitleChangeApplication(input, context),
	},
};