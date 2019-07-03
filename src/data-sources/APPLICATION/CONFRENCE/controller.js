const ConfrenceApplication = require('./model');
const { canUserSubmit } = require('../utils');
module.exports = {
	submitConfrenceApplication: async (input, context) => {
		const activeSession = await canUserSubmit(context.user._id, 'CONFRENCE');
		return await ConfrenceApplication.create({
			applicant: context.user._id,
			session: activeSession._id,
			...input
		});
	},

	reSubmitConfrenceApplication: async (input) => {
		const { applicationID: _id, ...application } = input;
		return await ConfrenceApplication.findByIdAndUpdate(_id, application, { new: true });
	}
};
