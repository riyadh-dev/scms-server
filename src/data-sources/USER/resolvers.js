const Controller = require('./controller');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
//const dayjs = require('dayjs');

module.exports = {

	Date: new GraphQLScalarType({
		name: 'Date',
		description: 'Date custom scalar type',
		parseValue(value) {
			return new Date(value); // value from the client
		},
		serialize(value) {
			return value.getTime();
			//return dayjs(value).format('MMM DD, YYYY') // value sent to the client
		},
		parseLiteral(ast) {
			if (ast.kind === Kind.INT) {
				return new Date(ast.value); // ast value is always in string format
			}
			return null;
		},
	}),

	Query: {
		users: () => Controller.getUsers(),

		usersByRole: (_, { role }) => Controller.getUsersByRole(role),

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