import {
  AnyObject,
  array,
  ArraySchema,
  boolean,
  BooleanSchema,
  date,
  DateSchema,
  mixed,
  MixedSchema,
  number,
  NumberSchema,
  object,
  ObjectSchema,
  string,
  StringSchema,
} from 'yup';

class ObjectSchemaContructor {
  constructor() {}

  mixed(): MixedSchema<any> {
    return mixed();
  }

  string(): StringSchema<any> {
    return string();
  }

  number(): NumberSchema<any> {
    return number();
  }

  boolean(): BooleanSchema<any> {
    return boolean();
  }

  date(): DateSchema<any> {
    return date();
  }

  array(): ArraySchema<any[], AnyObject> {
    return array();
  }

  object(spec: any = {}): ObjectSchema<any> {
    return object(spec);
  }

  subObject(columnName?: string): ObjectSchema<any> {
    const baseSchema = this.object({
      id: this.number(),
      $version: this.number(),
    });

    if (columnName == null) {
      return baseSchema;
    }

    return baseSchema.concat(
      this.object({
        [columnName]: this.string(),
      }),
    );
  }
}

export const schemaContructor = new ObjectSchemaContructor();
