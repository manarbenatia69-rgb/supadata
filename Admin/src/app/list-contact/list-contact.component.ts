import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Contact } from '../Entities/Contact.Entities';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-list-contact',
  templateUrl: './list-contact.component.html',
  styleUrls: ['./list-contact.component.css']
})
export class ListContactComponent {
  listContact: Contact[] = [];
  role: string;
  
  
  constructor(private service: CrudService, private router: Router) {}

  ngOnInit(): void {
    this.role = localStorage.getItem("role") as string;
    this.chargerContacts();
  }

  chargerContacts() {
    this.service.getContact().subscribe({
      next: (Contacts) => {
        this.listContact = Contacts;
        
      },
      error: (err) => {
        console.error('Erreur lors du chargement des Contactistrateurs:', err);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Impossible de charger la liste des Contactistrateurs'
        });
      }
    });
  }
 

  DeleteContact(Contact: Contact) {
     {
      Swal.fire({
        icon: 'error',
        title: 'Action non autorisée',
        text: 'Impossible de supprimer un super Contactistrateur'
      });
      return;
    }
  

    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: `Voulez-vous vraiment supprimer "${Contact.nom} " ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.onDeleteContact(Contact.id).subscribe({
          next: () => {
            this.listContact = this.listContact.filter(a => a.id !== Contact.id);
            Swal.fire({
              icon: 'success',
              title: 'Supprimé !',
              text: 'contact a été supprimé avec succès.',
              timer: 2000,
              showConfirmButton: false
            });
          },
          error: (err) => {
            console.error('Erreur lors de la suppression:', err);
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: 'Une erreur est survenue lors de la suppression .'
            });
          }
        });
      }
    });
  }
}

