import { Defaults, CountModels } from '@kaelbot/constants';

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
      social: { bank: 0 },
      vanity: { users: [] },
      auto_role: { active: false, roles: [] },
      suggestion: { active: false, channel: '' },
      nivel: { active: false, message: Defaults.Messages.LevelUp, roles: [] },
      count: {
        active: false,
        channel: '',
        text: Defaults.Messages.Count,
        type: CountModels.Normal[0].id.toString(),
      },
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
