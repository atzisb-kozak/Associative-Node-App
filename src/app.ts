/**
 * Import Modules
 */
import "reflect-metadata";
import express, { Express } from 'express';
import { ApolloServer, IResolvers } from 'apollo-server-express';
import { createConnection } from 'typeorm';
import { loadSchema } from '@graphql-tools/load';
import { logger } from './logger';
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { makeExecutableSchema } from '@graphql-tools/schema';

/**
 * Initialize GraphQL API Server (Apollo)
 *
 * @return {*}  {(Promise<{server: ApolloServer, app: Express} | undefined>)}
 */
async function startApolloServer(): Promise<{server: ApolloServer, app: Express} | undefined> {
	try{
		// Setup Connection and Schema for Postgres Database
		const connection = await createConnection();
		const typeDefs = await loadSchema('schema.gql', {
			loaders: [
				new GraphQLFileLoader()
			]
		});

		let sachetResolver = (
			await import('./database/resolver/SachetResolver')
		).sachetResolver;

		let echantionnageResolver = (
			await import('./database/resolver/EchantionnageResolver')
		).echantionnageResolver;

		const resolvers: IResolvers[] = [sachetResolver, echantionnageResolver];
		const schema = makeExecutableSchema({
			typeDefs,
			resolvers
		});

		// Initialize Express + Apollo GraphQL Server
		const app = express();
		const server = new ApolloServer({
			schema,
			introspection: true,
			playground: true,
		});
		await server.start();
	
		server.applyMiddleware({ app });
	
		// TODO: change default port .env 
		// listen port 4000
		new Promise(resolve => app.listen({ port: 4000 }));
		logger.info(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
		return { server, app };

	} catch (error) {
		// unexcepted Error at launch
		logger.error(`[App](startApolloServer) : ${error.message}`);
	}
}


startApolloServer();