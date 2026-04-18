import { HttpClient, HttpEvent, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employer } from '../Entities/Employer.Entities';
import { Particulier } from '../Entities/Particulier.Entities';
import { REntreprise } from '../Entities/REntreprise.Entities';
import { Contact } from '../Entities/Contact.Entities';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
apiUrl = 'http://localhost:8081/api';
loginEntrepriseUrl='http://localhost:8081/api/rentreprise/login'
loginEmployerUrl='http://localhost:8081/api/employer/login'
loginParticulierUrl='http://localhost:8081/api/particulier/login'
GoogleUrl='http://localhost:8081/api/employer/login-google'

helper=new JwtHelperService();
  constructor(private http: HttpClient) { }
  
  /*addEmployer(employer:Employer){
    return this.http.post<any>(this.apiUrl+"/employer/ajouter", employer);
  }*/
  addEmployer (employer:FormData) {
    return this.http.post<any>(this.apiUrl +"/employer/ajouter", employer);

  }
  addRentreprise(rentreprise:REntreprise){
    return this.http.post<any>(this.apiUrl+"/rentreprise", rentreprise);
  }
  addParticulier(particulier:Particulier){
    return this.http.post<any>(this.apiUrl+"/particulier", particulier);
  }
  addContact(contact: Contact) {
    return this.http.post<any>(this.apiUrl+"/contact", contact);
  }

  
  getEmployer(): Observable<Employer[]>{
    return this.http.get<Employer[]>(this.apiUrl +"/employer");
  }
  getRentreprise(): Observable<REntreprise[]>{
    return this.http.get<REntreprise[]>(this.apiUrl +"/rentreprise");
  }
  getParticulier(): Observable<Particulier[]>{
    return this.http.get<Particulier[]>(this.apiUrl +"/particulier");
  }

  
  onDeleteEmployer(id : number){
    const url =`${this.apiUrl+"/employer"}/${id}` //lire id dans entity employer
    return this.http.delete(url )
  }
  onDeleteRentreprise(id : number){
    const url =`${this.apiUrl+"/rentreprise"}/${id}` //lire id dans entity rentreprise
    return this.http.delete(url )
  }
  onDeleteParticulier(id : number){
    const url =`${this.apiUrl+"/particulier"}/${id}` //lire id dans entity particulier
    return this.http.delete(url )
  }

 
 loginEntreprise(entreprise:REntreprise){ 
  return this.http.post<any>(this.apiUrl+"/rentreprise/login",entreprise)
 }
 loginEmployer(employer:Employer){
  return this.http.post<any>(this.apiUrl+"/employer/login",employer)
 }
 loginParticulier(particulier:Particulier){
  return this.http.post<any>(this.apiUrl+"/particulier/login",particulier)
 }
   
   /*isLoggedIn(){

    let token = localStorage.getItem("myToken");

    if (token) {
      return true ;
    } else {
      return false;
    }
  }*/
  
  updateEmployer(id:number,employer: Employer) {
    const url = `${this.apiUrl+"/employer"}/${id}`;
    return this.http.put<any>(url,employer);
  }
  updateRentreprise(id:number,rentreprise: REntreprise) {
    const url = `${this.apiUrl+"/rentreprise"}/${id}`;
    return this.http.put<any>(url,rentreprise);
  }
  updateParticulier(id:number,particulier: Particulier) {
    const url = `${this.apiUrl+"/particulier"}/${id}`;
    return this.http.put<any>(url,particulier);
  }
  
   
  findEmployerById(id : number): Observable<Employer> {
    const url = `${this.apiUrl + "/employer"}/${id}`;
    return this.http.get<Employer>(url)
  }

  findRentrepriseById(id : number): Observable<REntreprise> {
    const url = `${this.apiUrl + "/rentreprise"}/${id}`;
    return this.http.get<REntreprise>(url)
  }

  findParticulierById(id : number): Observable<Particulier> {
    const url = `${this.apiUrl + "/particulier"}/${id}`;
    return this.http.get<Particulier>(url)
  }


  signInWithGoogle(idToken: string): Observable<any> {
  const params = new HttpParams().set('id_token', idToken);
  return this.http.post(this.GoogleUrl, null, { params });
}

 userDetailsEmployer(){
  let token = localStorage.getItem('myTokenEmployer'); 
  if(token){
    let decodeToken = this.helper.decodeToken(token); 
    if(decodeToken && decodeToken.data){
      return decodeToken.data;
    }
  }
}
userDetailsEntreprise(){
  let token = localStorage.getItem('myTokenEntreprise'); 
  if(token){
    let decodeToken = this.helper.decodeToken(token); 
    if(decodeToken && decodeToken.data){
      return decodeToken.data;
    }
  }
}
userDetailsParticulier(){
  let token = localStorage.getItem('myTokenParticulier'); 
  if(token){
    let decodeToken = this.helper.decodeToken(token); 
    if(decodeToken && decodeToken.data){
      return decodeToken.data;
    }
  }
}
uploadEmployees(file: File, entrepriseId: number): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.apiUrl}/fichiercsv/upload/${entrepriseId}`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
  isEntrepriseIn(){

  let token = localStorage.getItem("myTokenEntreprise");
  if (token) {
    return true ;
  } else {
    return false;
  }
}

isParticulierIn(){

  let token = localStorage.getItem("myTokenParticulier");
  if (token) {
    return true ;
  } else {
    return false;
  }
}
isEmployerIn(){

  let token = localStorage.getItem("myTokenEmployer");
  if (token) {
    return true ;
  } else {
    return false;
  }
}
getEmployersByEntreprise(id: number): Observable<any[]> {
  return this.http.get<any[]>(this.apiUrl + "/employer/entreprise/" + id);
}


// Rendre le flux accessible en lecture seulement
private userSubject = new BehaviorSubject<any>(this.userDetailsEntreprise());

user$ = this.userSubject.asObservable();

// Mettre à jour les informations de l'utilisateur
updateUser(user: any) {
  this.userSubject.next(user); // envoyer les nouvelles données
}
}
