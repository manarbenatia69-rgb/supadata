import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-register-employer',
  templateUrl: './register-employer.component.html',
  styleUrls: ['./register-employer.component.css']
})
export class RegisterEmployerComponent {
  employerForm!: FormGroup;

  profilepictureFile: File | null = null;
  companylogoFile: File | null = null;
  coverphotoFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private service: CrudService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employerForm = this.fb.group({
      profilepicture: [''],     
      companylogo: [''],    
      coverphoto: [''],   
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      jobtitle: ['', Validators.required],
      departement: ['', Validators.required],
      companyname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pwd: ['', [Validators.required, Validators.minLength(3)]],
      telephone:  ['', Validators.required],
      urlcompany: [''],
      adresse:[''],
      color:  [''],
      police: [''],
      fbLink: [''],
      linkedinLink: [''],
      githubLink: ['']
    });
  }

  onFileSelected(event: any, type: string) {
    const file = event.target.files[0];
    if (!file) return;

    if (type === 'profilepicture') this.profilepictureFile = file;
    if (type === 'companylogo') this.companylogoFile = file;
    if (type === 'coverphoto') this.coverphotoFile = file;
  }

  addNewEmployer(event?: Event) {
    // Empêcher le reload de la page
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (this.employerForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Formulaire invalide',
        text: 'Veuillez remplir tous les champs obligatoires'
      });
      return;
    }

    const v = this.employerForm.value;

    const data = {
      nom: v.nom,
      prenom: v.prenom,
      email: v.email,
      pwd: v.pwd,
      companyname: v.companyname,
      jobtitle: v.jobtitle,
      departement: v.departement,
      telephone: v.telephone,
      adresse: v.adresse,
      color: v.color,
      police: v.police,
      fbLink: v.fbLink,
      linkedinLink: v.linkedinLink,
      githubLink: v.githubLink
    };

    const formData = new FormData();
    formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));

    if (this.profilepictureFile) formData.append('profilepicture', this.profilepictureFile);
    if (this.companylogoFile) formData.append('companylogo', this.companylogoFile);
    if (this.coverphotoFile) formData.append('coverphoto', this.coverphotoFile);

    this.service.addEmployer(formData).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Inscription réussie 🎉',
          text: 'Vous serez redirigé vers le login',
          timer: 2000,
          showConfirmButton: false,
          timerProgressBar: true,
          didClose: () => {
            this.router.navigate(['/login-employer']).then(()=>{window.location.reload()}); // Navigation sûre
          }
        });
      },
      error: (err) => {
        if (err.status === 409) {
          Swal.fire({
            icon: 'warning',
            title: 'Email déjà utilisé',
            text: 'Veuillez utiliser un autre email'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Erreur serveur',
            text: 'Une erreur est survenue'
          });
        }
      }
    });
  }
}