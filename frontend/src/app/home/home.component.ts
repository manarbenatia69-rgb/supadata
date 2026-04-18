import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit, OnDestroy {
 
  desktopRegisterMenuOpen = false;
  mobileRegisterMenuOpen = false;

  activeSection = 'home';
  private sectionObserver?: IntersectionObserver;
  private readonly sectionIds = ['home', 'benefits', 'BusinessesTeams', 'Solutions'] as const;

  @ViewChild('desktopRegisterMenu', { read: ElementRef }) desktopRegisterMenu?: ElementRef<HTMLElement>;
  @ViewChild('mobileRegisterMenu', { read: ElementRef }) mobileRegisterMenu?: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    // Allow DOM to render before observing.
    setTimeout(() => this.setupSectionObserver(), 0);

    const initial = window.location.hash?.replace('#', '');
    if (initial && this.sectionIds.includes(initial as (typeof this.sectionIds)[number])) {
      this.activeSection = initial;
      setTimeout(() => this.scrollTo(initial), 0);
    }
  }

  ngOnDestroy(): void {
    this.sectionObserver?.disconnect();
  }

  scrollTo(sectionId: string, event?: Event): void {
    event?.preventDefault();

    const element = document.getElementById(sectionId);
    if (!element) return;

    this.activeSection = sectionId;
    this.closeAllLoginMenus();

    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  toggleLoginMenu(which: 'desktop' | 'mobile', event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    if (which === 'desktop') {
     
      this.desktopRegisterMenuOpen = false;
      this.mobileRegisterMenuOpen = false;
      
      return;
    }

    
    this.desktopRegisterMenuOpen = false;
    this.mobileRegisterMenuOpen = false;
   
  }

  toggleRegisterMenu(which: 'desktop' | 'mobile', event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    if (which === 'desktop') {
      this.desktopRegisterMenuOpen = !this.desktopRegisterMenuOpen;
      this.mobileRegisterMenuOpen = false;
     
      if (this.desktopRegisterMenuOpen) this.focusFirstRegisterItem('desktop');
      return;
    }

    this.mobileRegisterMenuOpen = !this.mobileRegisterMenuOpen;
    this.desktopRegisterMenuOpen = false;
  
    if (this.mobileRegisterMenuOpen) this.focusFirstRegisterItem('mobile');
  }

  closeAllLoginMenus(): void {
   
    this.desktopRegisterMenuOpen = false;
    this.mobileRegisterMenuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as Node | null;
    if (!target) return;

    
    const insideDesktopRegister = this.desktopRegisterMenu?.nativeElement.contains(target) ?? false;
    const insideMobileRegister = this.mobileRegisterMenu?.nativeElement.contains(target) ?? false;

    if (!insideDesktopRegister && !insideMobileRegister) {
      this.closeAllLoginMenus();
    }
  }

  


  private focusFirstRegisterItem(which: 'desktop' | 'mobile'): void {
    const root = which === 'desktop' ? this.desktopRegisterMenu?.nativeElement : this.mobileRegisterMenu?.nativeElement;
    if (!root) return;

    setTimeout(() => {
      const firstLink = root.querySelector<HTMLElement>('.login_menu a, .login_menu button');
      firstLink?.focus();
    });
  }

  private setupSectionObserver(): void {
    this.sectionObserver?.disconnect();

    const targets = this.sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!targets.length) return;

    this.sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        const id = visible?.target?.id;
        if (!id) return;

        if (this.sectionIds.includes(id as (typeof this.sectionIds)[number])) {
          this.activeSection = id;
        }
      },
      {
        root: null,
        // Favor the section closest to the middle of the viewport.
        rootMargin: '-30% 0px -60% 0px',
        threshold: [0.15, 0.25, 0.35, 0.5, 0.65],
      }
    );

    for (const target of targets) this.sectionObserver.observe(target);
  }

}
