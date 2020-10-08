import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from '@app/error-pages/not-found/not-found.component';
import { ServerErrorComponent } from '@app/error-pages/server-error/server-error.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'book', loadChildren: () => import('./book/book.module').then(m => m.BookModule) },
  { path: 'author', loadChildren: () => import('./author/author.module').then(m => m.AuthorModule) },
  { path: 'subject', loadChildren: () => import('./subject/subject.module').then(m => m.SubjectModule) },
  { path: 'report', component: ReportComponent},
  { path: '404', component: NotFoundComponent},
  { path: '500', component: ServerErrorComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
