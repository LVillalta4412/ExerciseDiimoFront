import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Route, Params, ActivatedRoute, Router } from '@angular/router';
import { Users } from 'src/app/models/users.model';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  form: FormGroup;
  id: number | undefined;
  user?: Users[];
  constructor(private fb: FormBuilder, private router: Router, private userService: UsersService, private activeRoute: ActivatedRoute) {
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
    this.activeRoute.params.subscribe((data: Params) => {
      this.id = data['id'];
    });
    this.getUsers()
  }

  getUsers() {
    this.userService.getUserById(Number(this.id)).then((data: any) => {
      this.user = data;
      return this.user;
    });
  }

  async updateUsers() {
    if (this.form.valid) {
      const update = await this.userService.UpdateUsers(Number(this.id), this.form.value);
      return update
    } else {
      this.form.markAllAsTouched()
    }
  }

  Goback() {
    this.router.navigate(['/users']);
  }


}
