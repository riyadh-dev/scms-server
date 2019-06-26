const Announcement = require('./model');

module.exports = {
	getAnnouncements: async () => {
		return await Announcement.find();
	},
	addAnnouncement: async input => {
		return await Announcement.create(input);
	},

	editAnnouncement: async ({ announcementID: _id, ...announcement }) => {
		return await Announcement.findByIdAndUpdate(_id, announcement, { new: true });
	},

	deleteAnnouncement: async (_id) => {
		await Announcement.findByIdAndDelete(_id);
		return true;
	}
};
