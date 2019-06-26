const { Schema, model } = require('mongoose');

const statisticsByApplicationType = {
	applications: Number,
	accepted: Number,

	electronicsDepartment: Number,
	fundamentalEducationDepartment: Number,
	powerAndContorlDepartment: Number,

	controlMajor: Number,
	electronicsMajor: Number,
	powerMajor: Number,
	telecommunicationMajor: Number,

	female: Number,
	male: Number
};

const statistics = {
	addThesisCoSupervisorApplication: statisticsByApplicationType,
	confirmationApplication: statisticsByApplicationType,
	confrenceApplication: statisticsByApplicationType,
	internshipApplication: statisticsByApplicationType,
	promotionApplication: statisticsByApplicationType,
	thesisTitleChangeApplication: statisticsByApplicationType,
};

const SCSessionSchema = new Schema({
	submissionsStartDate: Date,
	submissionsEndDate: Date,
	mettingDate: Date,
	mettingAgenda: [String],
	hasStatistics: { type: Boolean, default: false },
	statistics
});

SCSessionSchema.virtual('canSubmit').get(function () {
	const now = Date.now();
	return this.submissionsStartDate < now && this.submissionsEndDate > now ? true : false;
});

SCSessionSchema.virtual('canSetAgenda').get(function () {
	const now = Date.now();
	return this.mettingDate > now && this.submissionsEndDate < now ? true : false;
});

const SCYearlyReportSchema = new Schema({
	year: { type: String, index: true },
	SCSessions: [SCSessionSchema],
	hasStatistics: { type: Boolean, default: false },
	statistics
});

module.exports = model('SCYearlyReport', SCYearlyReportSchema);