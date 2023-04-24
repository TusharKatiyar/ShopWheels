import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CategoryComponent } from './components/category/category.component';
import { CartComponent } from './components/cart/cart.component';
import { FooterComponent } from './components/footer/footer.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SidecartComponent } from './components/sidecart/sidecart.component';
import { SidefilterComponent } from './components/sidefilter/sidefilter.component';
import { CardsComponent } from './components/cards/cards.component';
import { LoginService } from './services/login.service';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { ProductService } from './services/product.service';
import { MatSelectModule } from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { CategoryItemComponent } from './components/category-item/category-item.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { ProductViewDetailsComponent } from './components/product-view-details/product-view-details.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OrdersComponent } from './components/orders/orders.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SearchComponent } from './components/search/search.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatToolbarModule} from '@angular/material/toolbar';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CategoryComponent,
    CartComponent,
    FooterComponent,
    CarouselComponent,
    HomeComponent,
    LoginComponent,
    SidecartComponent,
    SidefilterComponent,
    CardsComponent,
    NotfoundComponent,
    AllProductsComponent,
    AddProductComponent,
    CategoryItemComponent,
    ProductViewDetailsComponent,
    DashboardComponent,
    OrdersComponent,
    ForgotPasswordComponent,
    SearchComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    MatGridListModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatToolbarModule
  ],
  providers: [
    LoginService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
