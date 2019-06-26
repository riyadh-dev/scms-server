const Application = require('../APPLICATION/model');
const SCYearlyReport = require('./model');
const dayjs = require('dayjs');

const applicationsStatistics = applications => {
	const statisticsByApplicationType = {
		applications: 0,
		accepted: 0,
		electronicsDepartment: 0,
		fundamentalEducationDepartment: 0,
		powerAndContorlDepartment: 0,
		controlMajor: 0,
		electronicsMajor: 0,
		powerMajor: 0,
		telecommunicationMajor: 0,
		female: 0,
		male: 0
	};
	const statistics = {
		addThesisCoSupervisorApplication: { ...statisticsByApplicationType },
		confirmationApplication: { ...statisticsByApplicationType },
		confrenceApplication: { ...statisticsByApplicationType },
		internshipApplication: { ...statisticsByApplicationType },
		promotionApplication: { ...statisticsByApplicationType },
		thesisTitleChangeApplication: { ...statisticsByApplicationType },
	};




	const getApptype = (type) => {
		switch (type) {
		case 'AddThesisCoSupervisorApplication': return 'addThesisCoSupervisorApplication';
		case 'ConfirmationApplication': return 'confirmationApplication';
		case 'ConfrenceApplication': return 'confrenceApplication';
		case 'InternshipApplication': return 'internshipApplication';
		case 'PromotionApplication': return 'promotionApplication';
		case 'ThesisTitleChangeApplication': return 'thesisTitleChangeApplication';
		}
	};

	return applications.reduce((statistics, application) => {
		const { department, major, gender } = application.applicant;
		const type = application.type;
		const appType = getApptype(type);

		statistics[appType].applications++;
		if (application.finalDecision) statistics[appType].accepted++;

		switch (department) {
		case 'ELECTRONICS': statistics[appType].electronicsDepartment++; break;
		case 'FUNDAMENTAL_EDUCATION': statistics[appType].fundamentalEducationDepartment++; break;
		case 'POWER_AND_CONTROL': statistics[appType].powerAndContorlDepartment++; break;
		}
		switch (major) {
		case 'CONTROL': statistics[appType].controlMajor++; break;
		case 'ELECTRONICS': statistics[appType].electronicsMajor++; break;
		case 'POWER': statistics[appType].powerMajor++; break;
		case 'TELECOMMUNICATION': statistics[appType].telecommunicationMajor++; break;
		}
		switch (gender) {
		case 'FEMALE': statistics[appType].female++; break;
		case 'MALE': statistics[appType].male++; break;
		}

		return statistics;
	}, statistics);
};

module.exports = {
	getSCSessionsByYear: async year => {
		const anSCYearlyReport = await SCYearlyReport.findOne({ year });
		return anSCYearlyReport.SCSessions;
	},
	getActiveSCSession: async () => {
		const now = new Date();
		const year = now.getFullYear().toString();
		const anSCYearlyReport = await SCYearlyReport.findOne({ year });
		if (!anSCYearlyReport) return null;
		return anSCYearlyReport.SCSessions.filter(SCSession =>
			SCSession.submissionsStartDate < now &&
			SCSession.mettingDate > dayjs(now).subtract(1, 'day').$d
		)[0];
	
		
	},
	getSCSessionsStatistics: async _id => {
		const yearlyReport = await SCYearlyReport.findOne({ 'SCSessions._id': _id });

		if (!yearlyReport)
			throw new Error('No Such Session');

		const now = Date.now();
		const SCSession = yearlyReport.SCSessions.id(_id);
		if (SCSession.mettingDate > now)
			throw new Error('Session Still Active');

		if (SCSession.hasStatistics)
			return false;

		const applications = await Application.find({ SCSession: _id }).populate('applicant');
		const statistics = applicationsStatistics(applications);
		SCSession.hasStatistics = true;
		SCSession.statistics = statistics;
		const newSCSessions = yearlyReport.SCSessions.map(session => {
			if (session._id === _id) return SCSession;
			return session;
		});
		yearlyReport.SCSessions = newSCSessions;
		await yearlyReport.save();
		return true;
	},
	getSCYearlyReportStatistics: async year => {
		const thisYear = new Date().getFullYear();
		if (thisYear <= year)
			throw new Error('Cant Get Stats Yet');

		const yearlyReport = await SCYearlyReport.findOne({ year });

		if (!yearlyReport)
			throw new Error('No Such Yearly Report');

		//if (yearlyReport.hasStatistics)
		//return yearlyReport;

		const filterCondition = yearlyReport.SCSessions.map(session => (
			{ SCSession: session._id }
		));

		const applications = await Application.find({ $or: filterCondition }).populate('applicant');
		const statistics = applicationsStatistics(applications);
		yearlyReport.hasStatistics = true;
		yearlyReport.statistics = statistics;
		await yearlyReport.save();
		return yearlyReport;
	},
	addSCSession: async input => {
		const year = new Date(input.submissionsStartDate).getFullYear().toString();
		const anSCYearlyReport = await SCYearlyReport.findOne({ year });
		if (anSCYearlyReport) {
			anSCYearlyReport.SCSessions.unshift(input);
			await anSCYearlyReport.save();
			return anSCYearlyReport.SCSessions[0];
		}
		const newSCYearlyReport = await SCYearlyReport.create({
			year,
			SCSessions: [input]
		});
		return newSCYearlyReport.SCSessions[0];
	},
	getSCYearlyReportsForStats: async () => {
		const thisYear = new Date().getFullYear().toString();
		return await SCYearlyReport.find({ year: { $ne: thisYear } }).sort({ 'year': -1 });
	},
	getSCYearlyReports: async () => {
		//const thisYear = new Date().getFullYear().toString();
		return await SCYearlyReport.find().sort({ 'year': -1 });
	},
	setMettingAgenda: async ({ SCSessionID, mettingAgenda }) => {
		const now = new Date();
		const year = now.getFullYear().toString();
		const anSCYearlyReport = await SCYearlyReport.findOneAndUpdate({ year, 'SCSessions._id': SCSessionID }, {
			$set: { 'SCSessions.$.mettingAgenda': mettingAgenda }
		}, { new: true });
		return anSCYearlyReport.SCSessions.filter(session => session._id.equals(SCSessionID))[0];
	}
};

