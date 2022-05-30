import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Users } from '../models/users.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
// CommonJS
const Swal = require('sweetalert2');

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly apiURL: string = environment.apiURL;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private router: Router) { }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('jwt_token') || undefined;
    return !this.jwtHelper.isTokenExpired(token);

  }

  // Autenticar usuario
  async AuthUsers(users: Users[]) {
    console.log(users);
    try {
      const data = await this.http.post<Users>(`${this.apiURL}/login`, users).toPromise();
      this.saveTokenStorage(data);
      Swal.fire(
        'Good job!',
        'Login successfully',
        'success'
      )
      return true;
    } catch (err: any) {
      if (err.status === 400) {
        Swal.fire(
          'Status' + ' ' + String(err.status),
          err.error,
          'error'
        )
        //console.log(err.error.replace(/[^a-zA-Z :.]/g, ""));
      }
    }
  }

  private saveTokenStorage(data?: Users) {
    localStorage.setItem('jwt_token', data?.token);
  }

  async removeToken() {
    localStorage.removeItem('jwt_token');
    return await this.router.navigate(['auth'], { replaceUrl: true });
  }


  // Cerrar sesión de usuario autenticado
  async LogoutUsers() {
    try {
      return await this.http
        .post<Users>(`${this.apiURL}/logout`, JSON.stringify(localStorage.getItem('jwt_token')))
        .toPromise();
    } catch (err) {
      console.log(err);
    }
  }

  // Recuperar password
  async RecoveryPassword(data: Users, token: string) {
    try {
      const result = await this.http
        .post<Users>(`${this.apiURL}/update_password/` + token, data)
        .toPromise();
      Swal.fire(
        'Good job!',
        'the password has been updated successfully',
        'success'
      )
      console.log(result);
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  // Recuperar password
  async SendEmail(data: Users) {
    try {
      const result = await this.http
        .post<Users>(`${this.apiURL}/recover_password`, data)
        .toPromise();
      Swal.fire(
        'Good job!',
        'the email has been send successfully',
        'success'
      )

      return result;
    } catch (err) {
      console.log(err);
    }
  }

  // Verifica el tiempo para eliminar token del enlace de recuperacion
  async TimeRecoveryPassword(data: any, token: string) {
    try {
      return await this.http
        .post<Users>(`${this.apiURL}/time_recover_password/` + token, data)
        .toPromise();
    } catch (err) {
      console.log(err);
    }
  }

  // Almacenar usuarios
  async SaveUsers(data: Users) {
    try {
      const result = await this.http
        .post<Users>(`${this.apiURL}/register`, data)
        .toPromise();

      Swal.fire(
        'Good job!',
        'the record has been stored successfully',
        'success'
      )
      return result;
    } catch (err: any) {
      if (err.status === 400) {
        Swal.fire(
          'Status' + ' ' + String(err.status),
          err.error.replace(/[^a-zA-Z :.]/g, ""),
          'error'
        )
        //console.log(err.error.replace(/[^a-zA-Z :.]/g, ""));
      }

    }
  }

  // Obtener usuarios
  async getUser() {
    try {
      return await this.http.get(`${this.apiURL}/user`).toPromise();
    } catch (err) {
      console.log(err);
    }
  }
  // Obtener usuarios Por Id
  async getUserById(id: any) {
    try {
      return await this.http
        .get(`${this.apiURL}/user/${id}`)
        .toPromise();
    } catch (err) {
      console.log(err);
    }
  }

  // Obtener token
  async getToken(token: any) {
    try {
      return await this.http
        .get(`${this.apiURL}/searchtoken/${token}`)
        .toPromise();
    } catch (err) {
      console.log(err);
    }
  }
  // Actualizar usuarios
  async UpdateUsers(id: number, data: Users) {
    try {
      const update = await this.http
        .put<Users>(`${this.apiURL}/user/${id}`, data)
        .toPromise();
      Swal.fire(
        'Good job!',
        'the record has been updated successfully',
        'success'
      )
      return update;
    } catch (err: any) {
      if (err.status === 400) {
        Swal.fire(
          'Status' + ' ' + String(err.status),
          err.error.replace(/[^a-zA-Z :.]/g, ""),
          'error'
        )
        //console.log(err.error.replace(/[^a-zA-Z :.]/g, ""));
      }
    }
  }
  // Eliminar usuarios Por Id
  async DeleteUsersById(id: any) {
    try {
      const result = await this.http.delete(`${this.apiURL}/user/${id}`).toPromise();
      Swal.fire(
        'Good job!',
        'the record has been deleted successfully',
        'success'
      )
      return result;
    } catch (err) {
      console.log(err);
    }
  }

}
