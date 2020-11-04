export type ObjectValues<T> = T[keyof T];

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export type AcceptedConnections = 'users' | 'guilds';

export interface DocumentBase {
  _id: string;
}

export type DocumentRequired = Required<DocumentBase>;

export type DocumentResponse<T extends DocumentBase> = Omit<T, '_id'> & {
  _id?: T['_id'];
  created_at?: Date;
  updated_at?: Date;
};

// User

export interface UserBadgeSocial {
  name: string;
  index: number;
  active: boolean;
}

export interface UserSocial {
  favorite_color: string;
  background: string;
  biography: string;
  bank: number;
  koins: number;
  charisma: number;
  reputation: number;
  perfection: number;
  intelligence: number;
  cooldown_work: number;
  cooldown_steal: number;
  cooldown_daily: number;
  cooldown_all_points: number;
  cooldown_charisma: number;
  cooldown_reputation: number;
  cooldown_perfection: number;
  cooldown_intelligence: number;
  extract: string[];
  badges: UserBadgeSocial[];
}

export interface UserDocument extends DocumentBase {
  social: UserSocial;
}

// Guild

// Social
export interface GuildSocial {
  bank: number;
}

// Auto Role
export interface GuildAutoRole {
  active: boolean;
  roles: string[];
}

// Suggestion
export interface GuildSuggestion {
  active: boolean;
  channel: string;
}

// Count
export interface GuildCount {
  active: boolean;
  type: string;
  channel: string;
  text: string;
}

// Harry Potter
export interface GuildHarryPotter {
  house_roles: {
    slytherin: string;
    ravenclaw: string;
    hufflepuff: string;
    gryffindor: string;
  };
  house_points: {
    slytherin: number;
    ravenclaw: number;
    hufflepuff: number;
    gryffindor: number;
  };
}

// Nivel

export interface GuildRoleNivel {
  id: string;
  level: number;
}

export interface GuildNivel {
  active: boolean;
  message: string;
  roles: GuildRoleNivel[];
}

// Vanity

export interface GuildUserVanity {
  id: string;
  role: string;
  time: number;
  added_by: string;
  timestamp: number;
}

export interface GuildVanity {
  users: GuildUserVanity[];
}

// Welcome

export interface GuildLeaveWelcome {
  active: boolean;
  channel: string;
  message: string;
}

export interface GuildInputWelcome {
  active: boolean;
  channel: string;
  message: string;
}

export interface GuildPrivateWelcome {
  active: boolean;
  message: string;
}

export interface GuildWelcome {
  leave: GuildLeaveWelcome;
  input: GuildInputWelcome;
  private: GuildPrivateWelcome;
}

export interface GuildDocument extends DocumentBase {
  prefix: string;
  language: string;
  nivel: GuildNivel;
  count: GuildCount;
  social: GuildSocial;
  vanity: GuildVanity;
  welcome: GuildWelcome;
  auto_role: GuildAutoRole;
  suggestion: GuildSuggestion;
  harry_potter: GuildHarryPotter;
}
