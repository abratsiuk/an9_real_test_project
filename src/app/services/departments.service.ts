import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IDepartment } from '../models/idepartment.model';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DepartmentsService {
  baseUrl = 'http://localhost:5260';

  constructor(private http: HttpClient) {}

  getAll(): Observable<IDepartment[] | null> {
    return this.http.get<IDepartment[]>(`${this.baseUrl}/api/departments`).pipe(
      catchError((err) => {
        console.error('getAll departments error', err);
        return of(null as IDepartment[] | null);
      }),
    );
  }
}
