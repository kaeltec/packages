import { DeleteWriteOpResultObject } from 'mongodb';
import {
  Schema,
  Model,
  Query,
  Document,
  CreateQuery,
  UpdateQuery,
  FilterQuery,
  SaveOptions,
  ModelOptions,
  DocumentQuery,
  ModelUpdateOptions,
  QueryFindBaseOptions,
  model as applyModel,
} from 'mongoose';

import Util from '../utils/Util';

import { Omit, DocumentRequired, DocumentResponse } from '../types';

abstract class BaseConnection<
  T extends DocumentRequired,
  D extends Document = T & Document
> {
  private readonly model: Model<D>;

  public abstract readonly defaultValue: Omit<T, '_id'>;

  constructor(modelName: string, schema: Schema) {
    this.model = applyModel<D>(modelName, schema);

    Object.defineProperty(this, 'parseData', {
      value: this.parseData.bind(this),
    });
  }

  private parseData(document: Document | null): DocumentResponse<T> {
    return Util.parseData<T>(this.defaultValue, document);
  }

  public add(doc: CreateQuery<D>, options?: SaveOptions): Promise<D> {
    return this.model.create<D>(doc, options);
  }

  public get(
    conditions: FilterQuery<D> | T['_id'],
  ): Promise<DocumentResponse<T>> {
    const conditionsParsed = Util.parseQuery(conditions);

    return this.model
      .findOne(conditionsParsed)
      .then(
        doc => doc || this.add({ _id: conditionsParsed._id } as CreateQuery<D>), // eslint-disable-line no-underscore-dangle
      )
      .then(this.parseData);
  }

  public async sortAndLimit(
    sort: FilterQuery<D>,
    limit = 10,
    find: FilterQuery<D> = {},
  ): Promise<DocumentResponse<T>[]> {
    return this.model
      .find(find)
      .sort(sort)
      .limit(limit)
      .then(e => e.map(this.parseData));
  }

  public findById(id: T['_id']): DocumentQuery<D | null, D> {
    const query = this.model.findById(id);
    const clonedQuery = Util.cloneObject(query);

    Object.defineProperty(clonedQuery, 'exec', {
      value: () => query.exec().then(this.parseData),
    });

    return clonedQuery;
  }

  public async findAll(
    filter: FilterQuery<D>,
    projection?: string,
    options: QueryFindBaseOptions = {},
  ): Promise<DocumentResponse<T>[]> {
    return this.model
      .find(filter, projection, options)
      .then(docs => docs.map(this.parseData));
  }

  public findOne(
    conditions: FilterQuery<D> | T['_id'],
    projection?: string,
    options: QueryFindBaseOptions = {},
  ): Promise<DocumentResponse<T>> {
    return this.model
      .findOne(Util.parseQuery(conditions), projection, options)
      .then(this.parseData);
  }

  public async remove(
    conditions: FilterQuery<D> | T['_id'],
    options: ModelOptions = {},
  ): Promise<
    Query<DeleteWriteOpResultObject['result'] & { deletedCount?: number }>
  > {
    return this.model.deleteOne(Util.parseQuery(conditions), options);
  }

  public async update(
    filter: FilterQuery<D> | T['_id'],
    doc: UpdateQuery<D> = {},
    options: ModelUpdateOptions = { upsert: true },
  ): Promise<Query<any>> {
    return this.model.updateOne(Util.parseQuery(filter), doc, options);
  }
}

export default BaseConnection;
