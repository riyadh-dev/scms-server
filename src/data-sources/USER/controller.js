const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./model');
const { UserInputError } = require('apollo-server-express');

module.exports = {
	getUsers: async () => {
		const users = await User.find();
		return users;
	},

	getUserByID: async (_id) => {
		const user = await User.findById(_id);
		return user;
	},

	getToken: async input => {
		const user = await User.findOne({ email: input.email });
		if (!user)
			throw new UserInputError('this User does not exist', { field: 'email' });

		const { password, ...payload } = user.toObject({ versionKey: false });

		const isMatch = await bcrypt.compare(input.password, password);
		if (!isMatch)
			throw new UserInputError('password incorrect', { field: 'password' });

		const token = await jwt.sign(
			payload, process.env.JWT_SECRET,
			{ expiresIn: process.env.JWT_EXPIRES_IN }
		);

		return token;
	},
};

