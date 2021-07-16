/**
 * Import Modules
 */
import "reflect-metadata";
import express, { Express } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createConnection } from 'typeorm';
import { SachetResolver } from "./database/resolver/SachetResolver";
import { buildSchema } from "type-graphql";
import { EchantionnageResolver } from "./database/resolver/EchantionnageResolver";
import { logger } from './logger';

/**
 * Initialize GraphQL API Server (Apollo)
 *
 * @return {*}  {(Promise<{server: ApolloServer, app: Express} | undefined>)}
 */
async function startApolloServer(): Promise<{server: ApolloServer, app: Express} | undefined> {
	try{
		const connection = await createConnection();
		const schema = await buildSchema({
			resolvers: [SachetResolver, EchantionnageResolver]
		});
		const app = express();
		const server = new ApolloServer({
			schema,
			introspection: process.env.NODE_ENV === 'production',
			playground: process.env.NODE_ENV === 'production',
    });
		await server.start();
	
		server.applyMiddleware({ app });
	
		new Promise(resolve => app.listen({ port: 4000 }));
		logger.info(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
		return { server, app };
	} catch (error) {
		logger.error(`[App](startApolloServer) : ${error}`);
	}
}

startApolloServer();