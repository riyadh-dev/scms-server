const ConfirmationApplication = require('./model');
const { storeUploadLocaly } = require('../utils');
const { canUserSubmit } = require('../utils');

module.exports = {
	submitConfirmationApplication: async (input, context) => {
		const activeSCSession = await canUserSubmit(context.user._id, 'CONFIRMATION');
		const { teachingActivitiesFile, ...applicationFields } = input;
		const { createReadStream } = await teachingActivitiesFile;

		const readStream = createReadStream();
		const { link } = await storeUploadLocaly(readStream);

		return await ConfirmationApplication.create({
			applicant: context.user._id,
			SCSession: activeSCSession._id,
			...applicationFields,
			teachingActivitiesLink: link
		});
	},

	/* 	updateConfirmationApplication: async (input, context) => {
		const { teachingActivitiesFile, applicationID: _id, ...applicationFields } = input;
		const { createReadStream } = await teachingActivitiesFile;

		const readStream = createReadStream();
		const { link } = await storeUploadLocaly(readStream);

		return await ConfirmationApplication.findByIdAndUpdate(_id, {
			...applicationFields,
		});
	}, */

	/* 	submitConfirmationApplication: async (input, context) => {
			const { teachingActivitiesFile, ...applicationFields } = input;
			const { createReadStream } = await teachingActivitiesFile;
	
			const readStream = createReadStream();
			const run = storeUploadInCloud(readStream, async res => {
				return await ConfirmationApplication.create({
					applicant: context.user._id,
					...applicationFields,
					teachingActivitiesLink: 'link'
				});
			});
			console.log(run);
			return run;
	
		} */
};
