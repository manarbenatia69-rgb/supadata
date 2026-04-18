import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterEmployerComponent } from './register-employer/register-employer.component';
import { RegisterEntrepriseComponent } from './register-entreprise/register-entreprise.component';
import { RegisterParticulierComponent } from './register-particulier/register-particulier.component';
import { LoginEmployerComponent } from './login-employer/login-employer.component';
import { LoginEntrepriseComponent } from './login-entreprise/login-entreprise.component';
import { LoginParticulierComponent } from './login-particulier/login-particulier.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FichierCsvComponent } from './fichier-csv/fichier-csv.component';
import { CardComponent } from './card/card.component';
import { ChoixComponent } from './choix/choix.component';
import { EditCardComponent } from './edit-card/edit-card.component';
import { DashbordEmployerComponent } from './dashbord-employer/dashbord-employer.component';
import { DashbordParticulierComponent } from './dashbord-particulier/dashbord-particulier.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    RegisterEmployerComponent,
    RegisterEntrepriseComponent,
    RegisterParticulierComponent,
    LoginEmployerComponent,
    LoginEntrepriseComponent,
    LoginParticulierComponent,
    HeaderComponent,
    FooterComponent,
    FichierCsvComponent,
    CardComponent,
    ChoixComponent,
    EditCardComponent,
    DashbordEmployerComponent,
    DashbordParticulierComponent
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
