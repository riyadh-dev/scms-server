const { createWriteStream, readdirSync } = require('fs');
const uuidv4 = require('uuid/v4');
const YearlyReport = require('../YEARLY_REPORT/model');
const { ForbiddenError } = require('apollo-server-express');
const AddThesisCoSupervisorApplication = require('./ADD_THESIS_CO_SUPERVISOR/model');
const ConferenceApplication = require('./CONFRENCE/model');
const ConfirmationApplication = require('./CONFIRMATION/model');
const InternshipApplication = require('./INTERNSHIP/model');
const PromotionApplication = require('./PROMOTION/model');
const ThesisTitleChangeApplication = require('./THESIS_TITLE_CHANGE/model');

const storeUploadLocaly = readStream => {
	const localPath = 'C:/Users/RiNDo/WebDev/Projects/SCMS/uploads/';
	const ServerUploadsURL = 'http://localhost:4000/uploads/';
	const files = readdirSync(localPath);
	let filename = uuidv4() + '.pdf';
	while (files.includes(filename)) {
		filename = uuidv4() + '.pdf';
	}
	const filePath = localPath + filename;
	const fileLink = ServerUploadsURL + filename;
	return new Promise((resolve, reject) =>
		readStream
			.pipe(createWriteStream(filePath))
			.on('finish', () => resolve({ link: fileLink }))
			.on('error', () => reject())
	);
};

const canUserSubmit = async (userID, applicationType) => {
	const now = new Date();
	const year = now.getFullYear().toString();
	const yearlyReport = await YearlyReport.findOne({ year });
	if (!yearlyReport) return null;
	const activeSession = yearlyReport.sessions.filter(session =>
		session.submissionsStartDate < now &&
		session.mettingDate > now
	)[0];

	if (!activeSession)
		throw new ForbiddenError('Submissions Are Closed');

	const Application = {
		ADD_THESIS_CO_SUPERVISOR: AddThesisCoSupervisorApplication,
		CONFIRMATION: ConfirmationApplication,
		CONFRENCE: ConferenceApplication,
		INTERNSHIP: InternshipApplication,
		PROMOTION: PromotionApplication,
		THESIS_TITLE_CHANGE: ThesisTitleChangeApplication
	};

	const didSubmit = await Application[applicationType].findOne({
		applicant: userID,
		session: activeSession._id
	});

	if (didSubmit)
		throw new ForbiddenError('You Already Submited');

	return activeSession;
};

module.exports = {
	storeUploadLocaly,
	canUserSubmit
};