import { Defaults } from '@kaelbot/constants';

import UserSchema from '../schemas/User';

import { Omit, UserDocument } from '../types';
import BaseConnection from './BaseConnection';

class UserConnection extends BaseConnection<UserDocument> {
  constructor() {
    super('User', UserSchema);
  }

  get defaultValue(): Omit<UserDocument, '_id'> {
    return UserConnection.defaultValue;
  }

  static get defaultValue(): Omit<UserDocument, '_id'> {
    return {
      social: {
        badges: [],
        extract: [],
        bank: 0,
        koins: 0,
        charisma: 0,
        reputation: 0,
        perfection: 0,
        intelligence: 0,
        cooldown_work: 0,
        cooldown_steal: 0,
        cooldown_daily: 0,
        cooldown_all_points: 0,
        cooldown_charisma: 0,
        cooldown_reputation: 0,
        cooldown_perfection: 0,
        cooldown_intelligence: 0,
        favorite_color: Defaults.FavoriteColor,
        background: Defaults.Background,
        biography: Defaults.Biography,
      },
    };
  }
}

export default UserConnection;
