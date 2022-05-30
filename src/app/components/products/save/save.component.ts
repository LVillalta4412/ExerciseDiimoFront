import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductsService } from '../../../services/products.service';
import { Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';


@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.scss']
})
export class SaveComponent implements OnInit {
  form!: FormGroup;

  constructor(private userService: UsersService, private fb: FormBuilder, private productsService: ProductsService, private router: Router) {

    this.form = this.fb.group({
      sku: [""],
      name: ["", [Validators.required]],
      quantity: ["", [Validators.required]],
      price: ["", [Validators.required]],
      description: [""]
    });
  }

  ngOnInit(): void {
  }

  async registerProducts() {
    if (this.form.valid) {
      const result = await this.productsService.SaveProducts(this.form.value);
      return result;

    } else {
      this.form.markAllAsTouched()
    }
  }



  async Logout() {
    const result = await this.userService.removeToken();
    return result;
  }

  Goback() {
    this.router.navigate(['/products']);
  }


}
