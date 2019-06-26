const Controller = require('./controller');

module.exports = {
	Query: {
		announcements: () => Controller.getAnnouncements(),
	},

	Mutation: {
		addAnnouncement: (_, { input }) => Controller.addAnnouncement(input),
		editAnnouncement:(_, { input }) => Controller.editAnnouncement(input),
		deleteAnnouncement:(_, { _id }) => Controller.deleteAnnouncement(_id),
	}

};