/**
 * Import Modules
 */
import "reflect-metadata";
import express, { Express } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createConnection, useContainer } from 'typeorm';
import { SachetResolver } from "./database/resolver/SachetResolver";
import { buildSchema } from "type-graphql";
import { EchantionnageResolver } from "./database/resolver/EchantionnageResolver";
import { logger } from './logger';
import { Container } from "typeorm-typedi-extensions";

/**
 * Initialize GraphQL API Server (Apollo)
 *
 * @return {*}  {(Promise<{server: ApolloServer, app: Express} | undefined>)}
 */
async function startApolloServer(): Promise<{server: ApolloServer, app: Express} | undefined> {
	try{
		// Setup Connection and Schema for Postgres Database
		useContainer(Container);
		const connection = await createConnection();
		const schema = await buildSchema({
			resolvers: [SachetResolver, EchantionnageResolver],
			container: Container,
			emitSchemaFile: true,
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