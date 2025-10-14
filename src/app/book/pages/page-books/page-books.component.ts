import { Component, OnDestroy, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { IBooks } from '../../models/ibooks.model';
import { Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-books',
  templateUrl: './page-books.component.html',
  styleUrls: ['./page-books.component.scss'],
})
export class PageBooksComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  books: IBooks | null = null;
  highlightId = 0;

  constructor(private route: ActivatedRoute, private booksService: BooksService) {}

  ngOnInit(): void {
    this.booksService
      .loadBooks()
      .pipe(takeUntil(this.destroy$))
      .subscribe((books) => {
        this.books = books;
        console.log(this.books);
      });
    this.route.paramMap
      .pipe(
        takeUntil(this.destroy$),
        map((p) => ({
          page: +(p.get('page') || 1),
          q: p.get('q') || '',
          highlightId: +(p.get('highlightId') || 0),
        })),
        switchMap(({ page, q, highlightId }) =>
          this.booksService.loadBooks().pipe(
            map((res) => ({ books: res, highlightId })), // res: {items,total,...}
          ),
        ),
      )
      .subscribe((res) => {
        this.books = res.books;
        this.highlightId = res.highlightId;
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
