const { Schema, model } = require('mongoose');

const announcementSchema = new Schema({
	title: String,
	content: String,
}, { timestamps: true });

module.exports = model('Announcement', announcementSchema);