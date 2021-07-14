import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './schema';
import { createConnection } from 'typeorm';

async function startApolloServer() {
	try{
		const app = express();
		const server = new ApolloServer({
			typeDefs,
			resolvers,
		});
		await server.start();
	
		server.applyMiddleware({ app });
	
		new Promise(resolve => app.listen({ port: 4000 }));
		console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
		return { server, app };
	} catch (error) {
		console.error(error);
	}
}

startApolloServer();