import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isToggled= false;
  sidebarHovered= false;
  isProfileOpen = false;
  isNotificationsOpen = false;
  globalSearch: string = '';
  searchKeyword: string = '';
  isLightTheme = false;

userDetails:any;
constructor(
  private service: CrudService,
  private router:Router,
  private renderer: Renderer2
) { 
   this.userDetails = this.service.userDetails();
  }
  ngOnInit(): void {
console.log(this.userDetails);
this.service.user$.subscribe(user => {
      this.userDetails = user; } );
      try {
        const saved = localStorage.getItem('site-theme');
        this.isLightTheme = (saved === 'light');
        if (this.isLightTheme) {
          this.renderer.addClass(document.body, 'light-theme');
        } else {
          this.renderer.removeClass(document.body, 'light-theme');
        }
      } catch (e) { /* ignore */ }
  } 
 search() {
  console.log(this.searchKeyword);

  this.router.navigate(['/search'], {
    queryParams: { keyword: this.searchKeyword }
  });
}

  

  logout() {
    
    localStorage.clear();
    sessionStorage.clear();
    
    
    this.router.navigate(['/']).then(() => {
      
      window.location.reload();
      
      
      setTimeout(() => {
        alert('Vous avez été déconnecté avec succès');
      }, 100);
    });
  }
toggleSidebar() {
    this.isToggled = !this.isToggled;
  }

  toggleMobileSidebar() {
    this.isToggled = !this.isToggled;
  }

  onSidebarHover() {
    if (this.isToggled) {
      this.sidebarHovered = true;
    }
  }

  onSidebarLeave() {
    if (this.isToggled) {
      this.sidebarHovered = false;
    }
  }

  toggleProfile(event: Event) {
      event.preventDefault();
      this.isProfileOpen = !this.isProfileOpen;
    }

  toggleNotifications(event: Event) {
      event.preventDefault();
      this.isNotificationsOpen = !this.isNotificationsOpen;
    }

  toggleTheme(): void {
    this.isLightTheme = !this.isLightTheme;
    if (this.isLightTheme) {
      this.renderer.addClass(document.body, 'light-theme');
      localStorage.setItem('site-theme', 'light');
    } else {
      this.renderer.removeClass(document.body, 'light-theme');
      localStorage.setItem('site-theme', 'dark');
    }
  }
}