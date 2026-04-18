import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-global-search',
  templateUrl: './global-search.component.html',
  styleUrls: ['./global-search.component.css']
})
export class GlobalSearchComponent {
keyword: string = '';
admins: any[] = [];
employers: any[] = [];
entreprises: any[] = [];
particuliers: any[] = [];

  constructor(
  private route: ActivatedRoute,
  private service: CrudService
) {}

ngOnInit() {
  this.route.queryParams.subscribe(params => {
    this.keyword = params['keyword'];
    this.searchAll();
  });
}
searchAll() {
 

if(!this.keyword) return;

const key = this.keyword.toLowerCase();
 // admin
this.service.getAdmin().subscribe(data => {
  console.log("admins", data);
  this.admins = data.filter(a =>
    a.nom?.toLowerCase().includes(key)
  );
});

  // employer
  this.service.getEmployer().subscribe(data => {
    this.employers = data.filter(e =>
      e.nom?.toLowerCase().includes(key)
    );
  });

  // entreprise
  this.service.getRentreprise().subscribe(data => {
    this.entreprises = data.filter(e =>
      e.companyname?.toLowerCase().includes(key)
    );
  });

  // particulier
  this.service.getParticulier().subscribe(data => {
    this.particuliers = data.filter(p =>
      p.nom?.toLowerCase().includes(key)
    );
  });

}}

