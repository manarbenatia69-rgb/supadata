import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AjouterAdminComponent } from './ajouter-admin/ajouter-admin.component';
import { ListeAdminComponent } from './liste-admin/liste-admin.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { ListEmployerComponent } from './list-employer/list-employer.component';
import { AjouterEmployerComponent } from './ajouter-employer/ajouter-employer.component';
import { ListRentrepriseComponent } from './list-rentreprise/list-rentreprise.component';
import { AjouterRentrepriseComponent } from './ajouter-rentreprise/ajouter-rentreprise.component';
import { AjouterParticulierComponent } from './ajouter-particulier/ajouter-particulier.component';
import { ListParticulierComponent } from './list-particulier/list-particulier.component';
import { ModifieradminComponent } from './modifieradmin/modifieradmin.component';
import { HomeComponent } from './home/home.component';
import { ModifierEmployerComponent } from './modifier-employer/modifier-employer.component';
import { ModifierEntrepriseComponent } from './modifier-entreprise/modifier-entreprise.component';
import { ModifierParticulierComponent } from './modifier-particulier/modifier-particulier.component';
import { ProfilComponent } from './profil/profil.component';
import { UpdateProfilComponent } from './update-profil/update-profil.component';
import { GlobalSearchComponent } from './global-search/global-search.component';
import { ListContactComponent } from './list-contact/list-contact.component';

@NgModule({
  declarations: [
    AppComponent,
    AjouterAdminComponent,
    ListeAdminComponent,
    LoginComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    ListEmployerComponent,
    AjouterEmployerComponent,
    ListRentrepriseComponent,
    AjouterRentrepriseComponent,
    AjouterParticulierComponent,
    ListParticulierComponent,
    ModifieradminComponent,
    HomeComponent,
    ModifierEmployerComponent,
    ModifierEntrepriseComponent,
    ModifierParticulierComponent,
    ProfilComponent,
    UpdateProfilComponent,
    GlobalSearchComponent,
    ListContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
