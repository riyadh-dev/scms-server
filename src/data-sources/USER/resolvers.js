const Controller = require('./controller');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const dayjs = require('dayjs');

module.exports = {

	Date: new GraphQLScalarType({
		name: 'Date',
		description: 'Date custom scalar type',
		parseValue(value) {
			return new Date(value); // value from the client
		},
		serialize(value) {
			return dayjs(value).format('MMM DD, YYYY'); // value sent to the client
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
		user: (_, { _id }, context) => Controller.getUserByID(_id, context),
		token: (_, { input }) => Controller.getToken(input),
	},
};