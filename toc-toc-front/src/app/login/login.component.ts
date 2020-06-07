import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service.service';
import { AlertifyService } from '../services/alertify.service';
import { Router } from '@angular/router';
import { UserForLogin } from '../models/userForLogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: UserForLogin = new UserForLogin();

  constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
  }

  login(){
    this.authService.login(this.user).subscribe(
        () =>{
            this.alertify.success('Login successfully');
            this.router.navigate(['/home']);
            
        },
        error => {
            this.alertify.error('Username of password incorrect');
        }
    );
}

}
