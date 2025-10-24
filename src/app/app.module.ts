import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {PageEmployeesComponent} from './pages/page-employees/page-employees.component';
import {PageEmployeeComponent} from './pages/page-employee/page-employee.component';
import {EmployeeEditComponent} from './components/employee-edit/employee-edit.component';
import {EmployeesComponent} from './components/employees/employees.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from './components/confirmation-dialog/confirmation-dialog.component';
import {LayoutModule} from '@angular/cdk/layout';
import {EmployeesCardsComponent} from './components/employees-cards/employees-cards.component';
import {EmployeeCardComponent} from './components/employee-card/employee-card.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { SortControlComponent } from './components/sort-control/sort-control.component';

@NgModule({
  declarations: [
    AppComponent,
    PageEmployeesComponent,
    PageEmployeeComponent,
    EmployeeEditComponent,
    EmployeesComponent,
    NotFoundComponent,
    ConfirmationDialogComponent,
    EmployeesCardsComponent,
    EmployeeCardComponent,
    SortControlComponent,
  ],
  imports: [
    LayoutModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule /**/,
    MatTooltipModule /**/,
    MatFormFieldModule /**/,
    MatInputModule /**/,
    MatSelectModule /**/,
    MatSnackBarModule /**/,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonModule /**/,
    MatCardModule /**/,
    MatIconModule /**/,
    MatDividerModule /**/,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule /**/,
    MatPaginatorModule /**/,
    MatSortModule /**/,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
