import path from 'path';
import { print } from 'graphql';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';

const typesArray = loadFilesSync(path.join(__dirname, 'modules', '**', '*.gql'));
const typeDefs = mergeTypeDefs(typesArray);

export default typeDefs;