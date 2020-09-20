import { connections, ConnectionTypes } from './config';

class KaelAdonisDatabase {
  public static buildConnection(connection: 'user'): ConnectionTypes['user'];

  public static buildConnection(connection: 'guild'): ConnectionTypes['guild'];

  public static buildConnection(
    connection: keyof ConnectionTypes,
  ): ConnectionTypes[keyof ConnectionTypes] {
    const connectionParsed = `${connection[0].toUpperCase()}${connection.slice(
      1,
    )}`;

    if (!Object.keys(connections).includes(connectionParsed)) {
      throw new TypeError('Invalid connection was provided!');
    }

    return new connections[connectionParsed]();
  }
}

export default KaelAdonisDatabase;
