import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { AddressModel, UserModel } from 'src/app/services/utils.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  loggedIn: boolean = false;

  userModel: UserModel = { name: "", email: "", password: "", phone: 0 };
  addressModel: AddressModel = { street: "", city: "", state: "", pincode: 0 };

  userId: String = "";

  addressForm: FormGroup;

  step = 0;



  constructor(private loginService: LoginService) {

    this.addressForm = new FormGroup({
      phone: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      pincode: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {

    if (localStorage.getItem('token') !== null) {
      this.loggedIn = true;
      this.userId = JSON.parse(localStorage.getItem('token')!).id;
    }
    this.getProfile();
  }
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  save() {
    this.addressModel= { street: "", city: "", state: "", pincode: 0 };

    console.log(this.addressForm.value);
    console.log(this.addressModel);
    this.userModel.phone = this.addressForm.value.phone;
    this.addressModel.street = this.addressForm.value.street;
    this.addressModel.city = this.addressForm.value.city;
    this.addressModel.state = this.addressForm.value.state;
    this.addressModel.pincode = this.addressForm.value.pincode;
    console.log(this.userModel);
    console.log(this.addressModel);
    this.loginService.updateUser(this.userId, this.userModel).subscribe(
      (data: any) => {
        console.log(data);
        this.loginService.updateAddress(this.userId, this.addressModel).subscribe(
          (data: any) => {
            console.log(data);
          }, (error: any) => {
            console.log(error);
          });

      }, (error: any) => {
        console.log(error);
      });
  }


  getProfile() {
    this.loginService.getUser(this.userId).subscribe(
      (data: any) => {
        console.log(data);

        this.userModel = data;
        console.log(this.userModel);

        this.addressModel = data.address;
        console.log(this.addressModel);

        if(this.addressModel === null){
          this.addressForm.setValue({
            phone: this.userModel.phone,
            street: null,
            city: null,
            state: null,
            pincode: null
          });
        }
        else{
          this.addressForm.setValue({
            phone: this.userModel.phone,
            street: this.addressModel.street,
            city: this.addressModel.city,
            state: this.addressModel.state,
            pincode: this.addressModel.pincode
          });
        }
      }, (error: any) => {
        console.log(error);
      }
    );
  }

  // updateProfile(){
  //   this.loginService.updateUser().subscribe(
  //     (data: any) => {
  //       console.log(data);
  //     },(error: any) => {
  //       console.log(error);
  //     }
  //   );
  // }

  // addAddresses(){
  //   this.loginService.addAddress().subscribe(
  //     (data: any) => {
  //       console.log(data);
  //     },(error: any) => {
  //       console.log(error);
  //     }
  //   );
  // }

  // getAddresses(){
  //   this.loginService.getAddress().subscribe(
  //     (data: any) => {
  //       console.log(data);
  //     },(error: any) => {
  //       console.log(error);
  //     }
  //   );
  // }
}
