export interface ICreateBook {
  title: string;
  publishedYear?: number;
  publishedPlace?: string;
  isbnPrint?: string;
  isbnEbook?: string;
  description?: string;
  language: string;
  inStock: boolean;
  priceUsd: number;
  coverUrl?: string;
  authorsString?: string;
}
