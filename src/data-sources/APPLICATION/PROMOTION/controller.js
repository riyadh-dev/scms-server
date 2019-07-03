const PromotionApplication = require('./model');
const { storeUploadLocaly } = require('../utils');
const { canUserSubmit } = require('../utils');

module.exports = {
	submitPromotionApplication: async (input, context) => {
		const activeSession = await canUserSubmit(context.user._id, 'PROMOTION');
		const { teachingActivitiesFile, ...applicationFields } = input;
		const { createReadStream } = await teachingActivitiesFile;

		const readStream = createReadStream();
		const { link } = await storeUploadLocaly(readStream);

		return await PromotionApplication.create({
			applicant: context.user._id,
			session: activeSession._id,
			...applicationFields,
			teachingActivitiesLink: link
		});
	},

	reSubmitPromotionApplication: async (input) => {
		const { applicationID: _id, teachingActivitiesFile, ...applicationFields } = input;
		const { createReadStream } = await teachingActivitiesFile;

		const readStream = createReadStream();
		const { link } = await storeUploadLocaly(readStream);

		return await PromotionApplication.findByIdAndUpdate(_id, {
			...applicationFields,
			teachingActivitiesLink: link
		}, { new: true });
	}
};
