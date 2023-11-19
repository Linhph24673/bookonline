import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/component/service/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  formSignin = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private auth: AuthService) {

  }
  onHandleSubmit() {
    if (this.formSignin.valid) {
      this.auth.signin(this.formSignin.value).subscribe(data => {
        localStorage.setItem('credential', JSON.stringify(data))
        const role = data?.docs?.role
        console.log(data);
        this.auth.login(role)
      })
    }
  }
  isLoading = false;
  toggleLoading() {
    this.isLoading = true
   }
}
