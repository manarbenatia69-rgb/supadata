import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Particulier } from '../Entities/Particulier.Entities';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-list-particulier',
  templateUrl: './list-particulier.component.html',
  styleUrls: ['./list-particulier.component.css']
})
export class ListParticulierComponent {
listeParticulier: Particulier[] = [];
  
  constructor(private service: CrudService, private router: Router) {}
 ngOnInit(): void {
   
    this.chargerParticuliers();
  }
  chargerParticuliers() {
    this.service.getParticulier().subscribe({
      next: (particuliers) => {
        this.listeParticulier = particuliers;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des particuliers:', err);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Impossible de charger la liste des particuliers. Veuillez réessayer plus tard.'
        });
      }
    });
  }

  DeleteParticulier(particulier: Particulier) {
    
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: `Voulez-vous vraiment supprimer le particulier "${particulier.nom} ${particulier.prenom}" ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.onDeleteParticulier(particulier.id).subscribe({
          next: () => {
            this.listeParticulier = this.listeParticulier.filter(p => p.id !== particulier.id);
            Swal.fire({
              icon: 'success',
              title: 'Supprimé !',
              text: `Le particulier "${particulier.nom} ${particulier.prenom}" a été supprimé avec succès.`,
              timer: 2000,
              showConfirmButton: false
            });
          },
          error: (err) => {
            console.error('Erreur lors de la suppression:', err);
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: `Une erreur est survenue lors de la suppression du particulier "${particulier.nom} ${particulier.prenom}".`
            });
          }
        });
      }
    });
  }
}
