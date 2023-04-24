import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel, subcategory } from 'src/app/services/utils.service';
import { Category } from 'src/app/services/utils.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})




export class AddProductComponent {

  productModel: ProductModel = {id:0,name:"",description:"",price:0,category:"", subcategory:[], image: ""};
  productForm: FormGroup;

  productId: number = 0;
  imageData= new FormData();

  isSubmitted = false;


  Category: Category[] = [
    {value: 'electronics', viewValue: 'Electronics'},
    {value: 'clothing', viewValue: 'Clothing'},
    {value: 'footwear', viewValue: 'Footwear'},
    {value: 'beautyProducts', viewValue: 'Beauty Products'},
  ];


  subcategoryList: subcategory[] = [
    {value: 'black', viewValue: 'Black'},
    {value: 'white', viewValue: 'White'},
    {value: 'shirtsT-Shirts', viewValue: 'Shirts & T-Shirts'},
    {value: 'jeans', viewValue: 'Jeans'},
    {value: 'homeAppliances', viewValue: 'Home Appliances'},
    {value: 'faceProducts', viewValue: 'Face Products'},
  ];



  
  constructor(private productService: ProductService, private router: Router, private activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer) {
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      subcategory: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),

    });

   };

   ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.params['productId'];
    console.log(this.productId);
    
    this.productService.getProductById(this.productId).subscribe(
      (data: any) => {
        console.log(data);

        let objectURL = 'data:image/png;base64,' + data.image;
        data.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);

        this.productModel = data;
        this.productForm = new FormGroup({
          name: new FormControl(data.name, [Validators.required]),
          description: new FormControl(data.description, [Validators.required]),
          price: new FormControl(data.price, [Validators.required]),
          category: new FormControl(data.category, [Validators.required]),
          subcategory: new FormControl(data.subcategory, [Validators.required]),
          image: new FormControl(data.image, [Validators.required]),
    
        });
      }, (error: any) => {
        console.log(error);
      }
    );
   }


  // get category() {
  //   return this.productForm.get('category');
  // }

  // changeCategory(e: any) {
  //   console.log(e.value);
  // }

  
  
  fileChanged(event: any) {
    console.log(event.target.files[0]);
    console.log(event.target.files.item(0));
    console.log(event.target.files.item(0).name);
    console.log(event.target.files[0]);

    this.imageData.set("image", event.target.files.item(0), event.target.files.item(0).name);
    console.log(this.imageData);
    console.log(this.imageData.getAll("image"));
    
  }

  
  addProduct(){
    this.productModel.name = this.productForm.value.name;
    this.productModel.description = this.productForm.value.description;
    this.productModel.price = this.productForm.value.price;
    this.productModel.category = this.productForm.value.category;
    this.productModel.subcategory = this.productForm.value.subcategory;
    this.productModel.image = "null";

    console.log(this.productModel);
    this.productService.add(this.productModel).subscribe(
      (data: any) => {
      console.log(data);
      this.productService.addImage(this.imageData, data.id).subscribe(
        (data: any) => {
        console.log(data);
        alert("Product Added Successfully");
        });
      
      // this.router.navigate(['/home']);
      },
      (error: any) => {
        console.log(error);
      }
    )
    console.log(this.productForm.value);
  }
}

