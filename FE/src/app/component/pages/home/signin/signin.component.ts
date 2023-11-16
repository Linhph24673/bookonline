import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/component/types/user';
import { UserService } from 'src/app/component/service/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  user: IUser[] = [];

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.userService.getUser().subscribe((data) => {
      this.user = data;
      console.log(data);
    });
  }

  userForm = this.formBuilder.group({
    name: '',
    email: '',
    password: '',
    role: '2',
  });

  signin() {
    if (this.userForm.valid) {
      const userNew: IUser = {
        name: this.userForm.value.name || '',
        email: this.userForm.value.email || '',
        password: this.userForm.value.password || '',
        role: this.userForm.value.role || '2',
      };
      this.userService.getUserByEmail(userNew).subscribe((data) => {
        console.log(data);

        if (!data.success) {
          const message1 = document.getElementById('message');
          if (message1 != null) {
            message1.innerText = data.message;
          }
          return false;
        } else {
          if (data.data.role == '1') {
            this.router.navigate(['/admin/productList']);
          } else if (data.data.role == '2') {
            this.router.navigate(['']);
          }
          return true;
        }
      });
    }
  }
}
