const { Schema, model } = require('mongoose');
const dayjs = require('dayjs');

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

const sessionSchema = new Schema({
	submissionsStartDate: Date,
	submissionsEndDate: Date,
	mettingDate: Date,
	mettingAgenda: [String],
});

sessionSchema.virtual('onSubmissionPeriod').get(function () {
	const now = Date.now();
	return this.submissionsStartDate < now && this.submissionsEndDate > now;
});

sessionSchema.virtual('onReviewPeriod').get(function () {
	const now = Date.now();
	return this.submissionsEndDate < now && this.mettingDate > now;
});

sessionSchema.virtual('onMettingDate').get(function () {
	const now = Date.now();
	return dayjs(this.mettingDate).isSame(now, 'day');
});

const yearlyReportSchema = new Schema({
	year: { type: String, index: true },
	sessions: [sessionSchema],
	statistics
});

module.exports = model('YearlyReport', yearlyReportSchema);