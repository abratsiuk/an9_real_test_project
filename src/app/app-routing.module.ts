import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageEmployeesComponent} from './pages/page-employees/page-employees.component';
import {PageEmployeeComponent} from './pages/page-employee/page-employee.component';

const routes: Routes = [
  { path: '', component: PageEmployeesComponent },
  { path: 'employees', component: PageEmployeesComponent },
  { path: 'employee/:id', component: PageEmployeeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
