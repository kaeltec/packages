import { Defaults } from '@kaelbot/constants';

import { Schema, SchemaWithoutId } from '../utils/Schema';

// Social
const SocialSchema = new SchemaWithoutId({ bank: Number });

// Suggestion
const SuggestionSchema = new SchemaWithoutId({
  active: Boolean,
  channel: String,
});

// Auto Role
const AutoRoleSchema = new SchemaWithoutId({
  active: Boolean,
  roles: [String],
});

// Count
const CountSchema = new SchemaWithoutId({
  active: Boolean,
  type: String,
  channel: String,
  text: String,
});

// Harry Potter
const HarryPotterSchema = new SchemaWithoutId({
  house_roles: {
    slytherin: String,
    ravenclaw: String,
    hufflepuff: String,
    gryffindor: String,
  },
  house_points: {
    slytherin: Number,
    ravenclaw: Number,
    hufflepuff: Number,
    gryffindor: Number,
  },
});

// Vanity

const UserVanitySchema = new SchemaWithoutId({
  added_by: String,
  id: { type: String, required: true },
  role: { type: String, required: true },
  time: { type: Number, required: true },
  timestamp: { type: Number, default: Date.now },
});

const VanitySchema = new SchemaWithoutId({ users: [UserVanitySchema] });

// Nivel

const RoleNivelSchema = new SchemaWithoutId({
  id: { type: String, required: true },
  level: { type: Number, required: true },
});

const NivelSchema = new SchemaWithoutId({
  active: Boolean,
  roles: [RoleNivelSchema],
  message: { type: String, default: Defaults.Messages.LevelUp },
});

// Welcome

const LeaveWelcomeSchema = new SchemaWithoutId({
  active: Boolean,
  channel: String,
  message: { type: String, default: Defaults.Messages.Welcome.Leave },
});

const InputWelcomeSchema = new SchemaWithoutId({
  active: Boolean,
  channel: String,
  message: { type: String, default: Defaults.Messages.Welcome.Input },
});

const PrivateWelcomeSchema = new SchemaWithoutId({
  active: Boolean,
  message: { type: String, default: Defaults.Messages.Welcome.Private },
});

const WelcomeSchema = new SchemaWithoutId({
  leave: LeaveWelcomeSchema,
  input: InputWelcomeSchema,
  private: PrivateWelcomeSchema,
});

export default new Schema({
  nivel: NivelSchema,
  count: CountSchema,
  social: SocialSchema,
  vanity: VanitySchema,
  welcome: WelcomeSchema,
  auto_role: AutoRoleSchema,
  suggestion: SuggestionSchema,
  harry_potter: HarryPotterSchema,
  _id: { type: String, required: true },
  prefix: { type: String, default: Defaults.Prefix },
  language: { type: String, default: Defaults.Language },
});
