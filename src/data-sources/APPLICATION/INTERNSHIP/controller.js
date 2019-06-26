const InternshipApplication = require('./model');
const { storeUploadLocaly } = require('../utils');
const { canUserSubmit } = require('../utils');

module.exports = {
	submitInternshipApplication: async (input, context) => {
		const activeSCSession = await canUserSubmit(context.user._id, 'INTERNSHIP');
		const { workPlanFile, ...applicationFields } = input;
		const { createReadStream } = await workPlanFile;

		const readStream = createReadStream();
		const { link } = await storeUploadLocaly(readStream);

		return await InternshipApplication.create({
			applicant: context.user._id,
			SCSession: activeSCSession._id,
			...applicationFields,
			workPlanLink: link
		});
	}
};
