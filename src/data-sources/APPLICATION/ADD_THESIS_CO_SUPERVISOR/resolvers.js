const Controller = require('./controller');

module.exports = {
	Mutation: {
		submitAddThesisCoSupervisorApplication: (_, { input }, context) => Controller.submitAddThesisCoSupervisorApplication(input, context),
		reSubmitAddThesisCoSupervisorApplication: (_, { input }, context) => Controller.reSubmitAddThesisCoSupervisorApplication(input, context)
	},
};