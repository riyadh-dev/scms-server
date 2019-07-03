const ThesisTitleChangeApplication = require('./model');
const { canUserSubmit } = require('../utils');

module.exports = {
	submitThesisTitleChangeApplication: async (input, context) => {
		const activeSession = await canUserSubmit(context.user._id, 'THESIS_TITLE_CHANGE');
		return await ThesisTitleChangeApplication.create({
			applicant: context.user._id,
			session: activeSession._id,
			...input
		});
	},

	reSubmitThesisTitleChangeApplication: async (input) => {
		const { applicationID: _id, ...application } = input;
		return await ThesisTitleChangeApplication.findByIdAndUpdate(_id, application, { new: true });
	}
};
