import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  error: any;
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private userService: UsersService, private router: Router) { }

  ngOnInit(): void {
  }

  async onLogin() {
    if (this.form.valid) {
      const success = await this.userService.AuthUsers(this.form.value);
      if (success) {
        this.router.navigate(['/users']);
      }
      return success;
    } else {
      this.form.markAllAsTouched();
    }
  }

  Forgot() {
    this.router.navigate(['/auth/send-mail']);
  }

  Register() {
    this.router.navigate(['/auth/register']);
  }

}
