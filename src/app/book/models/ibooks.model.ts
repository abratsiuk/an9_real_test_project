import { IBook } from './ibook.model';

export interface IBooks {
  total: number;
  page: number;
  size: number;
  items: IBook[];
}
