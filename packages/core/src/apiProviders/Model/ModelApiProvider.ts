import {Query, ReadOptions} from './utils';

export interface ModelApi {
  init(): void;
  isAvailable(): Promise<boolean>;
  getAll({modelName, page}: {modelName: string; page: number}): Promise<any[]>;
  get({modelName, id}: {modelName: string; id: number}): Promise<any[]>;
  fetch?({
    modelName,
    id,
    query,
  }: {
    modelName: string;
    id: number;
    query: ReadOptions;
  }): Promise<any[]>;
  search({modelName, query}: {modelName: string; query: Query}): Promise<any[]>;
}
