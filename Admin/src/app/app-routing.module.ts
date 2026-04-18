import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjouterAdminComponent } from './ajouter-admin/ajouter-admin.component';
import { ListeAdminComponent } from './liste-admin/liste-admin.component';
import { LoginComponent } from './login/login.component';
import { ListEmployerComponent } from './list-employer/list-employer.component';
import { AjouterEmployerComponent } from './ajouter-employer/ajouter-employer.component';
import { ListRentrepriseComponent } from './list-rentreprise/list-rentreprise.component';
import { AjouterRentrepriseComponent } from './ajouter-rentreprise/ajouter-rentreprise.component';
import { AuthGuard } from './service/Auth.service';
import { AjouterParticulierComponent } from './ajouter-particulier/ajouter-particulier.component';
import { ListParticulierComponent } from './list-particulier/list-particulier.component';
import { ModifieradminComponent } from './modifieradmin/modifieradmin.component';
import { HomeComponent } from './home/home.component';
import { ProfilComponent } from './profil/profil.component';
import { UpdateProfilComponent } from './update-profil/update-profil.component';
import { ModifierEmployerComponent } from './modifier-employer/modifier-employer.component';
import { ModifierEntrepriseComponent } from './modifier-entreprise/modifier-entreprise.component';
import { ModifierParticulierComponent } from './modifier-particulier/modifier-particulier.component';
import { GlobalSearchComponent } from './global-search/global-search.component';
import { ListContactComponent } from './list-contact/list-contact.component';

const routes: Routes = [
  {path:'ajouteradmin',component:AjouterAdminComponent , canActivate: [AuthGuard]},
  {path:'ListeAdmin',component:ListeAdminComponent, canActivate: [AuthGuard]},
  {path:'',component:LoginComponent},
  {path:'ListEmployer',component:ListEmployerComponent, canActivate: [AuthGuard]},
  {path:'AjouterEmployer',component:AjouterEmployerComponent, canActivate: [AuthGuard]},
  {path:'AjouterRentreprise',component:AjouterRentrepriseComponent, canActivate: [AuthGuard]},
  {path:'ListeRRentreprise',component:ListRentrepriseComponent, canActivate: [AuthGuard]},
  {path:'AjouterParticulier',component:AjouterParticulierComponent, canActivate: [AuthGuard]},
  {path:'ListeParticulier',component:ListParticulierComponent, canActivate: [AuthGuard]},
  {path:'ModifierAdmin/:id',component:ModifieradminComponent, canActivate: [AuthGuard]},
  {path:'home',component:HomeComponent, canActivate: [AuthGuard]},
  {path:'profil/:id',component:ProfilComponent, canActivate: [AuthGuard]},
  {path:'updateprofil/:id',component:UpdateProfilComponent, canActivate: [AuthGuard]},
  {path:'modifieremployer/:id',component:ModifierEmployerComponent, canActivate: [AuthGuard]},
  {path:'modifierentreprise/:id',component:ModifierEntrepriseComponent, canActivate: [AuthGuard]},
  {path:'modifierparticulier/:id',component:ModifierParticulierComponent, canActivate: [AuthGuard]},
  {path: 'search', component: GlobalSearchComponent, canActivate: [AuthGuard] },
  {path:'listcontact',component:ListContactComponent, canActivate: [AuthGuard]},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
