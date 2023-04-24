import { Component } from '@angular/core';
import { AbstractControl, EmailValidator, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { RoleModel, UserLoginModel, UserModel } from 'src/app/services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  random: string | null = "";
  flag1: boolean = false;
  flag2: boolean = false;


  userLoginModel: UserLoginModel = { email: "", password: "" };
  userModel: UserModel = { name: "", email: "", password: "", phone: 0 };

  loginForm: FormGroup;
  signupForm: FormGroup;

  invalidLoginEmail: boolean = false;
  invalidLoginPassword: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private loginService: LoginService) {

    this.loginForm = new FormGroup(
      {

      email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(7), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"
      )]),
      password: new FormControl('', [Validators.required])
    });
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern("^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$")]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(7), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('', [Validators.required]),
      repeatPassword: new FormControl('', [Validators.required]),
    }, 
    {
      validators: validateScore
    }
    );
  };



  onLoginSubmit() {

    this.userLoginModel.email = this.loginForm.value.email;
    this.userLoginModel.password = this.loginForm.value.password;

    this.loginService.login(this.userLoginModel).subscribe((data: any) => {

      console.log(data);
      if (data.result !== "failure") {
        // localStorage.setItem("token", data.token);
        // console.log(localStorage);
        this.invalidLoginEmail = false;
        this.invalidLoginPassword = false;

        if (data.email === "admin@gmail.com") {
          let userData: any = {
            id: data.id,
            email: data.email,
            role: RoleModel.Admin,
            token: data.id
          }
          localStorage.removeItem("token");
          localStorage.setItem("token", JSON.stringify(userData));
        }
        else {
          let userData: any = {
            id: data.id,
            email: data.email,
            role: RoleModel.User,
            token: data.id
          }
          localStorage.removeItem("token");
          localStorage.setItem("token", JSON.stringify(userData));
        }

        window.location.href = "/home";
        alert("Login Successfull");
      }
      else {
        alert("Invalid Credentials");
      }
    }, (error) => {
      console.log(error);
      console.log(error.status);
      if (error.status === 500) {
        this.invalidLoginEmail = true;
        this.invalidLoginPassword = false;
        console.log(error);
      }
      else if (error.status === 401) {
        this.invalidLoginPassword = true;
        this.invalidLoginEmail = false;
        console.log(error);
      }
      else {
        console.log(error);
        this.invalidLoginEmail = false;
        this.invalidLoginPassword = false;
      }

    }
    )

    console.log(this.loginForm.value);
  }

  onSignupSubmit() {

    this.userModel.name = this.signupForm.value.name;
    this.userModel.email = this.signupForm.value.email;
    this.userModel.password = this.signupForm.value.password;

    this.loginService.signup(this.userModel).subscribe((data: any) => {
      console.log(data);
      if (data.userId !== "Failure") {
        // localStorage.setItem("token", data.token);
        // console.log(localStorage);
        this.invalidLoginEmail = false;
        this.invalidLoginPassword = false;
        let userData: any = {
          id: data.id,
          email: data.email,
          role: RoleModel.User,
          token: data.id
        }
        localStorage.removeItem("token");
        localStorage.setItem("token", JSON.stringify(userData));
        window.location.href = "/home";
        alert("Signup Successfull");
      }
      else {
        alert("Invalid Credentials");
      }
    })

    console.log(this.signupForm.value);
  }



  ngOnInit() {
    this.random = window.history.state["checked"];
    // this.router.getCurrentNavigation()?.extras.state?.["checked"];
    // snapshot.queryParams['checked'];
    console.log(this.random);
    if (this.random == 'login') {
      this.flag1 = true;
      this.flag2 = false;
    }
    else if (this.random == 'signup') {
      this.flag2 = true;
      this.flag1 = false;
    }
    else {
      this.flag1 = false;
      this.flag2 = false;
    }
  }

  forgotPassword() {
    this.router.navigate(['/forgotPassword']);
  }

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  get email1() {
    return this.signupForm.get('email')!;
  }

  get password1() {
    return this.signupForm.get('password')!;
  }

  get repeatPassword() {
    return this.signupForm.get('repeatPassword')!;
  }

  get name() {
    return this.signupForm.get('name')!;
  }

  public validate(): void {
    if (this.loginForm.invalid) {
      for (const control of Object.keys(this.loginForm.controls)) {
        this.loginForm.controls[control].markAsTouched();
      }
      return;
    }
  }
}


export function validateScore(
  control: AbstractControl
): ValidationErrors | null {
  if (control && control.get("repeatPassword") && control.get("password")) {
    const highscore = control.get("repeatPassword").value;
    const lowscore = control.get("password").value;  
    if(control.get('repeatPassword').errors && !control.get('repeatPassword').errors['ConfirmPassword']){
      return null;
    }
    if(highscore !== lowscore){
      control.get('repeatPassword').setErrors({ ConfirmPassword: true });
      return { scoreError: true };
    }
    else{
      control.get('repeatPassword').setErrors(null);
      return null;
    }
  }
  return null;
}
