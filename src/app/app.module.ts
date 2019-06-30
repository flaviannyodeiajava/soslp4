import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';

import { RouterModule, Routes } from '@angular/router';
import { NgbModule, NgbModalModule, NgbDatepickerModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { AuthGuard } from './auth.guard';

const appRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    NgbModule,
    NgbModalModule,
    NgbDatepickerModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    NgbAlertModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})

export class AppModule { }