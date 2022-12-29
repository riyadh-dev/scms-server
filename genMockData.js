const User = require('./src/data-sources/USER/model');
const InternshipApplication = require('./src/data-sources/APPLICATION/INTERNSHIP/model');
const AddThesisCoSupervisorApplication = require('./src/data-sources/APPLICATION/ADD_THESIS_CO_SUPERVISOR/model');
const ThesisTitleChangeApplication = require('./src/data-sources/APPLICATION/THESIS_TITLE_CHANGE/model');
const ConferenceApplication = require('./src/data-sources/APPLICATION/CONFRENCE/model');
const Application = require('./src/data-sources/APPLICATION/model');
const PromotionApplication = require('./src/data-sources/APPLICATION/PROMOTION/model');
const ConfirmationApplication = require('./src/data-sources/APPLICATION/CONFIRMATION/model');
const YearlyReport = require('./src/data-sources/YEARLY_REPORT/model');
const Announcements = require('./src/data-sources/ANNOUNCEMENT/model');
const faker = require('faker');
const { connect } = require('mongoose');
const dayjs = require('dayjs');

const Role = ['FACULTY_MEMBER', 'PHD_STUDENT', 'SC_MEMBER', 'SC_PRESIDENT'];

const Gender = ['FEMALE', 'MALE'];

const Department = [
	'POWER_AND_CONTROL',
	'ELECTRONICS',
	'FUNDAMENTAL_EDUCATION',
];

const Major = ['ELECTRONICS', 'POWER', 'CONTROL', 'TELECOMMUNICATION'];

const genUsers = async (number, roles) => {
	const users = [];
	for (let i = 0; i < number; i++) {
		const facultyMember = await User.create({
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			gender: faker.random.arrayElement(Gender),
			department: faker.random.arrayElement(Department),
			major: faker.random.arrayElement(Major),
			option: faker.random.word(),
			roles,
			email: faker.internet.email(),
			password: 'password',
		});
		users.push(facultyMember.toObject({ versionKey: false }));
	}
	return users;
};

const genAddThesisCoSupervisorApplications = async (
	number,
	applicants,
	sessionID,
	submissionsStartDate,
	submissionsEndDate
) => {
	const addThesisCoSupervisorApplications = [];
	for (let i = 0; i < number; i++) {
		const addThesisCoSupervisorApplication =
			await AddThesisCoSupervisorApplication.create({
				firstPhDRegistrationYear: faker.date.past().getFullYear().toString(),
				supervisor: faker.name.findName(),
				coSupervisor: faker.name.findName(),
				cause: faker.lorem.paragraph(),

				treated: true,
				finalDecision: faker.random.boolean(),
				submittedAt: faker.date.between(
					submissionsStartDate,
					submissionsEndDate
				),
				session: sessionID,
				applicant: applicants[i]._id,
			});
		addThesisCoSupervisorApplications.push(addThesisCoSupervisorApplication);
	}
	return addThesisCoSupervisorApplications;
};

const genConferenceApplications = async (
	number,
	applicants,
	sessionID,
	submissionsStartDate,
	submissionsEndDate
) => {
	const conferenceApplications = [];
	for (let i = 0; i < number; i++) {
		const conferenceApplication = await ConferenceApplication.create({
			name: faker.lorem.sentence(),
			communicationPaperTitle: faker.lorem.sentence(),
			communicationPaperAbstract: faker.lorem.paragraph(),
			location: faker.address.streetAddress(),
			date: faker.date.future(),
			website: faker.internet.url(),

			treated: true,
			finalDecision: faker.random.boolean(),
			submittedAt: faker.date.between(submissionsStartDate, submissionsEndDate),
			session: sessionID,
			applicant: applicants[i]._id,
		});
		conferenceApplications.push(conferenceApplication);
	}
	return conferenceApplications;
};

const genInternshipApplications = async (
	number,
	applicants,
	sessionID,
	submissionsStartDate,
	submissionsEndDate
) => {
	const internshipApplications = [];
	for (let i = 0; i < number; i++) {
		const internshipApplication = await InternshipApplication.create({
			laboratoryName: faker.lorem.sentence(3),
			laboratoryWebsite: faker.internet.url(),
			country: faker.address.country(),
			city: faker.address.city(),
			durationFrom: faker.date.future(),
			durationTo: faker.date.future(),
			workPlanLink: faker.internet.url(),

			treated: true,
			finalDecision: faker.random.boolean(),
			submittedAt: faker.date.between(submissionsStartDate, submissionsEndDate),
			session: sessionID,
			applicant: applicants[i]._id,
		});
		internshipApplications.push(internshipApplication);
	}
	return internshipApplications;
};

const genThesisTitleChangeApplications = async (
	number,
	applicants,
	sessionID,
	submissionsStartDate,
	submissionsEndDate
) => {
	const thesisTitleChangeApplications = [];
	for (let i = 0; i < number; i++) {
		const thesisTitleChangeApplication =
			await ThesisTitleChangeApplication.create({
				firstPhDRegistrationYear: faker.date.past().getFullYear().toString(),
				supervisor: faker.name.findName(),
				currentTitle: faker.lorem.sentence(),
				desiredTitle: faker.lorem.sentence(),
				cause: faker.lorem.paragraph(),

				treated: true,
				finalDecision: faker.random.boolean(),
				submittedAt: faker.date.between(
					submissionsStartDate,
					submissionsEndDate
				),
				session: sessionID,
				applicant: applicants[i]._id,
			});
		thesisTitleChangeApplications.push(thesisTitleChangeApplication);
	}
	return thesisTitleChangeApplications;
};

