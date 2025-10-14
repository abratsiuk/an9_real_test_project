import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [];
// const routes: Routes = [
//   { path: '', component: PageBooksComponent },
//   { path: 'employees', component: PageBooksComponent },
//   { path: 'employee/:id', component: PageBookComponent },
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
