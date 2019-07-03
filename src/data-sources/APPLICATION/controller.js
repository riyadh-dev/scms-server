const Application = require('./model');
const AddThesisCoSupervisorApplication = require('./ADD_THESIS_CO_SUPERVISOR/model');
const ConferenceApplication = require('./CONFRENCE/model');
const ConfirmationApplication = require('./CONFIRMATION/model');
const InternshipApplication = require('./INTERNSHIP/model');
const PromotionApplication = require('./PROMOTION/model');
const ThesisTitleChangeApplication = require('./THESIS_TITLE_CHANGE/model');

module.exports = {
	getApplications: async () => await Application.find().populate('reviews.reviewer applicant'),

	getApplication: async _id => await Application.findById(_id).populate('reviews.reviewer applicant'),

	getApplicationsByApplicant: async _id => await Application.find({ applicant: _id }),

	giveApplicationFinalDecision: async ({ applicationID: _id, finalDecision }) => {
		return await Application.findByIdAndUpdate(_id, { finalDecision, treated: true }, { new: true });
	},

	getApplicationsBySessionAndType: async ({ SessionID, applicationType }) => {
		const Application = {
			ADD_THESIS_CO_SUPERVISOR: AddThesisCoSupervisorApplication,
			CONFIRMATION: ConfirmationApplication,
			CONFRENCE: ConferenceApplication,
			INTERNSHIP: InternshipApplication,
			PROMOTION: PromotionApplication,
			THESIS_TITLE_CHANGE: ThesisTitleChangeApplication
		};
		return await Application[applicationType].find({ session: SessionID }).populate('reviews.reviewer applicant');
	},
};