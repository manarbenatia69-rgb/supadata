import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../service/crud.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { REntreprise } from '../Entities/REntreprise.Entities';


@Component({
  selector: 'app-ajouter-rentreprise',
  templateUrl: './ajouter-rentreprise.component.html',
  styleUrls: ['./ajouter-rentreprise.component.css']
})
export class AjouterRentrepriseComponent {
 rentrepriseForm: FormGroup;
  messageCommande: string = '';

  constructor(
    private services: CrudService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.rentrepriseForm = this.fb.group({
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
    
    Validators.minLength(2),
    Validators.pattern("^[a-zA-ZÀ-ÿ0-9\\s,'-]+$")
  ]),

  companyname: new FormControl('', [
    
    Validators.minLength(2),
    Validators.pattern("^[a-zA-Z0-9]+$")
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
  get nom() { return this.rentrepriseForm.get('nom'); }
get jobtitle() { return this.rentrepriseForm.get('jobtitle'); }
get departement() { return this.rentrepriseForm.get('departement'); }
get companyname() { return this.rentrepriseForm.get('companyname'); }
get email() { return this.rentrepriseForm.get('email'); }
get pwd() { return this.rentrepriseForm.get('pwd'); }
get telephone() { return this.rentrepriseForm.get('telephone'); }
get adresse() { return this.rentrepriseForm.get('adresse'); }
get urlcompany() { return this.rentrepriseForm.get('urlcompany'); }
get fblink() { return this.rentrepriseForm.get('fblink'); }
get linkedinlink() { return this.rentrepriseForm.get('linkedinlink'); }
get githublink() { return this.rentrepriseForm.get('githublink'); }
get color() { return this.rentrepriseForm.get('color'); }
get police() { return this.rentrepriseForm.get('police'); }
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


  addNewREntreprise() {
    if (this.rentrepriseForm.invalid) {
      // Show specific error messages for each invalid field
      Object.keys(this.rentrepriseForm.controls).forEach(key => {
        const control = this.rentrepriseForm.get(key);
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

    const data = this.rentrepriseForm.value;
    const rentreprise = new REntreprise(undefined, data.profilepicture,
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
    data.githublink);

    this.services.addRentreprise(rentreprise).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Rentreprise ajoutée avec succès !',
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          this.router.navigate(['/listerentreprise']).then(() => {
            window.location.reload();
          });
        });
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur s\'est produite lors de l\'ajout de l\'entreprise'
        });
      }
    });
  }
}
