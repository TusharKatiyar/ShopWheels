import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { AddressModel, UserModel } from 'src/app/services/utils.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent {


  loggedIn: boolean = false;

  userModel: UserModel = { name: "", email: "", password: "", phone: 0 };
  addressModel: AddressModel = { addressId:0, street: "", city: "", state: "", pincode: 0 };

  addressDetails: AddressModel[] = [];

  userId: String = "";
  addressId: String = "";

  addressForm: FormGroup;

  constructor(private loginService: LoginService, private router: Router, private activatedRoute: ActivatedRoute) {

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


    addAddress() {
    this.addressModel= { addressId:0, street: "", city: "", state: "", pincode: 0 };

    console.log(this.addressForm.value);
    console.log(this.addressModel);
    this.userModel.phone = this.addressForm.value.phone;
    this.addressModel.street = this.addressForm.value.street;
    this.addressModel.city = this.addressForm.value.city;
    this.addressModel.state = this.addressForm.value.state;
    this.addressModel.pincode = this.addressForm.value.pincode;
    console.log(this.userModel);
    console.log(this.addressModel);
    // this.loginService.updateUser(this.userId, this.userModel).subscribe(
    //   (data: any) => {
    //     console.log(data);
        
          
    //   }, 
      
      this.loginService.addAddress(this.userId, this.addressModel).subscribe(
        (data: any) => {
          console.log(data);
        }, (error: any) => {
          console.log(error);
        });
        this.router.navigate(['/dashboard']);
        
  }

  getProfile() {
    this.loginService.getUser(this.userId).subscribe(
      (data: any) => {
        console.log(data);

        this.userModel = data;
        console.log(this.userModel);
      }, (error: any) => {
        console.log(error);
      }
    );
  }
}
