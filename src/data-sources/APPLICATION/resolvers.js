const Controller = require('./controller');

module.exports = {
	Application: {
		__resolveType(application) {
			return application.type;
		}
	},
	Query: {
		applications: () => Controller.getApplications(),
		application: (_, { _id }) => Controller.getApplication(_id),
		applicationsByApplicant: (_, { _id }) => Controller.getApplicationsByApplicant(_id),
		applicationsBySessionAndType: (_, { input }) => Controller.getApplicationsBySessionAndType(input)
	},
	Mutation: {
		reviewApplication: (_, { input }, context) => Controller.reviewApplication(input, context),
		giveApplicationFinalDecision: (_, { input }) => Controller.giveApplicationFinalDecision(input)
	}
};
