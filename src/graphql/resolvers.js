const merge = require('deepmerge');
const User = require('../data-sources/USER/resolvers');
const Application = require('../data-sources/APPLICATION/resolvers');
const AddThesisCoSupervisorApplication = require('../data-sources/APPLICATION/ADD_THESIS_CO_SUPERVISOR/resolvers');
const ConfirmationApplication = require('../data-sources/APPLICATION/CONFIRMATION/resolvers');
const ConfrenceApplication = require('../data-sources/APPLICATION/CONFRENCE/resolvers');
const InternshipApplication = require('../data-sources/APPLICATION/INTERNSHIP/resolvers');
const PromotionApplication = require('../data-sources/APPLICATION/PROMOTION/resolvers');
const ThesisTitleChangeApplication = require('../data-sources/APPLICATION/THESIS_TITLE_CHANGE/resolvers');
const YearlyReport = require('../data-sources/YEARLY_REPORT/resolvers');
const Announcement = require('../data-sources/ANNOUNCEMENT/resolvers');

module.exports = merge.all([
	User,
	YearlyReport,
	Announcement,
	Application,
	AddThesisCoSupervisorApplication,
	ConfirmationApplication,
	ConfrenceApplication,
	InternshipApplication,
	PromotionApplication,
	ThesisTitleChangeApplication
]);