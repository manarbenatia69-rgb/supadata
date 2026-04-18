import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Particulier } from '../Entities/Particulier.Entities';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-ajouter-particulier',
  templateUrl: './ajouter-particulier.component.html',
  styleUrls: ['./ajouter-particulier.component.css']
})
export class AjouterParticulierComponent {
 particulierForm: FormGroup;
  messageCommande: string = '';

  constructor(
    private services: CrudService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.particulierForm = this.fb.group({
      nom: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern("^[a-zA-ZÀ-ÿ\\s'-]+$") // Only alphabetic characters
      ]),
      prenom: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern("^[a-zA-ZÀ-ÿ\\s'-]+$") // Only alphabetic characters
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@gmail\\.com$') // Must end with @gmail.com
      ]),
      pwd: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z0-9]+$') // Alphanumeric
      ]),
      telephone: new FormControl('', [
        Validators.required,
        Validators.pattern('^\\+?[0-9]{7,15}$') // Phone number pattern
      ]),
      adresse: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern("^[a-zA-Z0-9À-ÿ\\s,'-]+$") // Address pattern
      ])
     
    });
  }

  ngOnInit(): void {
    // Initialization code if needed
  }

  // Getters for form controls
  get nom() { return this.particulierForm.get('nom'); }
  get prenom() { return this.particulierForm.get('prenom'); }
  get email() { return this.particulierForm.get('email'); }
  get pwd() { return this.particulierForm.get('pwd'); }
  get telephone() { return this.particulierForm.get('telephone'); }
  get adresse() { return this.particulierForm.get('adresse'); }
  // Helper method to show error messages
  getErrorMessage(control: any, fieldName: string) {
    if (control.hasError('required')) {
      return `Le champ ${fieldName} est obligatoire`;
    }
    if (control.hasError('minlength')) {
      return `Le champ ${fieldName} doit contenir au moins ${control.errors.minlength.requiredLength} caractères`;
    }
    if (control.hasError('pattern')) {
      switch(fieldName) {
        case 'nom':
            return 'Seuls les caractères alphabétiques sont autorisés';
        case 'prenom':
          return 'Seuls les caractères alphabétiques sont autorisés';
            case 'email':
          return 'L\'email doit se terminer par @gmail.com';
        case 'pwd':
          return 'Le mot de passe doit contenir uniquement des caractères alphanumériques';
        case 'telephone':
          return 'Le numéro de téléphone est invalide';
        default:
          return 'Format invalide';
        case 'adresse':
          return 'L\'adresse est invalide';
      }
    }
    return '';
  }

  addNewParticulier() {
    if (this.particulierForm.invalid) {
      // Show specific error messages for each invalid field
      Object.keys(this.particulierForm.controls).forEach(key => {
        const control = this.particulierForm.get(key);
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

    const data = this.particulierForm.value;
    const particulier = new Particulier(undefined, data.nom, data.prenom, data.email, data.pwd, data.telephone, data.adresse);

    this.services.addParticulier(particulier).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Particulier ajouté avec succès !',
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          this.router.navigate(['/listParticulier']).then(() => {
            window.location.reload();
          });
        });
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur s\'est produite lors de l\'ajout du particulier. Veuillez réessayer.'
        });
      }
    });
  }

}
