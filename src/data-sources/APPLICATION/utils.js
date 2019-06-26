const { createWriteStream, readdirSync, createReadStream } = require('fs');
const uuidv4 = require('uuid/v4');
const SCYearlyReport = require('../SC_SESSION/model');
const cloudinary = require('cloudinary').v2;
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

const storeUploadInCloud = (readStream, callbackFunc) => {
	const writeStream = cloudinary.uploader.upload_stream((error, result) => {
		return callbackFunc(result);
	});
	readStream
		.on('data', data => writeStream.write(data))
		.on('end', () => writeStream.end());
};

const canUserSubmit = async (userID, applicationType) => {
	const now = new Date();
	const year = now.getFullYear().toString();
	const anSCYearlyReport = await SCYearlyReport.findOne({ year });
	if (!anSCYearlyReport) return null;
	const activeSCSession = anSCYearlyReport.SCSessions.filter(SCSession =>
		SCSession.submissionsStartDate < now &&
		SCSession.mettingDate > now
	)[0];

	if (!activeSCSession)
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
		SCSession: activeSCSession._id
	});

	if (didSubmit)
		throw new ForbiddenError('You Already Submited');

	return activeSCSession;
};

module.exports = {
	storeUploadLocaly,
	storeUploadInCloud,
	canUserSubmit
};