import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Users } from '../../models/users.model';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {
  form: FormGroup;
  listUsers!: Users[];
  page_size: number = 2;
  page_number: number = 1;
  pageSizeOptions = [5, 10, 15, 20];
  constructor(private fb: FormBuilder, private userService: UsersService, private router: Router) {
    this.form = this.fb.group({
      search: ["", [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  handlePage(e: PageEvent): void {
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex + 1;
  }

  async Logout() {
    const result = await this.userService.removeToken();
    return result;
  }

  getAllUsers() {
    this.userService.getUser().then((data: any) => {
      this.listUsers = data;
      console.log(data);
    });
  }

  async deleteUsers(id: number) {
    const trash = await this.userService.DeleteUsersById(id);
    this.getAllUsers();
    return trash;
  }

  Search() {

  }

  UrlAdd() {
    this.router.navigate(['/users/save']);
  }

  UrlEdit(id: number) {
    this.router.navigate(['/users/edit/' + id]);
  }

  UrlDetails(id: number) {
    this.router.navigate(['/users/details/' + id]);
  }

  UrlProducts() {
    this.router.navigate(['/products']);
  }

}
