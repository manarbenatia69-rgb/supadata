import { Component } from '@angular/core';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  u: any;
  userType: string = '';
  readonly placeholders = {
    cover: '/assets/img/placeholders/cover.svg',
    avatar: '/assets/img/slider/avatar.jpg',
    logo: '/assets/img/logo/logos.png'
  };

  constructor(private service: CrudService) {
    // Te3rf chkoun el connectée
    const emp = this.service.userDetailsEmployer();
    const ent = this.service.userDetailsEntreprise();
    const part = this.service.userDetailsParticulier();

    if (emp) { this.u = emp; this.userType = 'employer'; }
    else if (ent) { this.u = ent; this.userType = 'entreprise'; }
    else if (part) { this.u = part; this.userType = 'particulier'; }
  }

  // Styles dynamic (Primary color + Font)
  cardCssVars(u: any): Record<string, string> {
    const color = u?.primaryColor || u?.themeColor || u?.color || u?.couleur || '#5b8cff';
    const font = u?.fontFamily || u?.font || 'system-ui, sans-serif';
    return {
      '--card-primary': color.startsWith('#') ? color : '#5b8cff',
      '--card-font': font
    };
  }

  // Path mta3 el tsawer (Employer/Entreprise/Particulier)
  getUploadUrl(value: any, fallback: string): string {
    if (!value || typeof value !== 'string') return fallback;
    const filename = value.split(/[\\/]/).pop(); // Tjib el esm mta3 el fichié barka
    return `/assets/uploads/${this.userType}/${filename}`;
  }

  // Khidmet el links (http/https)
  formatUrl(value: any): string | null {
    if (!value) return null;
    let v = value.trim();
    if (!/^https?:\/\//i.test(v)) v = 'https://' + v;
    return v;
  }

  // Fix ken taswira t'atach (Fallback)
  onImgError(event: any, fallback: string): void {
    event.target.src = fallback;
  }
}