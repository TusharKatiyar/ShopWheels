import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { RoleModel } from 'src/app/services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{

  isAdmin = false;

  userId: string="";
  loggedIn = false;

  searchForm: FormGroup;
  searchString: string = "";

constructor( private router : Router, private productService: ProductService) {

  this.searchForm = new FormGroup({
    searchValue: new FormControl('')
  });


  console.log(localStorage.getItem('token'));
  if(localStorage.getItem('token') !== null){
    this.isAdmin = JSON.parse(localStorage.getItem('token')!).role===RoleModel.Admin ? true : false;
    console.log(this.isAdmin);
  
    this.loggedIn = true;
    this.userId =JSON.parse(localStorage.getItem('token')!).id;
  }
}

  login(){
    this.router.navigateByUrl('/login', { state: { checked: 'login' } });
    // this.router.navigate(['/login'], { state: { checked: 'login' } });

  }
  register(){
   this.router.navigate(['/login'], {state: { checked: 'signup' } });
  }

  logout() {
    //remove user from local storage to log user out
    localStorage.removeItem('token');
    this.loggedIn = false;
    window.location.reload();
  }

  // addproduct(){
  //   this.router.navigate(['/addproduct']);
  // }

  ngOnInit() {
    console.log(localStorage.getItem('token'));
    if(localStorage.getItem('token') !== null){
      this.loggedIn = true;
      this.userId = JSON.parse(localStorage.getItem('token')!).id;
    }
  }

  searching(){
    this.searchString = this.searchForm.value.searchValue;
    console.log(this.searchString);
    this.router.navigate(['/search/'+this.searchString]);
  }
}
