import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { PubSub } from 'graphql-subscriptions';
import express from 'express';
import http from 'http';

//* Subscriptions 
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { makeExecutableSchema } from '@graphql-tools/schema';

import mongoose from 'mongoose';

async function startApolloServer({ typeDefs, resolvers }) {
  const app = express();
  const httpServer = http.createServer(app);
  const pubsub = new PubSub();
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const server = new ApolloServer({
    schema,
    context: () => ({ pubsub }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  const subscriptionServer = SubscriptionServer.create({
    schema,
    execute,
    subscribe,
    async onConnect(connectionParams, webSocker) {
      console.log('Connected... 🚀');

      // context for subscription
      return { pubsub }
    },
    async onDisconnect(webSocket) {
      console.log('Disconnect...')
    }
 }, {
    server: httpServer,
    path: server.graphqlPath,
 });


  await server.start();
  server.applyMiddleware({ app });


  mongoose.connect('mongodb://localhost:27017/graphql', {
    authSource: "admin",
    user: "root",
    pass: "root",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  // Modified server startup
  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
};

export default startApolloServer;