import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../service/crud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.css']
})
export class EditCardComponent implements OnInit {
  updateForm: FormGroup;
  u: any; // User details
  userType: string = '';
  id: number;

  constructor(
    private fb: FormBuilder,
    private service: CrudService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Initialisation du formulaire
    this.updateForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      jobtitle: [''],
      telephone: [''],
      adresse: [''],
      pwd: [''] // Optionnel
    });
  }

  ngOnInit(): void {
    // 1. Détecter le type d'utilisateur via les tokens
    if (localStorage.getItem('myTokenEmployer')) {
      this.userType = 'employer';
      this.u = this.service.userDetailsEmployer();
    } else if (localStorage.getItem('myTokenEntreprise')) {
      this.userType = 'entreprise';
      this.u = this.service.userDetailsEntreprise();
    } else if (localStorage.getItem('myTokenParticulier')) {
      this.userType = 'particulier';
      this.u = this.service.userDetailsParticulier();
    }

    this.id = this.u?.id;

    // 2. Charger les données fraîches depuis l'API
    if (this.id) {
      this.loadUserData();
    }
  }

  loadUserData() {
    let fetchMethod: { subscribe: (observer: (data: any) => void) => void };
    if (this.userType === 'employer') fetchMethod = this.service.findEmployerById(this.id);
    else if (this.userType === 'entreprise') fetchMethod = this.service.findRentrepriseById(this.id);
    else fetchMethod = this.service.findParticulierById(this.id);

    fetchMethod.subscribe(data => {
      this.u = data;
      this.updateForm.patchValue({
        nom: data.nom,
        prenom: data.prenom,
        email: data.email,
        jobtitle: data.jobtitle,
        telephone: data.telephone,
        adresse: data.adresse
      });
    });
  }

  updateUser(): void {
    if (this.updateForm.invalid) {
      Swal.fire('Erreur', 'Veuillez remplir les champs obligatoires', 'error');
      return;
    }

    const formData = this.updateForm.value;
    
    // Si le mot de passe est vide, on garde l'ancien
    if (!formData.pwd || formData.pwd.trim() === '') {
      delete formData.pwd; 
    }

    let updateMethod;
    if (this.userType === 'employer') {
      updateMethod = this.service.updateEmployer(this.id, formData);
    } else if (this.userType === 'entreprise') {
      updateMethod = this.service.updateRentreprise(this.id, formData);
    } else {
      updateMethod = this.service.updateParticulier(this.id, formData);
    }

    updateMethod.subscribe({
      next: (res) => {
        // MISE À JOUR CRUCIAL : On informe le BehaviorSubject
        // 'res.user' depend de ce que ton backend renvoie (l'objet modifié)
        const updatedData = res.user || { ...this.u, ...formData };
        this.service.updateUser(updatedData);

        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Les informations de votre carte ont été mises à jour.',
          timer: 2000
        });
        
        this.router.navigate(['/card']);
      },
      error: (err) => {
        console.error(err);
        Swal.fire('Erreur', 'Mise à jour échouée', 'error');
      }
    });
  }
}