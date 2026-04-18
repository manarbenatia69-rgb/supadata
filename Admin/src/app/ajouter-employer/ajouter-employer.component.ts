import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CrudService } from '../service/crud.service';
import { Employer } from '../Entities/Employer.Entities';

@Component({
  selector: 'app-ajouter-employer',
  templateUrl: './ajouter-employer.component.html',
  styleUrls: ['./ajouter-employer.component.css']
})
export class AjouterEmployerComponent {
  employerForm: FormGroup;
  messageCommande: string = '';

  constructor(
    private services: CrudService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.employerForm = this.fb.group({
       nom: new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.pattern("^[a-zA-ZÀ-ÿ\\s'-]+$")
  ]),

  lastname: new FormControl('', [
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


  ngOnInit(): void {
    // Initialization code if needed
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


  addNewEmployer() {
    if (this.employerForm.invalid) {
      // Show specific error messages for each invalid field
      Object.keys(this.employerForm.controls).forEach(key => {
        const control = this.employerForm.get(key);
        if (control?.invalid) {
          const errorMessage = this.getErrorMessage(control, key);
          Swal.fire({
            icon: 'error',
            title: 'Champ invalide',
            text: errorMessage
          });
        }
      });
      return;
    }

    const data = this.employerForm.value;
    const employer = new Employer(
    undefined,
    data.profilepicture,
    data.companylogo,
    data.coverphoto,
    data.nom,
    data.lastname,
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


    this.services.addEmployer(employer).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Employer ajouté avec succès !',
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          this.router.navigate(['/listemployer']).then(() => {
            window.location.reload();
          });
        });
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur s\'est produite lors de l\'ajout de l\'employer'
        });
      }
    });
  }

}

