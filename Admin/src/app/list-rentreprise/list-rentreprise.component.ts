import { Component } from '@angular/core';
import { REntreprise } from '../Entities/REntreprise.Entities';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-list-rentreprise',
  templateUrl: './list-rentreprise.component.html',
  styleUrls: ['./list-rentreprise.component.css']
})

export class ListRentrepriseComponent {
listeREntreprise: REntreprise[] = [];
filteredREntreprise: REntreprise[] = [];
searchTerm: string = '';
  
  constructor(private service: CrudService, private router: Router) {}
ngOnInit(): void {
   
    this.chargerREntreprises();
  }
  chargerREntreprises() {
    this.service.getRentreprise().subscribe({
      next: (rentreprises) => {
        this.listeREntreprise = rentreprises;
        this.filteredREntreprise = rentreprises;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des entreprises:', err);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Impossible de charger la liste des employeurs'
        });
      }
    });
  }

  DeleteREntreprise(rentreprise: REntreprise) {
    
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: `Voulez-vous vraiment supprimer l'entreprise "${rentreprise.nom}" ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.onDeleteRentreprise(rentreprise.id).subscribe({
          next: () => {
            this.listeREntreprise = this.listeREntreprise.filter(e => e.id !== rentreprise.id);
            Swal.fire({
              icon: 'success',
              title: 'Supprimé !',
              text: 'L\'entreprise a été supprimée avec succès.',
              timer: 2000,
              showConfirmButton: false
            });
          },
          error: (err) => {
            console.error('Erreur lors de la suppression:', err);
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: 'Une erreur est survenue lors de la suppression de l\'employeur.'
            });
          }
        });
      }
    });
  }
  filterEntreprise() {
  this.filteredREntreprise = this.listeREntreprise.filter(ent =>
    ent.nom?.trim().toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    ent.companyname?.trim().toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    ent.email?.trim().toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    ent.jobtitle?.trim().toLowerCase().includes(this.searchTerm.toLowerCase())
  );
}

updateREntrepriseEtat(REntreprise: REntreprise): void {
    const newEtat = !REntreprise.etat;
    const message = newEtat ? 'activer' : 'désactiver';

    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: `Voulez-vous vraiment ${message} l'entreprise "${REntreprise.nom}" ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: newEtat ? '#28a745' : '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: `Oui, ${message}`,
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        REntreprise.etat = newEtat;
        this.service.updateREtatRentreprise(REntreprise.id, REntreprise).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Succès !',
              text: `L'entreprise a été ${message} avec succès.`,
              timer: 2000,
              showConfirmButton: false
            });
          },
          error: (err) => {
            console.error('Erreur lors de la mise à jour:', err);
            REntreprise.etat = !newEtat; // Revert the change
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: `Une erreur est survenue lors de la mise à jour du statut du entreprise "${REntreprise.nom} ".`
            });
          }
        });
      }
    });
  }
}

