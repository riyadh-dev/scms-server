const { Schema, model } = require('mongoose');

const Review = {
	reviewer: { type: Schema.Types.ObjectId, ref: 'User' },
	decision: Boolean,
	comment: String
};

const applicationSchema = new Schema({
	applicant: { type: Schema.Types.ObjectId, ref: 'User' },
	submissionYear: { type: String, default: new Date().getFullYear().toString() },
	reviews: [Review],
	finalDecision: { type: Boolean, default: false }
}, { discriminatorKey: 'type' });

applicationSchema.virtual('accepts').get(function () {
	if(!this.reviews) return 0;
	return this.reviews.reduce((accepts, review) => {
		if (!review.reviewer) return;
		else if (review.decision) accepts++;
		return accepts;
	}, 0);
});

applicationSchema.virtual('refuses').get(function () {
	if(!this.reviews) return 0;
	return this.reviews.reduce((refuses, review) => {
		if (!review.reviewer) return;
		else if (!review.decision) refuses++;
		return refuses;
	}, 0);
});

module.exports = model('Application', applicationSchema);