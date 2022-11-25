import { ApolloServer } from 'apollo-server';

import typeDefs from './schema';
import resolvers from './resolvers';

const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
});
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});

server.start().then(() => {
    console.log('Server is running on localhost:4000');
})