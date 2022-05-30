import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss']
})
export class SendEmailComponent implements OnInit {

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
  });
  constructor(private userService: UsersService, private router: Router) { }

  ngOnInit(): void {
  }

  async ForgotPassword() {
    if (this.form.valid) {
      const result = await this.userService.SendEmail(this.form.value);
      return result;

    } else {
      this.form.markAllAsTouched()
    }
  }

  Goback() {
    this.router.navigate(['/auth']);
  }

}
