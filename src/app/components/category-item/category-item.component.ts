import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { ProductModel } from 'src/app/services/utils.service';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.css']
})
export class CategoryItemComponent {
  
    categoryDetails: ProductModel[]= [];
    category: string = "";

    constructor(private activatedRoute: ActivatedRoute, private productService: ProductService, private router: Router, private sanitizer: DomSanitizer) { }
  

    viewDetails(id: number){
      this.router.navigate(['/productViewDetails/'+id]);
    }
  

    ngOnInit(): void {
      this.category = this.activatedRoute.snapshot.params['category'];
      console.log(this.category);
      this.productService.getProductsByCategory(this.category).subscribe(
        (data: any) => {
          console.log(data);
          for(let i=0; i<data.length; i++){
            let objectURL = 'data:image/png;base64,' + data[i].image;
            data[i].image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          }
          // let objectURL = 'data:image/png;base64,' + data.image;
          // data.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          this.categoryDetails = data;
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
}
