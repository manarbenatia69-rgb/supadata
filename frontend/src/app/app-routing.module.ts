import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { RegisterParticulierComponent } from './register-particulier/register-particulier.component';
import { RegisterEmployerComponent } from './register-employer/register-employer.component';
import { RegisterEntrepriseComponent } from './register-entreprise/register-entreprise.component';
import { LoginEmployerComponent } from './login-employer/login-employer.component';
import { LoginEntrepriseComponent } from './login-entreprise/login-entreprise.component';
import { LoginParticulierComponent } from './login-particulier/login-particulier.component';
import { FichierCsvComponent } from './fichier-csv/fichier-csv.component';
import { CardComponent } from './card/card.component'; 
import { ChoixComponent } from './choix/choix.component'; 
import { AuthGuard } from './service/Auth.service';
import { EditCardComponent } from './edit-card/edit-card.component';



const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'about',component:AboutComponent},
  {path:'contact',component:ContactComponent},
  {path:'login-employer',component:LoginEmployerComponent},
  {path:'login-entreprise',component:LoginEntrepriseComponent},
  {path:'login-particulier',component:LoginParticulierComponent},
  {path:'register-particulier',component:RegisterParticulierComponent},
  {path:'register-employer',component:RegisterEmployerComponent},
  {path:'register-entreprise',component:RegisterEntrepriseComponent},
  {path:'fichiercsv',component:FichierCsvComponent , canActivate:[AuthGuard]},
  {path:'card',component:CardComponent, canActivate:[AuthGuard]},
  {path:'choix',component:ChoixComponent},
  {path:'editcard',component:EditCardComponent , canActivate:[AuthGuard]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
