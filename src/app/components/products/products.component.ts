import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { Products } from '../../models/products.model';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  form: FormGroup;
  page_size: number = 2;
  page_number: number = 1;
  pageSizeOptions = [5, 10, 15, 20];
  listProducts!: Products[];
  selected: FormControl = new FormControl(null);
  constructor(private userService: UsersService, private fb: FormBuilder, private productsService: ProductsService, private router: Router) {
    this.form = this.fb.group({
      search: ["", [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getAllProducts();
    this.selected.valueChanges.subscribe((changes: any) => {
      this.Search(changes);
    });
  }

  async Logout() {
    const result = await this.userService.removeToken();
    return result;
  }

  handlePage(e: PageEvent): void {
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex + 1;
  }

  getAllProducts() {
    this.productsService.getProducts().then((data: any) => {
      this.listProducts = data;
    });
  }

  async deleteProducts(id: number) {
    const trash = await this.productsService.DeleteProductsById(id);
    this.getAllProducts();
    return trash;
  }

  public inputValidator(event: any) {
    //console.log(event.target.value);
    const pattern = /^[a-zA-Z0-9]*$/;
    //let inputChar = String.fromCharCode(event.charCode)
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^a-zA-Z0-9]/g, "");
      // invalid character, prevent input

    }
  }

  Search(event: any) {
    if (event.target.value.length >= 1) {
      this.productsService.getProductsFilter(event.target.value).then((data: any) => {
        this.listProducts = data;
      });
    } else {
      this.getAllProducts();
    }
  }

  UrlAdd() {
    this.router.navigate(['/products/save']);
  }

  UrlEdit(id: number) {
    this.router.navigate(['/products/edit/' + id]);
  }

  UrlDetails(id: number) {
    this.router.navigate(['/products/details/' + id]);
  }

  UrlUsers() {
    this.router.navigate(['/users']);


  }
}
