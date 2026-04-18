import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CrudService } from '../service/crud.service';
import { Contact } from '../Entities/Contact.Entities';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
 ContactForm: FormGroup;
  messageCommande: string = '';

  constructor(
    private services: CrudService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.ContactForm = this.fb.group({
      nom: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern("^[a-zA-ZÀ-ÿ\\s'-]+$") // Only alphabetic characters
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@gmail\\.com$') // Must end with @gmail.com
      ]),
      sujet: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern("^[a-zA-ZÀ-ÿ\\s'-]+$") // Only alphabetic characters
      ]),
      msg: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern("^[a-zA-Z0-9À-ÿ\\s,'-]+$") // Message pattern
      ])
     
    });
  }

  ngOnInit(): void {
    // Initialization code if needed
  }

  // Getters for form controls
  get nom() { return this.ContactForm.get('nom'); }
  get sujet() { return this.ContactForm.get('sujet'); }
  get email() { return this.ContactForm.get('email'); }
  get msg() { return this.ContactForm.get('msg'); }
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
        case 'sujet':
            return 'Seuls les caractères alphabétiques sont autorisés';
        case 'email':
            return 'L\'email doit se terminer par @gmail.com';
        case 'msg':
            return 'Le message contient des caractères invalides';
        default:
          return 'Format invalide';
      }
    }
    return '';
  }

  addNewContact() {
    if (this.ContactForm.invalid) {
      // Show specific error messages for each invalid field
      Object.keys(this.ContactForm.controls).forEach(key => {
        const control = this.ContactForm.get(key);
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

    const data = this.ContactForm.value;
    const contact = new Contact(undefined, data.nom, data.email, data.sujet, data.msg);

    this.services.addContact(contact).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Contact ajouté avec succès !',
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          this.router.navigate(['/home']).then(() => {
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
