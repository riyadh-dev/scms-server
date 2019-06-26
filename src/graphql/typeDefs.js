const path = require('path');
const fs = require('fs');

const User = fs.readFileSync(path.join(__dirname, '../data-sources/USER/typeDefs.graphql'), 'utf8');
const Application = fs.readFileSync(path.join(__dirname, '../data-sources/APPLICATION/typeDefs.graphql'), 'utf8');
const AddThesisCoSupervisorApplication = fs.readFileSync(path.join(__dirname, '../data-sources/APPLICATION/ADD_THESIS_CO_SUPERVISOR/typeDefs.graphql'), 'utf8');
const ConfirmationApplication = fs.readFileSync(path.join(__dirname, '../data-sources/APPLICATION/CONFIRMATION/typeDefs.graphql'), 'utf8');
const ConfrenceApplication = fs.readFileSync(path.join(__dirname, '../data-sources/APPLICATION/CONFRENCE/typeDefs.graphql'), 'utf8');
const InternshipApplication = fs.readFileSync(path.join(__dirname, '../data-sources/APPLICATION/INTERNSHIP/typeDefs.graphql'), 'utf8');
const PromotionApplication = fs.readFileSync(path.join(__dirname, '../data-sources/APPLICATION/PROMOTION/typeDefs.graphql'), 'utf8');
const ThesisTitleChangeApplication = fs.readFileSync(path.join(__dirname, '../data-sources/APPLICATION/THESIS_TITLE_CHANGE/typeDefs.graphql'), 'utf8');
const SCSession = fs.readFileSync(path.join(__dirname, '../data-sources/SC_SESSION/typeDefs.graphql'), 'utf8');
const Announcement = fs.readFileSync(path.join(__dirname, '../data-sources/ANNOUNCEMENT/typeDefs.graphql'), 'utf8');

module.exports = ([
	User,
	SCSession,
	Announcement,
	Application,
	AddThesisCoSupervisorApplication,
	ConfirmationApplication,
	ConfrenceApplication,
	InternshipApplication,
	PromotionApplication,
	ThesisTitleChangeApplication
]);