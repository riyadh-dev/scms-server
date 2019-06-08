const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const path = require('path');
const jwt = require('jsonwebtoken');
const compression = require('compression');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

mongoose.connect(
	process.env.MONGODB_URL,
	{
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false
	}
)
	.then(() => console.log('Conected to UniversityDB'))
	.catch(error => console.error('Conection to UniversityDB failed:', error.message));

const context = ({ req }) => {
	try {
		const token = req.headers.authorization;
		if (token) {
			return jwt.verify(token, process.env.JWT_SECRET);
		} else {
			//console.log('no token');
			return null;
		}
	} catch (e) {
		console.error(e.message);
		return null;
	}
};
//TODO disable interscoping 
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context,
	// TODO formatError
});

const app = express();
app.disable('x-powered-by');
app.use(compression());
app.use(express.static(path.join(__dirname, '../../client/build')));

app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

server.applyMiddleware({ app, cors: { 
	origin: process.env.ORIGIN,
	credentials: true
}});

app.get('/*', (_, res) => {
	res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});

app.listen(process.env.PORT, () =>
	console.log(`Server URL: http://localhost:${process.env.PORT}${server.graphqlPath}`)
);



