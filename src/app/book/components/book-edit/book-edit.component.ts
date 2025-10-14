import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICreateBook } from '../../models/icreate-book.model';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss'],
})
export class BookEditComponent implements OnInit, OnChanges {
  @Input() book!: ICreateBook;
  form!: FormGroup;
  @Output() bookSave = new EventEmitter<ICreateBook>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(200)]],
      publishedYear: [null, [Validators.min(0), Validators.max(2100)]],
      publishedPlace: ['', [Validators.maxLength(200)]],
      isbnPrint: ['', [Validators.maxLength(40)]],
      isbnEbook: ['', [Validators.maxLength(40)]],
      description: ['', [Validators.maxLength(4000)]],
      language: ['English', [Validators.required, Validators.maxLength(50)]],
      inStock: [false],
      priceUsd: [0, [Validators.required, Validators.min(0)]],
      coverUrl: ['', [Validators.maxLength(500)]],
      authorsString: ['', [Validators.maxLength(500)]],
    });
    if (this.book) { this.form.patchValue(this.book); }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.book && this.form && this.book) {
      this.form.patchValue(this.book);
    }
  }
  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const book = this.form.value as ICreateBook;
    this.bookSave.emit(book);
  }

  getFirstErrorMessage(field: string) {
    const c = this.form.get(field);
    if (!c || !c.errors || !c.touched) {
      return null;
    }

    const map: Record<string, string> = {
      title: 'Title',
      publishedYear: 'Published year',
      publishedPlace: 'Published place',
      isbnPrint: 'ISBN (print)',
      isbnEbook: 'ISBN (ebook)',
      description: 'Description',
      language: 'Language',
      priceUsd: 'Price (USD)',
      coverUrl: 'Cover URL',
      authorsString: 'Authors',
    };

    const e = c.errors as any;
    if (e.required) {
      return `${map[field]} is required.`;
    }
    if (e.email) {
      return `Please enter a valid email.`;
    }
    if (e.min) {
      return `${map[field]} must be ≥ ${e.min.min}.`;
    }
    if (e.max) {
      return `${map[field]} must be ≤ ${e.max.max}.`;
    }
    if (e.minlength) {
      return `Minimum length is ${e.minlength.requiredLength}.`;
    }
    if (e.maxlength) {
      return `Maximum length is ${e.maxlength.requiredLength}.`;
    }
    return 'Invalid value.';
  }
}