const genPromotionApplications = async (
	number,
	applicants,
	sessionID,
	submissionsStartDate,
	submissionsEndDate
) => {
	const promotionApplications = [];
	for (let i = 0; i < number; i++) {
		const promotionApplication = await PromotionApplication.create({
			recruitmentDate: faker.date.past(),
			confirmationDate: faker.date.past(),
			currentRank: faker.lorem.word(),
			desiredRank: faker.lorem.word(),
			PhDRegistrationsNumber: faker.random.number({ max: 5, min: 1 }),
			lastPhDRegistrationYear: faker.date.past().getFullYear().toString(),
			teachingActivitiesLink: faker.internet.url(),

			treated: true,
			finalDecision: faker.random.boolean(),
			submittedAt: faker.date.between(submissionsStartDate, submissionsEndDate),
			session: sessionID,
			applicant: applicants[i]._id,
		});
		promotionApplications.push(promotionApplication);
	}
	return promotionApplications;
};

const genConfirmationApplication = async (
	number,
	applicants,
	sessionID,
	submissionsStartDate,
	submissionsEndDate
) => {
	const confirmationApplications = [];
	for (let i = 0; i < number; i++) {
		const confirmationApplication = await ConfirmationApplication.create({
			rank: faker.lorem.word(),
			recruitmentDate: faker.date.past(),
			teachingActivitiesLink: faker.internet.url(),

			treated: true,
			finalDecision: faker.random.boolean(),
			submittedAt: faker.date.between(submissionsStartDate, submissionsEndDate),
			session: sessionID,
			applicant: applicants[i]._id,
		});
		confirmationApplications.push(confirmationApplication);
	}
	return confirmationApplications;
};

const voteOnApplications = (applications, voters) => {
	applications.forEach((application) => {
		voters.forEach(async (voter) => {
			await Application.findByIdAndUpdate(application._id, {
				$push: {
					reviews: {
						reviewer: voter._id,
						decision: faker.random.boolean(),
						comment: faker.lorem.paragraph(),
					},
				},
			});
		});
	});
};

const genData = async () => {
	const fmsArray = await Promise.all([
		genUsers(8, ['FACULTY_MEMBER']),
		genUsers(8, ['FACULTY_MEMBER']),
		genUsers(8, ['FACULTY_MEMBER']),
		genUsers(8, ['FACULTY_MEMBER']),
	]);
	const SCMembers = await genUsers(15, ['FACULTY_MEMBER', 'SC_MEMBER']);

	for (let year = 2015; year < 2019; year++) {
		await Announcements.create({
			title: faker.lorem.sentence(4),
			content: faker.lorem.paragraph(),
		});
		const yearlyReport = await YearlyReport.create({ year });
		for (let i = 0; i < 6; i++) {
			const submissionsStartDate = dayjs(year.toString()).add(3 * i, 'month');
			const submissionsEndDate = dayjs(submissionsStartDate)
				.add(3, 'month')
				.subtract(1, 'week');
			const mettingDate = dayjs(submissionsEndDate);

			const session = {
				submissionsStartDate,
				submissionsEndDate,
				mettingDate,
			};

			yearlyReport.sessions.unshift(session);
			const sessionID = yearlyReport.sessions[0]._id;

			const commonArgs = [
				faker.random.arrayElement(fmsArray),
				sessionID,
				submissionsStartDate,
				submissionsEndDate,
			];

			const [app1, app2, app3, app4, app5, app6] = await Promise.all([
				genAddThesisCoSupervisorApplications(
					faker.random.number({ min: 0, max: 8 }),
					...commonArgs
				),
				genConfirmationApplication(
					faker.random.number({ min: 0, max: 8 }),
					...commonArgs
				),
				genConferenceApplications(
					faker.random.number({ min: 0, max: 8 }),
					...commonArgs
				),
				genInternshipApplications(
					faker.random.number({ min: 0, max: 8 }),
					...commonArgs
				),
				genPromotionApplications(
					faker.random.number({ min: 0, max: 8 }),
					...commonArgs
				),
				genThesisTitleChangeApplications(
					faker.random.number({ min: 0, max: 8 }),
					...commonArgs
				),
			]);

			await Promise.all([
				voteOnApplications(app1, SCMembers),
				voteOnApplications(app2, SCMembers),
				voteOnApplications(app3, SCMembers),
				voteOnApplications(app4, SCMembers),
				voteOnApplications(app5, SCMembers),
				voteOnApplications(app6, SCMembers),
			]);
		}
		yearlyReport.save();
	}
};

connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
})
	.then(async () => {
		console.log('Connected to DB');
		await genUsers(1, ['FACULTY_MEMBER', 'SC_PRESIDENT']);
		await genData();
		console.log('Gen Data Complete');
		// eslint-disable-next-line no-process-exit
		process.exit(0);
	})
	.catch((error) => console.error('failed:', error));
