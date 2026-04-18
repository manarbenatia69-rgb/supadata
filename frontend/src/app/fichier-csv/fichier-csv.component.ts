import { Component } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { CrudService } from '../service/crud.service';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Employer } from '../Entities/Employer.Entities';

@Component({
  selector: 'app-fichier-csv',
  templateUrl: './fichier-csv.component.html',
  styleUrls: ['./fichier-csv.component.css']
})
export class FichierCsvComponent {
  
  selectedFile!: File;
  previewData: any[] = [];
  progress = 0;
  message = '';
  userDetailsEntreprise: any;
  employees: any[] = []; // Liste el employees
  entrepriseId: number;
constructor(private http: HttpClient,
            private service:CrudService,
            private router: Router
          ) { 
   this.userDetailsEntreprise = this.service.userDetailsEntreprise() ?? {};
    this.entrepriseId = this.userDetailsEntreprise.id;
  }
  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.service.getEmployersByEntreprise(this.entrepriseId).subscribe(data => {
      this.employees = data;
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
            this.employees = this.employees.filter(e => e.id !== employer.id);
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

  logout(){
    console.log("logout");
    localStorage.clear()
    this.router.navigate(['/']).then(() => {
      window.location.reload()
    })
    
  }


downloadCsv() {
  this.http.get('http://localhost:8081/api/fichiercsv/download-template', {
    responseType: 'blob'
  }).subscribe(response => {
    const blob = new Blob([response], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'file.xlsx';
    a.click();

    window.URL.revokeObjectURL(url);
  });
}

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer?.files.length) {
      this.handleFile(event.dataTransfer.files[0]);
    }
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  onFileSelected(event: any) {
    this.handleFile(event.target.files[0]);
  }

  handleFile(file: File) {
    this.selectedFile = file;
    this.readExcel(file);
  }

  // 👀 Preview Excel
  readExcel(file: File) {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      this.previewData = XLSX.utils.sheet_to_json(sheet);
    };

    reader.readAsBinaryString(file);
  }
   

  // 🚀 Upload + progress
  upload() {
    if (!this.selectedFile) return;

    this.service.uploadEmployees(this.selectedFile, this.entrepriseId)
      .subscribe(event => {

        if (event.type === HttpEventType.UploadProgress && event.total) {
          this.progress = Math.round((100 * event.loaded) / event.total);
        }

        if (event.type === HttpEventType.Response) {
          this.message = '✅ Upload terminé';
           this.loadEmployees();
        }

      });
  }
onFileSelectedb(event: any) {
  const file = event.target.files[0];

  if (file) {
    console.log(file.name, file.type);
    this.selectedFile = file;
  }}


}