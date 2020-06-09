import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { UserForLogin } from '../models/userForLogin';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:8080';

  login(user: UserForLogin) {
    return this.http.post(this.baseUrl + '/login', user).pipe(
      map((response: any) => {
        const userFromResponse = response;

        localStorage.setItem('auth', 'yes');
        localStorage.setItem('userEmail', user.email);
        if (userFromResponse) {
          localStorage.setItem('token', userFromResponse.token);
          this.decodedToken = this.jwtHelper.decodeToken(userFromResponse.token);
        }
      })
    );
  }

  register(user: User) {
    return this.http.post(this.baseUrl + '/register', user);
  }

  loggedIn() {
    // const token = localStorage.getItem('token');
    // return !this.jwtHelper.isTokenExpired(token);

    return localStorage.getItem('auth') == 'yes';
  }

  getToken(){
    return localStorage.getItem('token');
  }
}
