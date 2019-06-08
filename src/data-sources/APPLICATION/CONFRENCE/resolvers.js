const Controller = require('./controller');

module.exports = {
	Query: {
		confrenceApplications: (_, __, context) => Controller.getConfrenceApplications(context),
		/* confrenceApplicationsByYear: (_, { submissionYear }, context) => Controller.getConfrenceApplicationsByYear(submissionYear, context), */
	},

	Mutation: {
		submitConfrenceApplication: (_, { input }, context) => Controller.submitConfrenceApplication(input, context),
	},
};