import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { PubSub } from 'graphql-subscriptions';
import express from 'express';
import http from 'http';

import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { makeExecutableSchema } from '@graphql-tools/schema';

import mongoose from 'mongoose';

async function startApolloServer({ typeDefs, resolvers }) {
  // Required logic for integrating with Express
  const app = express();
  const httpServer = http.createServer(app);

  const pubsub = new PubSub();

  const schema = makeExecutableSchema({ typeDefs, resolvers, contet: { pubsub } });

  const subscriptionServer = SubscriptionServer.create({
    // This is the `schema` we just created.
    schema,
    // These are imported from `graphql`.
    execute,
    subscribe,
 }, {
    // This is the `httpServer` we created in a previous step.
    server: httpServer,
    // Pass a different path here if your ApolloServer serves at
    // a different path.
    path: '/graphql',
 });

  // Same ApolloServer initialization as before, plus the drain plugin.
  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer }), {
      async serverWillStart() {
        return {
          async drainServer() {
            subscriptionServer.close();
          }
        };
      }
    }],
  });
  

  // More required logic for integrating with Express
  await server.start();
  server.applyMiddleware({
    app,

    // By default, apollo-server hosts its GraphQL endpoint at the
    // server root. However, *other* Apollo Server packages host it at
    // /graphql. Optionally provide this to match apollo-server.
    path: '/'
  });


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