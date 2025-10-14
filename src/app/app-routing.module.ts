import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageBooksComponent } from './book/pages/page-books/page-books.component';
import { PageBookComponent } from './book/pages/page-book/page-book.component';

const routes: Routes = [
  { path: '', component: PageBooksComponent },
  { path: 'books', component: PageBooksComponent },
  { path: 'book/:id', component: PageBookComponent },
];
// const routes: Routes = [
//   { path: '', component: HomeComponent },
//   { path: 'home', component: HomeComponent },
//   { path: 'about', component: AboutComponent },
//   { path: 'contacts', component: ContactsComponent },
//   { path: 'user/:id', component: UserComponent },
//   {
//     path: 'admin',
//     component: AdminComponent,
//     canActivate: [AuthGuard],
//     children: [
//       { path: 'users', component: UsersComponent },
//       { path: 'settings', component: SettingsComponent },
//       { path: '', redirectTo: 'users', pathMatch: 'full' },
//     ],
//   },
//   { path: 'login', component: LoginComponent },
//   { path: '**', component: NotFoundComponent },
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
