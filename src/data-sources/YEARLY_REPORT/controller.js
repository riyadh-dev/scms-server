const Application = require('../APPLICATION/model');
const YearlyReport = require('./model');
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
	getActiveSession: async () => {
		const now = new Date();
		const year = now.getFullYear().toString();
		const yearlyReport = await YearlyReport.findOne({ year });
		if (!yearlyReport) return null;
		return yearlyReport.sessions.filter(session =>
			session.submissionsStartDate < now &&
			session.mettingDate > dayjs(now).subtract(1, 'day').$d
		)[0];
	},
	
	getYearlyReportStatistics: async year => {
		const thisYear = new Date().getFullYear();
		if (thisYear <= year)
			throw new Error('Cant Get Stats Yet');

		const yearlyReport = await YearlyReport.findOne({ year });

		if (!yearlyReport)
			throw new Error('No Such Yearly Report');

		if (yearlyReport.toObject().statistics) 
			return yearlyReport;
		
		const filterCondition = yearlyReport.sessions.map(session => (
			{ session: session._id }
		));

		const applications = await Application.find({ $or: filterCondition }).populate('applicant');
		const statistics = applicationsStatistics(applications);
		yearlyReport.statistics = statistics;
		await yearlyReport.save();
		return yearlyReport;
	},

	addSession: async input => {
		const year = new Date(input.submissionsStartDate).getFullYear().toString();
		const yearlyReport = await YearlyReport.findOne({ year });
		if (yearlyReport) {
			yearlyReport.sessions.unshift(input);
			await yearlyReport.save();
			return yearlyReport.sessions[0];
		}
		const newYearlyReport = await YearlyReport.create({
			year,
			sessions: [input]
		});
		return newYearlyReport.sessions[0];
	},

	getYearlyReports: async () => {
		return await YearlyReport.find().sort({ 'year': -1 });
	},

	setMettingAgenda: async ({ sessionID, mettingAgenda }) => {
		const now = new Date();
		const year = now.getFullYear().toString();
		const yearlyReport = await YearlyReport.findOneAndUpdate({ year, 'sessions._id': sessionID }, {
			$set: { 'sessions.$.mettingAgenda': mettingAgenda }
		}, { new: true });
		return yearlyReport.sessions.filter(session => session._id.equals(sessionID))[0];
	}
};

