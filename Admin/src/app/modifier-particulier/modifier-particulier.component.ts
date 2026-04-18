import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { CrudService } from '../service/crud.service';
import { Particulier } from '../Entities/Particulier.Entities';

@Component({
  selector: 'app-modifier-particulier',
  templateUrl: './modifier-particulier.component.html',
  styleUrls: ['./modifier-particulier.component.css']
})
export class ModifierParticulierComponent {
  id: number;
  particulierForm: FormGroup;
  constructor(
    private services: CrudService,
    private router: Router,
    private fb: FormBuilder,
    private rout: ActivatedRoute
  ) {
    let formControls = {
      nom: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern("^[a-zA-ZÀ-ÿ\\s'-]+$") // Caractères alphabétiques uniquement
      ]),
      prenom: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern("^[a-zA-ZÀ-ÿ\\s'-]+$") // Caractères alphabétiques uniquement
      ]),
      
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@gmail\\.com$') // Doit se terminer par @gmail.com
      ]),
      pwd: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z0-9]+$') // Caractères alphanumériques uniquement
      ]),
      telephone: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]+$') // Caractères numériques uniquement
      ]),
      adresse: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9À-ÿ\\s,.-]+$') // Caractères alphanumériques et certains caractères spéciaux
      ]),
    };
    this.particulierForm = this.fb.group(formControls);
  }

  // Getters pour les contrôles du formulaire
  get nom() { return this.particulierForm.get('nom'); }
  get prenom() { return this.particulierForm.get('prenom'); }
  get email() { return this.particulierForm.get('email'); }
  get pwd() { return this.particulierForm.get('pwd'); }
  get telephone() { return this.particulierForm.get('telephone'); }
  get adresse() { return this.particulierForm.get('adresse'); }

  // Méthode pour afficher les messages d'erreur
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
        case 'prenom':
          return 'Seuls les caractères alphabétiques sont autorisés';
        case 'email':
          return 'L\'email doit se terminer par @gmail.com';
        case 'pwd':
          return 'Le mot de passe doit contenir uniquement des caractères alphanumériques';
        case 'telephone':
          return 'Le numéro de téléphone doit contenir uniquement des chiffres';
        case 'adresse':
          return 'L\'adresse doit contenir uniquement des caractères valides';
        default:
          return 'Format invalide';

      }
    }
    return '';
  }

  ngOnInit(): void {
    let idEvent = this.rout.snapshot.params['id'];
    this.id = idEvent;
    this.services.findParticulierById(idEvent).subscribe({
      next: (result) => {
        let event = result;
        console.log(event);
        this.particulierForm.patchValue({
          nom: event.nom,
          prenom: event.prenom,
          email: event.email,
          pwd: event.pwd,
          telephone: event.telephone,
          adresse: event.adresse,
        });
      },
      error: (err) => {
        console.error('Erreur lors du chargement du particulier:', err);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Impossible de charger les informations du particulier'
        });
      }
    });
  }

  updateParticulier() {
    if (this.particulierForm.invalid) {
      let errorMessages: string[] = [];
      Object.keys(this.particulierForm.controls).forEach(key => {
        const control = this.particulierForm.get(key);
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
    
    let data = this.particulierForm.value;
    let particulier = new Particulier(
      this.id,
      data.nom,
      data.prenom,
      data.email,
      data.pwd,
      data.telephone,
      data.adresse
    );
    

    this.services.updateParticulier(this.id, particulier).subscribe({
      next: (res) => {
        console.log(res);
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Administrateur modifié avec succès !',
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          this.router.navigate(['/ListeAdmin']).then(() => {
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
