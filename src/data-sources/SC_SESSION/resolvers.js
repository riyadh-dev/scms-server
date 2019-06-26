const Controller = require('./controller');

module.exports = {

	Query: {
		SCSessionsByYear: (_, { year }) => Controller.getSCSessionsByYear(year),
		activeSCSession: () => Controller.getActiveSCSession(),
		SCSessionsStatistics: (_, { _id }) => Controller.getSCSessionsStatistics(_id),
		SCYearlyReportStatistics: (_, { year }) => Controller.getSCYearlyReportStatistics(year),
		SCYearlyReports: () => Controller.getSCYearlyReports(),
		SCYearlyReportsForStats: () => Controller.getSCYearlyReportsForStats()
	},

	Mutation: {
		addSCSession: (_, { input }) => Controller.addSCSession(input),
		setMettingAgenda: (_, { input }) => Controller.setMettingAgenda(input),
	}

};