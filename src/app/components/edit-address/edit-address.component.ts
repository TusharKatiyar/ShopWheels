import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { AddressModel, UserModel } from 'src/app/services/utils.service';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css']
})
export class EditAddressComponent {

  addressForm: FormGroup;
  userId: String = "";
  addressId: String = "";

  userModel: UserModel = { name: "", email: "", password: "", phone: 0 };
  addressModel: AddressModel = { addressId:0, street: "", city: "", state: "", pincode: 0 };

  constructor(private loginService: LoginService, private activatedRoute: ActivatedRoute, private route: Router) {
    this.addressForm = new FormGroup({
      phone: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      pincode: new FormControl('', [Validators.required])
    });
   }

  ngOnInit(): void {
    this.addressId = this.activatedRoute.snapshot.params['addressId'];

    if (localStorage.getItem('token') !== null) {
      this.userId = JSON.parse(localStorage.getItem('token')!).id;
    }
    this.getProfile();
  }


  editAddress() {
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
    //     console.log(data)

    //   }, (error: any) => {
    //     console.log(error);
    //   });
    
      this.loginService.updateAddress(this.addressId, this.addressModel).subscribe(
        (data: any) => {
          console.log(data);
          this.route.navigate(['/dashboard']);
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

        this.addressModel = data.address.find((address: any) => address.addressId == this.addressId);
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
    )
  }
}
