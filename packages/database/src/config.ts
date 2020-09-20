import GuildConnection from './connections/GuildConnection';
import UserConnection from './connections/UserConnection';

import GuildSchema from './schemas/Guild';
import UserSchema from './schemas/User';

import { UserDocument, GuildDocument, DocumentResponse } from './types';

export interface ConnectionTypes {
  user: UserConnection;
  guild: GuildConnection;
}

export interface RetrieveConnectionDocuments {
  user: DocumentResponse<UserDocument>;
  guild: DocumentResponse<GuildDocument>;
}

export const schemas = {
  user: UserSchema,
  guild: GuildSchema,
};

export const connections = {
  User: UserConnection,
  Guild: GuildConnection,
};

export const defaultConnectionOptions = {
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 10,
  keepAliveInitialDelay: 15000,
  serverSelectionTimeoutMS: 15000,
};
