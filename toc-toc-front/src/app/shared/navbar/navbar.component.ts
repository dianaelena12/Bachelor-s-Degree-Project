import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
    public isCollapsed = true;
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];
    private userEmail: string;

    constructor(public location: Location, private router: Router, private authService: AuthService) {
    }
    ngOnDestroy(): void {
    }

    ngOnInit() {
      this.router.events.subscribe((event) => {
        this.isCollapsed = true;
        if (event instanceof NavigationStart) {
           if (event.url != this.lastPoppedUrl)
               this.yScrollStack.push(window.scrollY);
       } else if (event instanceof NavigationEnd) {
           if (event.url == this.lastPoppedUrl) {
               this.lastPoppedUrl = undefined;
               window.scrollTo(0, this.yScrollStack.pop());
           } else
               window.scrollTo(0, 0);
       }
     });
     this.location.subscribe((ev:PopStateEvent) => {
         this.lastPoppedUrl = ev.url;
     });

     this.userEmail = localStorage.getItem('userEmail');
    }

    isHome() {
        var titlee = this.location.prepareExternalUrl(this.location.path());

        if( titlee === '#/home' ) {
            return true;
        }
        else {
            return false;
        }
    }

    loggedIn() {
        return this.authService.loggedIn();
      }

    logout(){
        localStorage.setItem('auth', 'no');
        localStorage.setItem('userEmail', '');
        this.router.navigate(['/home']);
    }

    toRandom(){
        localStorage.setItem('random', '0');
    }

}
