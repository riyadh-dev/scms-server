const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const Role = [
	'FACULTY_MEMBER',
	'PHD_STUDENT',
	'SC_MEMBER',
	'SC_PRESIDENT'
];

const Gender = [
	'FEMALE',
	'MALE'
];

const Department = [
	'POWER_AND_CONTROL',
	'ELECTRONICS',
	'FUNDAMENTAL_EDUCATION',
];

const Major = [
	'ELECTRONICS',
	'POWER',
	'CONTROL',
	'TELECOMMUNICATION'
];

const userSchema = new Schema({
	firstName: String,
	lastName: String,
	gender: { type: String, enum: Gender },
	department: { type: String, enum: Department },
	major: { type: String, enum: Major },
	option: String,
	roles: [{ type: String, enum: Role }],
	email: String,
	password: String
});

userSchema.pre('save', function () {
	if (this.isModified('password')) {
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(this.password, salt);
		this.password = hash;
	}
});

module.exports = model('User', userSchema);