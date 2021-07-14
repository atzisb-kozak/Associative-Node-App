/**
 * Import Modules
 */
import express, { Express } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './schema';
import { createConnection } from 'typeorm';
import { logger } from './logger';

/**
 * Initialize GraphQL API Server (Apollo)
 *
 * @return {*}  {(Promise<{server: ApolloServer, app: Express} | undefined>)}
 */
async function startApolloServer(): Promise<{server: ApolloServer, app: Express} | undefined> {
	try{
		const connection = await createConnection();
		const app = express();
		const server = new ApolloServer({
			typeDefs,
			resolvers,
		});
		await server.start();
	
		server.applyMiddleware({ app });
	
		new Promise(resolve => app.listen({ port: 4000 }));
		logger.info(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
		return { server, app };
	} catch (error) {
		logger.error(error);
	}
}

startApolloServer();