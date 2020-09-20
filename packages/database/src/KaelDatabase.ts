import mongoose, { ConnectionOptions } from 'mongoose';

import Util from './utils/Util';

import {
  connections,
  ConnectionTypes,
  defaultConnectionOptions,
  RetrieveConnectionDocuments,
} from './config';

class KaelDatabase {
  public readonly connections: Map<
    keyof ConnectionTypes,
    ConnectionTypes[keyof ConnectionTypes]
  >;

  constructor() {
    this.connections = new Map<
      keyof ConnectionTypes,
      ConnectionTypes[keyof ConnectionTypes]
    >([
      ['user', new connections.User()],
      ['guild', new connections.Guild()],
    ]);
  }

  get connected(): boolean {
    return mongoose.connection.readyState === 1;
  }

  get users(): ConnectionTypes['user'] {
    return this.connections.get('user') as ConnectionTypes['user'];
  }

  get guilds(): ConnectionTypes['guild'] {
    return this.connections.get('guild') as ConnectionTypes['guild'];
  }

  public connect(
    uri: string,
    options: ConnectionOptions = {},
  ): Promise<typeof mongoose> {
    const connectionUri = uri || process.env.MONGODB_CONNECTION_STRING;

    if (!connectionUri) {
      throw new Error('No mongoose connection uri was provided!');
    }

    return mongoose.connect(
      connectionUri,
      Util.mergeDefault<ConnectionOptions>(defaultConnectionOptions, options),
    );
  }

  public async retrieveConnection(
    connection: 'user',
    id: string,
    projection?: string,
  ): Promise<RetrieveConnectionDocuments['user']>;

  public async retrieveConnection(
    connection: 'guild',
    id: string,
    projection?: string,
  ): Promise<RetrieveConnectionDocuments['guild']>;

  public async retrieveConnection(
    connection: keyof ConnectionTypes,
    id: string,
    projection?: string,
  ): Promise<RetrieveConnectionDocuments[keyof RetrieveConnectionDocuments]> {
    const selectedConnection = this.connections.get(connection);

    if (!selectedConnection) {
      throw new TypeError('Invalid connection was provided!');
    }

    if (this.connected) return selectedConnection.findOne(id, projection);
    return selectedConnection.defaultValue;
  }
}

export default KaelDatabase;
