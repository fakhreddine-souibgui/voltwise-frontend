/*import { Routes } from '@angular/router';

export const routes: Routes = [];*/
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { CompteClientComponent } from './compte-client/compte-client.component';
import { AdminnComponent } from './adminn/adminn.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AdminFaceVerificationComponent } from './admin-face-verification/admin-face-verification.component';
import { AdminUsersListComponent } from './admin-users-list/admin-users-list.component';
import { EspacePublicComponent } from './/espace-public/espace-public.component';
import { GestionStationComponent } from './/gestion-station/gestion-station.component';
import { GestionCasiersComponent } from './/gestion-casiers/gestion-casiers.component';
import { GestionReclamationsComponent } from './/gestion-reclamations/gestion-reclamations.component';
import { DemandesPublicitesComponent } from './/demandes-publicites/demandes-publicites.component';
import { GestionCommentairesComponent } from './gestion-commentaires/gestion-commentaires.component';
import { ArchiveUsersComponent } from './/archive-users/archive-users.component';
import { CorbeilleComponent } from './/corbeille/corbeille.component';
import { MapsComponent } from './/maps/maps.component';
import { ReclamationQrComponent } from './/reclamation-qr/reclamation-qr.component';











export const routes: Routes = [
  { path: '', component: HomeComponent }, // Page principale
  { path: 'home', component: HomeComponent }, // Page principale
  { path: 'admin', component: AdminComponent }, // Page admin
  { path: 'compte-client', component: CompteClientComponent },
  { path: 'authentification', component: AuthentificationComponent } ,
  { path: 'adminn', component: AdminnComponent }, // Page admin
  { path: 'chatbot', component: ChatbotComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'admin-register', component: AdminRegisterComponent },
  {path: 'admin/profile', component: AdminProfileComponent},
    {path: 'AdminFaceVerification', component: AdminFaceVerificationComponent},
        {path: 'Adminuserslist', component: AdminUsersListComponent},
                {path: 'EspacePublic', component: EspacePublicComponent},
                                {path: 'GestionStation', component: GestionStationComponent},

                                {path: 'reclamation-qr', component: ReclamationQrComponent}








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
