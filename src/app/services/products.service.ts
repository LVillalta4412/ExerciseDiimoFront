import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Products } from '../models/products.model';
// CommonJS
const Swal = require('sweetalert2');
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly apiURL: string = environment.apiURL;

  constructor(private http: HttpClient) { }

  // Almacenar usuarios
  async SaveProducts(data: Products) {
    try {
      const result = await this.http
        .post<Products>(`${this.apiURL}/products`, data)
        .toPromise();
      Swal.fire(
        'Good job!',
        'the record has been store successfully',
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
  // Obtener productos Por Id
  async getProducts() {
    try {
      return await this.http
        .get(`${this.apiURL}/products`)
        .toPromise();
    } catch (err) {
      console.log(err);
    }
  }
  // Obtener productos Por Id
  async getProductsById(id: any) {
    try {
      return await this.http
        .get(`${this.apiURL}/products/${id}`)
        .toPromise();
    } catch (err) {
      console.log(err);
    }
  }

  // Obtener productos Por Id
  async getProductsFilter(filter: any) {
    try {
      const result = await this.http
        .get(`${this.apiURL}/products/search/${filter}`)
        .toPromise();
      console.log(result);
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  // Actualizar productos
  async UpdateProducts(id: number, data: Products) {
    try {
      const result = await this.http
        .put<Products>(`${this.apiURL}/products/${id}`, data)
        .toPromise();
      Swal.fire(
        'Good job!',
        'the record has been update successfully',
        'success'
      )
      return result;
    } catch (err: any) {
      console.log(err)
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

  // Actualizar productos
  async UpdateImage(id: number, data: Products) {
    try {
      const result = await this.http
        .put<Products>(`${this.apiURL}/products/image/${id}`, data)
        .toPromise();
      Swal.fire(
        'Good job!',
        'the record has been update successfully',
        'success'
      )
      return result;
    } catch (err: any) {
      console.log(err)
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
  // Eliminar productos Por Id
  async DeleteProductsById(id: any) {
    try {
      await this.http.delete(`${this.apiURL}/products/${id}`).toPromise();
      Swal.fire(
        'Good job!',
        'the record has been store successfully',
        'success'
      )
      return true;
    } catch (err) {
      console.log(err);
    }
  }
}
