import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, } from '@angular/core';
import {IBook} from '../../models/ibook.model';

@Component({
  selector: 'app-book-cart',
  templateUrl: './book-cart.component.html',
  styleUrls: ['./book-cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookCartComponent implements OnInit {
  @Input() book!: IBook;
  @Output() remove = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}
  onRemove() {
    this.remove.emit(this.book.id);
  }
}
