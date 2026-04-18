import { Component } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Employer } from '../Entities/Employer.Entities';


@Component({
  selector: 'app-list-employer',
  templateUrl: './list-employer.component.html',
  styleUrls: ['./list-employer.component.css']
})
export class ListEmployerComponent {
listeEmployer: Employer[] = [];
filteredEmployer: Employer[] = [];
searchTerm: string = '';
  
  constructor(private service: CrudService, private router: Router) {}
ngOnInit(): void {
   
    this.chargerEmployers();
  }
  chargerEmployers() {
    this.service.getEmployer().subscribe({
      next: (employers) => {
        this.listeEmployer = employers;
        this.filteredEmployer = employers;
      },
      
      error: (err) => {
        console.error('Erreur lors du chargement des employeurs:', err);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Impossible de charger la liste des employeurs'
        });
      }
    });
  }

  DeleteEmployer(employer: Employer) {
    
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: `Voulez-vous vraiment supprimer l'employeur "${employer.nom} ${employer.prenom}" ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.onDeleteEmployer(employer.id).subscribe({
          next: () => {
            this.listeEmployer = this.listeEmployer.filter(e => e.id !== employer.id);
            Swal.fire({
              icon: 'success',
              title: 'Supprimé !',
              text: 'L\'employeur a été supprimé avec succès.',
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
  filterEmployer() {
    console.log("searchTerm =", this.searchTerm);
  this.filteredEmployer = this.listeEmployer.filter(employer =>
    employer.nom?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    employer.prenom?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    employer.email?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    employer.companyname?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    employer.jobtitle?.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
}
}


