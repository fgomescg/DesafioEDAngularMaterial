import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './layout/layout.component';
import { RoutingModule } from './routing/routing.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { BookModule } from './book/book.module';
import { AuthorModule } from './author/author.module';
import { SubjectModule } from './subject/subject.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { ServerErrorComponent } from './error-pages/server-error/server-error.component';
import { SharedModule } from '@app/shared/shared.module';
import { ReportComponent } from './report/report.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    LayoutComponent,
    HeaderComponent,
    SidenavListComponent,
    NotFoundComponent,
    ServerErrorComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RoutingModule,
    BookModule,
    AuthorModule,
    SubjectModule,
    SharedModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
