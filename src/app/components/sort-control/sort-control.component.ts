import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ISort } from '../../models/isort.model';
import { ISortedField } from '../../models/isorted-field.model';

@Component({
  selector: 'app-sort-control',
  templateUrl: './sort-control.component.html',
  styleUrls: ['./sort-control.component.scss'],
})
export class SortControlComponent implements OnInit, OnChanges {
  @Input() sortFields: ISortedField[] = [];
  @Input() defaultSortField = '';
  @Input() defaultSortOrder: 'asc' | 'desc' = 'asc';
  @Output() sortChange = new EventEmitter<ISort>();

  currentSortField = '';
  currentSortOrder: 'asc' | 'desc' = 'asc';

  constructor() {}

  ngOnInit(): void {
    this.currentSortField = this.defaultSortField;
    this.currentSortOrder = this.defaultSortOrder;
    if (this.currentSortField) this.emitSort();
  }
  ngOnChanges(changes: SimpleChanges): void {
    // если входы поменялись после создания — синхронизируемся
    if (changes['defaultSortField'] && !changes['defaultSortField'].firstChange) {
      this.currentSortField = this.defaultSortField;
    }
    if (changes['defaultSortOrder'] && !changes['defaultSortOrder'].firstChange) {
      this.currentSortOrder = this.defaultSortOrder;
    }
  }

  toggleSortOrder() {
    this.currentSortOrder = this.currentSortOrder === 'asc' ? 'desc' : 'asc';
    this.emitSort();
  }

  onSortedFieldChange(fieldCode: string) {
    this.currentSortField = fieldCode;
    this.currentSortOrder = 'asc';
    this.emitSort();
  }
  private emitSort() {
    this.sortChange.emit({
      sortField: this.currentSortField,
      sortOrder: this.currentSortOrder,
    });
  }
}
