import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../Entities/Admin.Entities';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employer } from '../Entities/Employer.Entities';
import { REntreprise } from '../Entities/REntreprise.Entities';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Particulier } from '../Entities/Particulier.Entities';
import { Contact } from '../Entities/Contact.Entities';

@Injectable({
  providedIn: 'root'
})


export class CrudService {
apiUrl = 'http://localhost:8081/api';
loginAdminUrl='http://localhost:8081/api/admin/login'
helper=new JwtHelperService();
  constructor(private http: HttpClient) { }
  addadmin(admin:Admin){
    return this.http.post<any>(this.apiUrl+"/admin", admin);
  }
  addEmployer(employer:Employer){
    return this.http.post<any>(this.apiUrl+"/employer/ajouter", employer);
  }
  addRentreprise(rentreprise:REntreprise){
    return this.http.post<any>(this.apiUrl+"/rentreprise", rentreprise);
  }
  addParticulier(particulier:Particulier){
    return this.http.post<any>(this.apiUrl+"/particulier", particulier);
  }

  getAdmin(): Observable<Admin[]>{
    return this.http.get<Admin[]>(this.apiUrl +"/admin");
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
  getContact(): Observable<Contact[]>{
    return this.http.get<Contact[]>(this.apiUrl +"/contact");
  }

  onDeleteAdmin(id : number){
    const url =`${this.apiUrl+"/admin"}/${id}` //lire id dans entity admin 
    return this.http.delete(url )
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
  onDeleteContact(id : number){
    const url =`${this.apiUrl+"/contact"}/${id}` //lire id dans entity contact
    return this.http.delete(url )
  }

  loginAdmin(admin:Admin){ 
  return this.http.post<any>(this.loginAdminUrl,admin)
 }
  userDetails(){
  let token = localStorage.getItem('myToken'); 
  if(token){
    let decodeToken = this.helper.decodeToken(token); 
    if(decodeToken && decodeToken.data){
      return decodeToken.data;
    }
  }
  return null; // si pas de token ou decodeToken.data manquante
}
   
   isLoggedIn(){

    let token = localStorage.getItem("myToken");

    if (token) {
      return true ;
    } else {
      return false;
    }
  }
  updateAdmin(id:number,admin: Admin) {
    const url = `${this.apiUrl+"/admin"}/${id}`;
    return this.http.put<any>(url,admin);
  }
  updateEmployer(id:number,employer: Employer) {
    const url = `${this.apiUrl+"/employer"}/${id}`;
    return this.http.put<any>(url,employer);
  }
  updateRentreprise(id:number,rentreprise: REntreprise) {
    const url = `${this.apiUrl+"/rentreprise"}/${id}`;
    return this.http.put<any>(url,rentreprise);
  }
  updateREtatRentreprise(id:number,rentreprise: REntreprise) {
    const url = `${this.apiUrl+"/rentreprise/updateetat"}/${id}`;
    return this.http.put<any>(url,rentreprise);
  }
  updateParticulier(id:number,particulier: Particulier) {
    const url = `${this.apiUrl+"/particulier"}/${id}`;
    return this.http.put<any>(url,particulier);
  }
  
   findAdminById(id : number): Observable<Admin> {
    const url = `${this.apiUrl + "/admin"}/${id}`;
    return this.http.get<Admin>(url)
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
  // Créer un flux avec les informations de l'utilisateur (depuis le token)
private userSubject = new BehaviorSubject<any>(this.userDetails());

// Rendre le flux accessible en lecture seulement
user$ = this.userSubject.asObservable();

// Mettre à jour les informations de l'utilisateur
updateUser(user: any) {
  this.userSubject.next(user); // envoyer les nouvelles données
}
}
