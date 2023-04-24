import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { ProductModel } from 'src/app/services/utils.service';


@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent {

  productDetails: ProductModel[] = [];
  displayedColumns: string[] = ['Id', 'Product Name', 'Category', 'SubCategory', 'Price', 'Description', 'Edit', 'Delete'];

  dataSource=new MatTableDataSource<any>(this.productDetails);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.getProducts();
    this.dataSource.paginator = this.paginator;

  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.productDetails);
    this.dataSource.paginator = this.paginator;
}


  getProducts(){
    this.productService.getAll().subscribe(
      (data: any) => {
      console.log(data);
      this.productDetails = data;
          this.dataSource = new MatTableDataSource<any>(this.productDetails);
          this.dataSource.paginator = this.paginator;
    },(error: any) => {
      console.log(error);
    }
    );
  }

  deleteProduct(id: number){
    this.productService.delete_Product(id).subscribe(
      (data: any) => {
      console.log(data);
      this.getProducts();
    },(error: any) => {
      console.log(error);
    }
    );
  }

  editProductDetails(id:number){
    this.router.navigate(['/addproduct/'+id]);
    // this.router.navigate(['/addProduct', {productId: id}]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trimStart().toLowerCase();

    if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
    }
  }
}
