const Application = require('./model');

module.exports = {
	getApplications: async () => await Application.find().populate('reviews.reviewer applicant'),
	getApplication: async _id => await Application.findById(_id).populate('reviews.reviewer applicant'),
	getApplicationsByApplicant: async _id => await Application.find({ applicant: _id }),
	reviewApplication: async (input, context) => {
		await Application.findByIdAndUpdate(
			input.applicationID,
			{ $pull: { reviews: { reviewer: context._id } } }
		);
		return await Application.findByIdAndUpdate(
			input.applicationID,
			{
				$push: {
					reviews: {
						reviewer: context._id,
						decision: input.decision,
						comment: input.comment
					}
				}
			},
			{ new: true }
		);
	}
};