import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  addressModel: AddressModel = { addressId:0, street: "", city: "", state: "", pincode: 0 };

  addressDetails: AddressModel[] = [];

  userId: String = "";

  addressForm: FormGroup;

  step = 0;



  constructor(private loginService: LoginService, private router: Router) {

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

    this.loginService.getAddress(this.userId).subscribe(
      (data: any) => {
        console.log(data);
        this.addressDetails = data;
      }, (error: any) => {
        console.log(error);
      }
    )
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


  addAddress() {
    this.router.navigate(['/addAddress']);
  }

  editAddress(addressId: number) {
    this.router.navigate(['/editAddress/'+ addressId.toString()]);

  }

  deleteAddress(addressId: number) {
    console.log(addressId);
    console.log(this.userId);
    this.loginService.deleteAddress(this.userId, addressId.toString()).subscribe(
      (data: any) => {
        console.log(data);
        this.ngOnInit();
      }
    );
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
