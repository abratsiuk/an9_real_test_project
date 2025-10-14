import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IBooks } from '../models/ibooks.model';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ICreateBook } from '../models/icreate-book.model';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  baseUrl = 'http://localhost:5260';

  constructor(private http: HttpClient) {}

  loadBooks(): Observable<IBooks> {
    return this.http.get<IBooks>(`${this.baseUrl}/api/books`).pipe(
      catchError((err) => {
        console.error('loadBooks error', err);
        return of(null as IBooks);
      }),
    );
  }

  getBook(id: number): Observable<ICreateBook> {
    return this.http.get<ICreateBook>(`${this.baseUrl}/api/books/${id}`).pipe(
      catchError((err) => {
        console.error('getBook error', err);
        return of(null as ICreateBook);
      }),
    );
  }

  updateBook(id: number, dto: ICreateBook): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/api/books/${id}`, dto).pipe(
      catchError((err) => {
        console.error('updateBook error', err);
        return of(undefined);
      }),
    );
  }

  createBook(dto: ICreateBook) {
    return this.http.post<{ id: number }>(`${this.baseUrl}/api/books`, dto).pipe(
      catchError((err) => {
        console.error('createBook error', err);
        return of(null as { id: number });
      }),
    );
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/api/books/${id}`).pipe(
      catchError((err) => {
        console.error('deleteBook error', err);
        return of(undefined);
      }),
    );
  }
}
