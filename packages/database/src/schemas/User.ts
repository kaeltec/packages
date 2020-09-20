import { Defaults } from '@kaelbot/constants';

import { Schema, SchemaWithoutId } from '../utils/Schema';

// Social

const BadgeSocialSchema = new SchemaWithoutId({});

const SocialSchema = new SchemaWithoutId({
  extract: [String],
  badges: [BadgeSocialSchema],

  bank: Number,
  koins: Number,

  charisma: Number,
  reputation: Number,
  perfection: Number,
  intelligence: Number,

  cooldown_work: Number,
  cooldown_steal: Number,
  cooldown_daily: Number,
  cooldown_all_points: Number,

  cooldown_charisma: Number,
  cooldown_reputation: Number,
  cooldown_perfection: Number,
  cooldown_intelligence: Number,

  favorite_color: { type: String, default: Defaults.FavoriteColor },
  background: { type: String, default: Defaults.Background },
  biography: { type: String, default: Defaults.Biography },
});

export default new Schema({
  social: SocialSchema,
  _id: { type: String, required: true },
});
