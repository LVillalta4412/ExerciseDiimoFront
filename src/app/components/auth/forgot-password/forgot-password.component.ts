import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  error: any;
  token!: string;
  result_token!: any;
  form: FormGroup = new FormGroup({
    newpassword: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private userService: UsersService, private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((data: Params) => {
      this.token = data['id'];
    });

    this.Time();
    this.Token();
  }

  async ForgotPassword() {
    if (this.form.valid) {
      const result = await this.userService.RecoveryPassword(this.form.value, this.token);
      return result;

    } else {
      this.form.markAllAsTouched()
    }
  }

  async Time() {
    if (this.form.valid) {
      const result = await this.userService.TimeRecoveryPassword('', this.token);
      return result;

    } else {
      this.form.markAllAsTouched()
    }
  }

  async Token() {
    this.userService.getToken(this.token).then((data: any) => {
      this.result_token = data;
    });
  }

  Goback() {
    this.router.navigate(['/auth']);
  }
}
