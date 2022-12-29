const express = require('express');
const { ApolloServer, AuthenticationError } = require('apollo-server-express');
const mongoose = require('mongoose');
const path = require('path');
const jwt = require('jsonwebtoken');
const compression = require('compression');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const schemaDirectives = require('./graphql/directives');

mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(() => console.log('Connected to DB'))
	.catch((error) => console.error('Connection to DB failed:', error.message));

const context = ({ req }) => {
	try {
		const token = req.headers.authorization;
		if (token) {
			const user = jwt.verify(token, process.env.JWT_SECRET);
			return { user };
		} else {
			return null;
		}
	} catch (error) {
		throw new AuthenticationError(error.message);
	}
};
//TODO disable interscoping
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context,
	schemaDirectives,
	// TODO formatError
});

const app = express();
app.disable('x-powered-by');
app.use(compression());
app.use(express.static(path.join(__dirname, '../../client/build')));

app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

server.applyMiddleware({
	app,
	cors: {
		origin: process.env.ORIGIN,
		credentials: true,
	},
});

app.get('/*', (_, res) => {
	res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});

app.listen(process.env.PORT, () =>
	console.log(
		`Server URL: http://localhost:${process.env.PORT}${server.graphqlPath}`
	)
);
