const InternshipApplication = require('./model');
const { storeUploadLocaly } = require('../utils');
const { canUserSubmit } = require('../utils');

module.exports = {
	submitInternshipApplication: async (input, context) => {
		const activeSession = await canUserSubmit(context.user._id, 'INTERNSHIP');
		const { workPlanFile, ...applicationFields } = input;
		const { createReadStream } = await workPlanFile;

		const readStream = createReadStream();
		const { link } = await storeUploadLocaly(readStream);

		return await InternshipApplication.create({
			applicant: context.user._id,
			session: activeSession._id,
			...applicationFields,
			workPlanLink: link
		});
	},

	reSubmitInternshipApplication: async (input) => {
		const { applicationID: _id, workPlanFile, ...applicationFields } = input;
		const { createReadStream } = await workPlanFile;

		const readStream = createReadStream();
		const { link } = await storeUploadLocaly(readStream);

		return await InternshipApplication.findByIdAndUpdate(_id, {
			...applicationFields,
			workPlanLink: link
		}, { new: true });
	}
};
