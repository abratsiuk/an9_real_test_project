import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { IEmployeeData } from '../models/iemployee-data.model';
import { EmployeesService } from '../services/employees.service';

export class EmployeesDataSource extends DataSource<IEmployeeData> {
  private dataSubject = new BehaviorSubject<IEmployeeData[]>([]);
  // публичный поток данных (чтобы *ngFor мог подписаться)
  public data$ = this.dataSubject.asObservable();
  private totalSubject = new BehaviorSubject<number>(0);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  total$ = this.totalSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();

  constructor(private svc: EmployeesService) {
    super();
  }

  connect(_: CollectionViewer): Observable<IEmployeeData[]> {
    return this.dataSubject.asObservable();
  }

  disconnect(): void {
    this.dataSubject.complete();
    this.totalSubject.complete();
    this.loadingSubject.complete();
  }

  load(pageIndex: number, pageSize: number, sortField: string, sortOrder: 'asc' | 'desc') {
    this.loadingSubject.next(true);
    this.svc
      .getEmployeesPage(pageIndex, pageSize, sortField, sortOrder)
      .pipe(finalize(() => this.loadingSubject.next(false)))
      .subscribe((res) => {
        this.dataSubject.next(res.data || []);
        this.totalSubject.next(res.totalCount || 0);
      });
  }
}
