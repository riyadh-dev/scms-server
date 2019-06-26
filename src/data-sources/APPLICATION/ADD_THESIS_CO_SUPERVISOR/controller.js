const AddThesisCoSupervisorApplication = require('./model');
const { canUserSubmit } = require('../utils');

module.exports = {
	submitAddThesisCoSupervisorApplication: async (input, context) => {
		const activeSCSession = await canUserSubmit(context.user._id, 'ADD_THESIS_CO_SUPERVISOR');
		const app =  await AddThesisCoSupervisorApplication.create({
			applicant: context.user._id,
			SCSession: activeSCSession._id,
			...input
		});
		return app;
	},

	reSubmitAddThesisCoSupervisorApplication: async (input) => {
		const { applicationID: _id, ...application } = input;
		return await AddThesisCoSupervisorApplication.findByIdAndUpdate(_id, application, { new: true });
	}
};
