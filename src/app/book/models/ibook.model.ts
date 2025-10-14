export interface IBook {
  id: number;
  title: string;
  publishedYear?: number;
  publishedPlace?: string;
  language: string;
  inStock: boolean;
  priceUsd: number;
  coverUrl?: string;
  authorsString?: string;
  isbnPrint?: string;
  isbnEbook?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}
