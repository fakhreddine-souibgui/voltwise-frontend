/*import { Routes } from '@angular/router';

export const routes: Routes = [];*/
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';


export const routes: Routes = [
  { path: '', component: AppComponent }, // Page principale
  { path: 'home', component: HomeComponent }, // Page principale
  { path: 'admin', component: AdminComponent } // Page admin
];


@NgModule({
  //declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled', // Permet de gérer la position du scroll
    }),
  ],
  providers: [],
})
export class AppModule {}
