import {Component, OnDestroy, OnInit} from '@angular/core';
import {of, Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {map, switchMap, takeUntil} from 'rxjs/operators';
import {BooksService} from '../../services/books.service';
import {ICreateBook} from '../../models/icreate-book.model';

@Component({
  selector: 'app-page-book',
  templateUrl: './page-book.component.html',
  styleUrls: ['./page-book.component.scss'],
})
export class PageBookComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  book: ICreateBook | null = null;
  mode: 'create' | 'edit' = 'create';
  id!: number;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private booksService: BooksService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        takeUntil(this.destroy$),
        map((p) => +(p.get('id') || '0')),
        switchMap((id) => {
          this.id = id || 0;
          this.mode = id ? 'edit' : 'create';
          if (!id) { return of(null); }
          return this.booksService.getBook(id);
        }),
      )
      .subscribe((book) => {
        this.book = book;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onBookSave(book: ICreateBook) {
    this.loading = true;

    if (this.mode === 'edit') {
      this.booksService
        .updateBook(this.id, book)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res: any) => {
          this.loading = false;
          const highlightId = this.id;
          this.router.navigate(['/books'], {
            queryParams: { highlightId },
          });
        });
    } else {
      this.booksService
        .createBook(book)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res: any) => {
          this.loading = false;
          const highlightId = res?.id;
          this.router.navigate(['/books'], {
            queryParams: { highlightId },
          });
        });
    }
  }
}
