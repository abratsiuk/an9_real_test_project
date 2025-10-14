import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IEmployeeData } from '../models/iemployee-data.model';
import { IEmployeeOption } from '../models/iemployee-option.model';
import { IEmployeeRead } from '../models/iemployee-read.model';
import { IEmployeeCreate } from '../models/iemployee-create.model';
import { IEmployeeUpdate } from '../models/iemployee-update.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  // Adjust to your backend URL/port
  baseUrl = 'http://localhost:5260';

  constructor(private http: HttpClient) {}

  /** Table data: id, first/last, departmentName, managerFullName, salary */
  loadEmployeesData(): Observable<IEmployeeData[] | null> {
    return this.http.get<IEmployeeData[]>(`${this.baseUrl}/api/employees`).pipe(
      catchError((err) => {
        console.error('loadEmployeesData error', err);
        return of(null as IEmployeeData[] | null);
      }),
    );
  }

  /** Options list: id + full name */
  getOptions(): Observable<IEmployeeOption[] | null> {
    return this.http.get<IEmployeeOption[]>(`${this.baseUrl}/api/employees/options`).pipe(
      catchError((err) => {
        console.error('getOptions error', err);
        return of(null as IEmployeeOption[] | null);
      }),
    );
  }

  /** Read single (for edit form) */
  getEmployee(id: number): Observable<IEmployeeRead | null> {
    return this.http.get<IEmployeeRead>(`${this.baseUrl}/api/employees/${id}`).pipe(
      catchError((err) => {
        console.error('getEmployee error', err);
        return of(null as IEmployeeRead | null);
      }),
    );
  }

  /** Create employee (backend returns plain number = newId) */
  createEmployee(dto: IEmployeeCreate): Observable<number | null> {
    return this.http.post<number>(`${this.baseUrl}/api/employees`, dto).pipe(
      catchError((err) => {
        console.error('createEmployee error', err);
        return of(null as number | null);
      }),
    );
  }

  /** Update employee */
  updateEmployee(id: number, dto: IEmployeeUpdate): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/api/employees/${id}`, dto).pipe(
      catchError((err) => {
        console.error('updateEmployee error', err);
        return of(undefined);
      }),
    );
  }

  /** Delete employee */
  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/api/employees/${id}`).pipe(
      catchError((err) => {
        console.error('deleteEmployee error', err);
        return of(undefined);
      }),
    );
  }
}
