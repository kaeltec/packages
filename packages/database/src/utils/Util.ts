import { Document, FilterQuery } from 'mongoose';

import { Omit, DocumentRequired, DocumentResponse } from '../types';

const isObject = (value: any) => value && value.constructor === Object;
const isNull = (value: any) => typeof value === 'undefined' || value === null;

class Util {
  public static cloneObject<T extends Record<any, any>>(
    object: T,
    createObject: any = object,
  ): T {
    return Object.assign(Object.create(createObject), object);
  }

  public static mergeDefault<T>(defaultObject: T, givenObject: Partial<T>): T {
    if (!givenObject) return defaultObject;

    return Object.entries(defaultObject).reduce((object, [key, value]) => {
      const givenValue = givenObject[key];
      const newObject = this.cloneObject(object, { [key]: givenValue });

      if (isObject(value)) {
        newObject[key] = isObject(givenValue)
          ? this.mergeDefault(value, givenValue)
          : value;
      } else {
        newObject[key] = isNull(givenValue) ? value : givenValue;
      }

      return newObject;
    }, Object.assign(defaultObject, givenObject));
  }

  // Mongoose

  public static parseData<T extends DocumentRequired>(
    defaultValue: Omit<T, '_id'>,
    document: Document | null,
  ): DocumentResponse<T> {
    return Util.mergeDefault<DocumentResponse<T>>(
      defaultValue,
      document instanceof Document
        ? document.toObject({ versionKey: false })
        : {},
    );
  }

  public static parseQuery<D extends Document>(
    query: FilterQuery<D> | string,
  ): FilterQuery<D> {
    if (
      typeof query !== 'undefined' &&
      query !== null &&
      (typeof (query as any).toString === 'function'
        ? (query as any).toString()
        : query) === '[object Object]'
    ) {
      return query as FilterQuery<D>;
    }

    return { _id: query } as FilterQuery<D>;
  }
}

export default Util;
