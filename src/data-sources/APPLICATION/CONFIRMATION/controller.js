const ConfirmationApplication = require('./model');
const { storeUploadLocaly } = require('../utils');
const { canUserSubmit } = require('../utils');

module.exports = {
	submitConfirmationApplication: async (input, context) => {
		const activeSession = await canUserSubmit(context.user._id, 'CONFIRMATION');
		const { teachingActivitiesFile, ...applicationFields } = input;
		const { createReadStream } = await teachingActivitiesFile;

		const readStream = createReadStream();
		const { link } = await storeUploadLocaly(readStream);

		return await ConfirmationApplication.create({
			applicant: context.user._id,
			session: activeSession._id,
			...applicationFields,
			teachingActivitiesLink: link
		});
	},

	reSubmitConfirmationApplication: async (input) => {
		const { applicationID: _id, teachingActivitiesFile, ...applicationFields } = input;
		const { createReadStream } = await teachingActivitiesFile;

		const readStream = createReadStream();
		const { link } = await storeUploadLocaly(readStream);

		return await ConfirmationApplication.findByIdAndUpdate(_id, {
			...applicationFields,
			teachingActivitiesLink: link
		}, { new: true });
	}
};
