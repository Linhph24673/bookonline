import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/component/types/user';
import { UserService } from 'src/app/component/service/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  userForm = this.formBuilder.group({
    name: '',
    email: '',
    password: '',
    role: "2"
  })

  singup() {
    if(this.userForm.valid) {
      const user: IUser = {
        name: this.userForm.value.name || '',
        email: this.userForm.value.email || '',
        password: this.userForm.value.password || '',
        role: this.userForm.value.role || '2'
      }
      this.userService.signUp(user).subscribe((data) => {
        this.router.navigate([''])
        console.log(user);
      })
    }
  }
}
