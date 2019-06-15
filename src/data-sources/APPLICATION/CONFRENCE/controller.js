const confrenceApplication = require('./model');

module.exports = {
	getConfrenceApplications: async () => {
		return await confrenceApplication.find().populate('applicant reviews.reviewer');
	},

	submitConfrenceApplication: async (input, context) => {
		return await confrenceApplication.create({
			applicant: context._id,
			...input
		});
	}
};
