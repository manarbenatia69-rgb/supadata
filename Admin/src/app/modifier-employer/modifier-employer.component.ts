import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Employer } from '../Entities/Employer.Entities';
import { CrudService } from '../service/crud.service';


@Component({
  selector: 'app-modifier-employer',
  templateUrl: './modifier-employer.component.html',
  styleUrls: ['./modifier-employer.component.css']
})
export class ModifierEmployerComponent {
  id: number;
employerForm: FormGroup;
 

  constructor(
    private services: CrudService,
    private router: Router,
    private fb: FormBuilder,
    private rout: ActivatedRoute
  ) {
    this.employerForm = this.fb.group({
       nom: new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.pattern("^[a-zA-ZÀ-ÿ\\s'-]+$")
  ]),

 prenom: new FormControl('', [
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
get nom() { return this.employerForm.get('nom'); }
get lastname()  { return this.employerForm.get('lastname'); }
get jobtitle()  { return this.employerForm.get('jobtitle'); }
get departement() { return this.employerForm.get('departement'); }
get companyname() { return this.employerForm.get('companyname'); }
get email()       { return this.employerForm.get('email'); }
get pwd()         { return this.employerForm.get('pwd'); }
get telephone()   { return this.employerForm.get('telephone'); }
get adresse()     { return this.employerForm.get('adresse'); }
get urlcompany()  { return this.employerForm.get('urlcompany'); }
get fblink()      { return this.employerForm.get('fblink'); }
get linkedinlink(){ return this.employerForm.get('linkedinlink'); }
get githublink()  { return this.employerForm.get('githublink'); }
get color()       { return this.employerForm.get('color'); }
get police()      { return this.employerForm.get('police'); }

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
      case 'lastname':
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
    this.services.findEmployerById(idEvent).subscribe({
      next: (result) => {
        let event = result;
        console.log(event);
       this.employerForm.patchValue({
            id: event.id,
            profilepicture: event.profilepicture,
            companylogo: event.companylogo,
            coverphoto: event.coverphoto,
            nom: event.nom,
            prenom: event.prenom,
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
  updateEmployer() {
      if (this.employerForm.invalid) {
        let errorMessages: string[] = [];
        Object.keys(this.employerForm.controls).forEach(key => {
          const control = this.employerForm.get(key);
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
  
      let data = this.employerForm.value;
      let employer = new Employer(
        this.id,
       data.profilepicture,
       data.companylogo,
       data.coverphoto,
       data.nom,
    data.prenom,
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
  
      this.services.updateEmployer(this.id, employer).subscribe({
        next: (res) => {
          console.log(res);
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Administrateur modifié avec succès !',
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            this.router.navigate(['ListEmployer']).then(() => {
              window.location.reload();
            });
          });
        },
        error: (err) => {
          console.error('Erreur lors de la modification:', err);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur est survenue lors de la modification de l\'administrateur'
          });
        }
      });
    }
}
