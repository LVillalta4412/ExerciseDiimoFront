import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.scss']
})
export class SaveComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder, private userService: UsersService, private router: Router) {
    this.form = this.fb.group({
      name: ["", [Validators.required]],
      username: ["", [Validators.required]],
      email: ["", [Validators.required]],
      password: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      date_of_birth: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  async registerUsers() {
    if (this.form.valid) {
      const result = await this.userService.SaveUsers(this.form.value);
      return result;
    } else {
      this.form.markAllAsTouched()
    }
  }

  Goback() {
    this.router.navigate(['/users']);
  }

}
