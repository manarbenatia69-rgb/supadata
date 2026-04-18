import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Admin } from '../Entities/Admin.Entities';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-update-profil',
  templateUrl: './update-profil.component.html',
  styleUrls: ['./update-profil.component.css']
})
export class UpdateProfilComponent {
adminDetails: any;
  updateadminForm: FormGroup;
  id: number;
  currentRole: string = '';

  constructor(
    private fb: FormBuilder,
    private service: CrudService,
    private route: Router,
    private router: ActivatedRoute
  ) {
    // Initialisation du formulaire avec validation
    this.updateadminForm = this.fb.group({
      nom: ['', [
        Validators.required,
        Validators.pattern("[a-zA-Z .'-]+"),
        Validators.minLength(4),
      ]],
      prenom: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]],
      
      pwd: [''], // mot de passe non obligatoire pour modification
      role: ['', Validators.required],
    });

    // Chargement des infos actuelles de la admin connectée
    this.adminDetails = this.service.userDetails();
  }

  // Getters pratiques pour le formulaire
  get nom() { return this.updateadminForm.get('nom'); }
  get prenom() { return this.updateadminForm.get('prenom'); }
  get email() { return this.updateadminForm.get('email'); }
  get pwd() { return this.updateadminForm.get('pwd'); }
  get role() { return this.updateadminForm.get('role'); }


  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'];

    // Chargement des données actuelles de la admin depuis l'API
    this.service.findAdminById(this.id).subscribe((admin) => {
      if (admin) {
        this.adminDetails = admin; // MàJ adminDetails pour garder les anciennes valeurs si besoin
        this.currentRole = admin.role; // MàJ currentRole pour afficher dans le select

        this.updateadminForm.patchValue({
          nom: admin.nom,
          prenom: admin.prenom,
          email: admin.email,
      
          pwd: '', // laisser vide pour ne pas exposer le mot de passe
              role: admin.role,
        });
      }
    });
  }

  updateadmin(): void {
    if (this.updateadminForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Veuillez remplir correctement tous les champs.',
      });
      return;
    }

    const formData = this.updateadminForm.value;

    // Ne pas écraser le mot de passe s'il est vide dans le formulaire
    let motDePasse = formData.pwd;
    if (!motDePasse || motDePasse.trim() === '') {
      motDePasse = this.adminDetails.pwd; // garder ancien mot de passe
    }

    const admin = new Admin(
      this.id,
      formData.nom,
      formData.prenom,
      formData.email,
  
      motDePasse,
          formData.role,
    );

    this.service.updateAdmin(this.id, admin).subscribe({
      next: (res: any) => {
        console.log(res);
      // mettre à jour les données de l'utilisateur dans toute l'application
      this.service.updateUser(admin);


        // Met à jour localStorage avec le nouveau token
        localStorage.setItem("isadminIn", res.token);

        // Met à jour adminDetails avec les données renvoyées par le backend
        this.adminDetails = res.admin;

        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Votre profil a été modifié avec succès !',
        });

        this.route.navigate(['/home']);
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Échec de la mise à jour du profil.',
        });
      }
    });
  }
}
