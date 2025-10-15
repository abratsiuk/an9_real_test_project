import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IEmployeeData } from '../models/iemployee-data.model';
import { IEmployeeOption } from '../models/iemployee-option.model';
import { IEmployeeRead } from '../models/iemployee-read.model';
import { IEmployeeCreate } from '../models/iemployee-create.model';
import { IEmployeeUpdate } from '../models/iemployee-update.model';
import { IEmployeeCanDelete } from '../models/iemployee-can-delete.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  baseUrl = 'http://localhost:5260';

  constructor(private http: HttpClient) {}

  loadEmployeesData(): Observable<IEmployeeData[] | null> {
    return this.http.get<IEmployeeData[]>(`${this.baseUrl}/api/employees`).pipe(
      catchError((err) => {
        console.error('loadEmployeesData error', err);
        return of(null as IEmployeeData[] | null);
      }),
    );
  }

  getOptions(): Observable<IEmployeeOption[] | null> {
    return this.http.get<IEmployeeOption[]>(`${this.baseUrl}/api/employees/options`).pipe(
      catchError((err) => {
        console.error('getOptions error', err);
        return of(null as IEmployeeOption[] | null);
      }),
    );
  }

  getEmployee(id: number): Observable<IEmployeeRead | null> {
    return this.http.get<IEmployeeRead>(`${this.baseUrl}/api/employees/${id}`).pipe(
      catchError((err) => {
        console.error('getEmployee error', err);
        return of(null as IEmployeeRead | null);
      }),
    );
  }

  createEmployee(dto: IEmployeeCreate): Observable<number | null> {
    return this.http.post<number>(`${this.baseUrl}/api/employees`, dto).pipe(
      catchError((err) => {
        console.error('createEmployee error', err);
        return of(null as number | null);
      }),
    );
  }

  updateEmployee(id: number, dto: IEmployeeUpdate): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/api/employees/${id}`, dto).pipe(
      catchError((err) => {
        console.error('updateEmployee error', err);
        return of(undefined);
      }),
    );
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/api/employees/${id}`).pipe(
      catchError((err) => {
        console.error('deleteEmployee error', err);
        return of(undefined);
      }),
    );
  }
  canDelete(id: number): Observable<IEmployeeCanDelete> {
    return this.http.get<IEmployeeCanDelete>(`${this.baseUrl}/api/employees/${id}/can-delete`).pipe(
      catchError((err) => {
        console.error('canDelete error', err);
        return of({ canDelete: false, reason: 'Unexpected error. Please try again.' });
      }),
    );
  }
}
