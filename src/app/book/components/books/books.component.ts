import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBooks } from '../../models/ibooks.model';
import { IBook } from '../../models/ibook.model';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  @Input() books!: IBooks;
  @Input() highlightId = 0;
  @Output() remove = new EventEmitter<number>();

  displayedColumns = ['id', 'title', 'authors', 'publishedYear', 'actions'];

  onCreate() {
    // TODO: navigate to create form
  }

  onEdit(id: number) {
    // TODO: navigate to edit form
  }

  constructor() {}

  ngOnInit(): void {}

  trackById(_: number, b: IBook) {
    return b.id;
  }

  onRemove(id: number) {
    this.remove.emit(id);
  }
}
