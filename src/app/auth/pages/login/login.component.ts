import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'login-page',
  imports: [RouterLink],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  fb = inject(FormBuilder);

  loginForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  login() {
    console.log(this.loginForm.value);
  }
}
