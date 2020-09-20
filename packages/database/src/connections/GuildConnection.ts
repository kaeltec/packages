import { Defaults } from '@kaelbot/constants';

import GuildSchema from '../schemas/Guild';

import { Omit, GuildDocument } from '../types';
import BaseConnection from './BaseConnection';

class GuildConnection extends BaseConnection<GuildDocument> {
  constructor() {
    super('Guild', GuildSchema);
  }

  get defaultValue(): Omit<GuildDocument, '_id'> {
    return GuildConnection.defaultValue;
  }

  static get defaultValue(): Omit<GuildDocument, '_id'> {
    return {
      prefix: Defaults.Prefix,
      language: Defaults.Language,
      role_all: undefined,
      social: { bank: 0 },
      vanity: { users: [] },
      mute: { role: '', users: [] },
      auto_role: { active: false, roles: [] },
      suggestion: { active: false, channel: '' },
      freeze: { role: '', channel: '', users: [] },
      nivel: { active: false, message: '', roles: [] },
      count: { active: false, text: '', type: '', channel: '' },
      welcome: {
        leave: {
          active: false,
          channel: '',
          message: Defaults.Messages.Welcome.Leave,
        },
        input: {
          active: false,
          channel: '',
          message: Defaults.Messages.Welcome.Input,
        },
        private: {
          active: false,
          message: Defaults.Messages.Welcome.Private,
        },
      },
      harry_potter: {
        house_roles: {
          slytherin: '',
          ravenclaw: '',
          hufflepuff: '',
          gryffindor: '',
        },
        house_points: {
          slytherin: 0,
          ravenclaw: 0,
          hufflepuff: 0,
          gryffindor: 0,
        },
      },
    };
  }
}

export default GuildConnection;
