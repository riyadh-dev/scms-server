const Controller = require('./controller');

module.exports = {

	Query: {
		users: () => Controller.getUsers(),

		usersByRole: ( _, { role }) => Controller.getUsersByRole(role),

		userByEmail: (_, { email }) => Controller.getUsersByEmail(email),

		user: (_, { _id }, context) => Controller.getUserByID(_id, context),

		token: (_, { input }) => Controller.getToken(input),
	},

	Mutation: {
		addUser: (_, { input }) => Controller.addUser(input),

		updateUser: (_, { input }, context) => Controller.updateUser(input, context),

		deleteUser: (_, { _id }) => Controller.deleteUser(_id)
	}
	
};