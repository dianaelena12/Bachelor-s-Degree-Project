import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service.service';
import { AlertifyService } from '../services/alertify.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    user: User = new User();
    constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router) { }

    ngOnInit() {}

    register(){
        this.authService.register(this.user).subscribe(
            () =>{
                this.alertify.success('Register successfully');
                this.router.navigate(['/login']);
                
            },
            error => {
                this.alertify.error(error);
            }
        );
    }
}
