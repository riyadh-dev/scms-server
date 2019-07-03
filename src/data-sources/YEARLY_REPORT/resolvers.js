const Controller = require('./controller');

module.exports = {

	Query: {
		activeSession: () => Controller.getActiveSession(),
		yearlyReportStatistics: (_, { year }) => Controller.getYearlyReportStatistics(year),
		yearlyReports: () => Controller.getYearlyReports()
	},

	Mutation: {
		addSession: (_, { input }) => Controller.addSession(input),
		setMettingAgenda: (_, { input }) => Controller.setMettingAgenda(input)
	}

};