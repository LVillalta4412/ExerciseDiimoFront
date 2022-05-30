import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../../services/products.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Products } from '../../../models/products.model';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  form!: FormGroup;
  id: number | undefined;
  products?: Products[];
  constructor(private userService: UsersService, private fb: FormBuilder, private activeRoute: ActivatedRoute, private productsService: ProductsService, private router: Router) {
    this.form = this.fb.group({
      sku: [""],
      name: ["", [Validators.required]],
      quantity: ["", [Validators.required]],
      price: ["", [Validators.required]],
      description: [""]
    });
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((data: Params) => {
      this.id = data['id'];
    });
    this.getProducts()
  }

  async Logout() {
    const result = await this.userService.removeToken();
    return result;
  }

  getProducts() {
    this.productsService.getProductsById(Number(this.id)).then((data: any) => {
      this.products = data;
      console.log(data);
      return this.products;
    });
  }

  async updateProducts() {
    if (this.form.valid) {
      const result = await this.productsService.UpdateProducts(Number(this.id), this.form.value);
      return result;
    } else {
      this.form.markAllAsTouched()
    }
  }

  Goback() {
    this.router.navigate(['/products']);
  }

}
