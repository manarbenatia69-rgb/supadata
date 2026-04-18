import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CrudService } from '../service/crud.service';
import { REntreprise } from '../Entities/REntreprise.Entities';

@Component({
  selector: 'app-modifier-entreprise',
  templateUrl: './modifier-entreprise.component.html',
  styleUrls: ['./modifier-entreprise.component.css']
})
export class ModifierEntrepriseComponent {
 id: number;
entrepriseForm: FormGroup;
 

  constructor(
    private services: CrudService,
    private router: Router,
    private fb: FormBuilder,
    private rout: ActivatedRoute
  ) {
    this.entrepriseForm = this.fb.group({

    nom: new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.pattern("^[a-zA-ZÀ-ÿ\\s'-]+$")
  ]),

  jobtitle: new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.pattern("^[a-zA-ZÀ-ÿ0-9\\s,'-]+$")
  ]),

  departement: new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.pattern("^[a-zA-ZÀ-ÿ0-9\\s,'-]+$")
  ]),

  companyname: new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.pattern("^[a-zA-ZÀ-ÿ0-9\\s,'&-]+$")
  ]),

  email: new FormControl('', [
    Validators.required,
    Validators.email
  ]),

  pwd: new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern('^[a-zA-Z0-9]+$')
  ]),

  telephone: new FormControl('', [
    Validators.required,
    Validators.pattern('^\\+?[0-9]{7,15}$')
  ]),

  adresse: new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.pattern("^[a-zA-Z0-9À-ÿ\\s,'-]+$")
  ]),

  urlcompany: new FormControl('', [
    Validators.pattern('')
  ]),

  fblink: new FormControl('', [
    Validators.pattern('')
  ]),

  linkedinlink: new FormControl('', [
    Validators.pattern('')
  ]),

  githublink: new FormControl('', [
    Validators.pattern('')
  ]),

  color: new FormControl('', [
    Validators.pattern('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$')
  ]),

  police: new FormControl('', [
    Validators.minLength(2)
  ]),

  profilepicture: new FormControl(''),
  companylogo: new FormControl(''),
  coverphoto: new FormControl('')

});
  }


 
  // Getters for form controls
get nom()         { return this.entrepriseForm.get('nom'); }
get jobtitle()    { return this.entrepriseForm.get('jobtitle'); }
get departement() { return this.entrepriseForm.get('departement'); }
get companyname() { return this.entrepriseForm.get('companyname'); }
get email()       { return this.entrepriseForm.get('email'); }
get pwd()         { return this.entrepriseForm.get('pwd'); }
get telephone()   { return this.entrepriseForm.get('telephone'); }
get adresse()     { return this.entrepriseForm.get('adresse'); }
get urlcompany()  { return this.entrepriseForm.get('urlcompany'); }
get fblink()      { return this.entrepriseForm.get('fblink'); }
get linkedinlink(){ return this.entrepriseForm.get('linkedinlink'); }
get githublink()  { return this.entrepriseForm.get('githublink'); }
get color()       { return this.entrepriseForm.get('color'); }
get police()      { return this.entrepriseForm.get('police'); }

  // Helper method to show error messages
  getErrorMessage(control: any, fieldName: string): string {

  if (control.hasError('required')) {
    return `Le champ ${fieldName} est obligatoire`;
  }

  if (control.hasError('minlength')) {
    return `Le champ ${fieldName} doit contenir au moins ${control.errors.minlength.requiredLength} caractères`;
  }

  if (control.hasError('email')) {
    return `Format d'email invalide`;
  }

  if (control.hasError('pattern')) {
    switch (fieldName) {
      case 'nom':
        return 'Seuls les caractères alphabétiques sont autorisés';

      case 'jobtitle':
      case 'departement':
      case 'companyname':
        return 'Format texte invalide';

      case 'telephone':
        return 'Numéro de téléphone invalide';

      case 'pwd':
        return 'Mot de passe trop faible';

      case 'urlcompany':
      case 'fblink':
      case 'linkedinlink':
      case 'githublink':
        return 'URL invalide';

      case 'color':
        return 'Couleur hexadécimale invalide (ex: #FF5733)';

      case 'adresse':
        return 'Adresse invalide';

      default:
        return 'Format invalide';
    }
  }

  return '';
}
 ngOnInit(): void {
    let idEvent = this.rout.snapshot.params['id'];
    this.id = idEvent;
    this.services.findRentrepriseById(idEvent).subscribe({
      next: (result) => {
        let event = result;
        console.log(event);
       this.entrepriseForm.patchValue({
            id: event.id,
            profilepicture: event.profilepicture,
            companylogo: event.companylogo,
            coverphoto: event.coverphoto,
            nom: event.nom,
           
            jobtitle: event.jobtitle,
            departement: event.departement,
            companyname: event.companyname,
            email: event.email,
            pwd: event.pwd,
            telephone: event.telephone,
            urlcompany: event.urlcompany,
            adresse: event.adresse,
            color: event.color,
           police: event.police,
           fblink: event.fblink,
           linkedinlink: event.linkedinlink,
           githublink: event.githublink
     });
      },
      error: (err) => {
        console.error('Erreur lors du chargement de l\'employer:', err);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Impossible de charger les informations de l\'administrateur'
        });
      }
    });
  }

  updateEntreprise() {
      if (this.entrepriseForm.invalid) {
        let errorMessages: string[] = [];
        Object.keys(this.entrepriseForm.controls).forEach(key => {
          const control = this.entrepriseForm.get(key);
          if (control?.invalid) {
            errorMessages.push(this.getErrorMessage(control, key));
          }
        });
  
        
        Swal.fire({
          icon: 'error',
          title: 'Champs invalides',
          html: errorMessages.join('<br>'),
          showConfirmButton: true
        });
        return;
      }
  
      let data = this.entrepriseForm.value;
      let entreprise = new REntreprise(
        this.id,
       data.profilepicture,
       data.companylogo,
       data.coverphoto,
       data.nom,
       data.jobtitle,
      data.departement,
      data.companyname,
      data.email,
      data.pwd,
      data.telephone,
     data.urlcompany,
     data.adresse,
     data.color,
    data.police,
    data.fblink,
    data.linkedinlink,
    data.githublink
      );
  
      this.services.updateRentreprise(this.id, entreprise).subscribe({
        next: (res) => {
          console.log(res);
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Entreprise modifiée avec succès !',
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            this.router.navigate(['/ListeRRentreprise']).then(() => {
              window.location.reload();
            });
          });
        },
        error: (err) => {
          console.error('Erreur lors de la modification:', err);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur est survenue lors de la modification de l\'entreprise'
          });
        }
      });
    }
}
