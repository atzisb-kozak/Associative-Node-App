import "reflect-metadata";
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createConnection } from 'typeorm';
import { SachetResolver } from "./database/resolver/SachetResolver";
import { buildSchema } from "type-graphql";
import { EchantionnageResolver } from "./database/resolver/EchantionnageResolver";

async function startApolloServer() {
	try{
		const connection = await createConnection();
		const schema = await buildSchema({
			resolvers: [SachetResolver, EchantionnageResolver]
		})
		const app = express();
		const server = new ApolloServer({
			schema
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