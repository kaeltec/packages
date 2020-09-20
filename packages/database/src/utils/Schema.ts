import {
  SchemaOptions,
  SchemaDefinition,
  Schema as DefaultSchema,
} from 'mongoose';

export class Schema extends DefaultSchema {
  constructor(definiton: SchemaDefinition, options: SchemaOptions = {}) {
    super(
      definiton,
      Object.assign(options, {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
      }),
    );
  }
}

export class SchemaWithoutId extends Schema {
  constructor(definiton: SchemaDefinition, options: SchemaOptions = {}) {
    super(definiton, Object.assign(options, { _id: false }));
  }
}
