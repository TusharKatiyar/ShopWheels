import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'jquery';
import { ProductService } from 'src/app/services/product.service';
import { ProductModel } from 'src/app/services/utils.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  
  categoryDetails: ProductModel[]= [];
  searchString: string = "";


  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService, private sanitizer:DomSanitizer, private router: Router) {}

  ngOnInit(): void {
    this.searchString=this.activatedRoute.snapshot.params['search'];
    console.log(this.searchString);

    this.productService.getProductsBySearch(this.searchString).subscribe(
      (data: any) => {
        for(let i=0; i<data.length; i++){
          let objectURL = 'data:image/png;base64,' + data[i].image;
          data[i].image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        }
        this.categoryDetails = data;
        console.log(this.categoryDetails);
      
      }, (error: any) => {
        console.log(error);
      }
    );
  }

  viewDetails(id: number){
    this.router.navigate(['/productViewDetails/'+id]);
  }
}
