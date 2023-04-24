import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { UserLoginModel } from 'src/app/services/utils.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  resetModel: UserLoginModel = {email: "", password: ""};
  resetForm: FormGroup;

  invalidEmail: boolean = false;

  constructor(private loginService: LoginService) { 
    this.resetForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  onResetSubmit() {
    this.resetModel.email = this.resetForm.value.email;
    this.resetModel.password = this.resetForm.value.password;
    this.loginService.resetPassword(this.resetModel).subscribe((data: any) => {
      console.log(data);
      if (data.result !== "Failure") {
        alert("Password Reset Successfull");
      }
      else {
        alert("Invalid Credentials");
      }
    }, (error) => {
      this.invalidEmail = true;
      console.log(error);
    }
    );
  }

  getError(el:any) {
    switch (el) {
      case 'email':
        if (this.resetForm.get('email').hasError('required')) {
          return 'Email required';
        }
        break;
      case 'password':
        if (this.resetForm.get('password').hasError('required')) {
          return 'Password required';
        }
        break;
      default:
        return '';
    }
    return '';
  }
  
}
