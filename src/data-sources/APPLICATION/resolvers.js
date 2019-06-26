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
		applicationsByType: (_, { applicationType }) => Controller.getApplicationsByType(applicationType),
		applicationsBySCSession: (_, { _id }) => Controller.getApplicationsBySCSession(_id),
		applicationsBySCSessionAndType: (_, { input }) => Controller.getApplicationsBySCSessionAndType(input)
	},
	Mutation: {
		reviewApplication: (_, { input }, context) => Controller.reviewApplication(input, context),
		giveApplicationFinalDecision: (_, { input }) => Controller.giveApplicationFinalDecision(input)
	}
};
