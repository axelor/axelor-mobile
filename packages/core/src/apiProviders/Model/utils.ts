export const REQUEST_LIMIT = 10;

export type CriteriaField = {
  operator:
    | '='
    | '!='
    | '<'
    | '>'
    | '<='
    | '>='
    | 'like'
    | 'notLike'
    | 'between'
    | 'notBetween'
    | 'isNull'
    | 'notNull';
  fieldName: string;
  value?: any;
  value2?: any;
};

export type CriteriaGroup = {
  operator: 'and' | 'or' | 'not';
  criteria: Criteria[];
};

export type Criteria = CriteriaField | CriteriaGroup;

export type CriteriaQuery = {
  criteria: Criteria[];
};

export type Query = {
  data: CriteriaQuery;
  fields?: string[];
  sortBy?: string[];
  offset?: number;
  limit?: number;
};

export type ReadOptions = {
  fields: string[];
  related?: {
    [fieldName: string]: string[];
  };
};
