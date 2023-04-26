import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { CartComponent } from './components/cart/cart.component';
import { AuthguardGuard } from './shared/authguard.guard';
import { CategoryItemComponent } from './components/category-item/category-item.component';
import { ProductViewDetailsComponent } from './components/product-view-details/product-view-details.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SearchComponent } from './components/search/search.component';
import { RoleModel } from './services/utils.service';
import { AddAddressComponent } from './components/add-address/add-address.component';
import { SelectAddressComponent } from './components/select-address/select-address.component';
import { EditAddressComponent } from './components/edit-address/edit-address.component';
// import { ProductResolveService } from './resolvers/product-resolve.service';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'products', component: AllProductsComponent, canActivate: [AuthguardGuard], data: {roles: [RoleModel.Admin]} },
  { path: 'addproduct', component: AddProductComponent, canActivate: [AuthguardGuard], data: {roles: [RoleModel.Admin]}},
  { path: 'addproduct/:productId', component: AddProductComponent, canActivate: [AuthguardGuard], data: {roles: [RoleModel.Admin]}},
  { path: 'allproducts', component: AllProductsComponent, canActivate: [AuthguardGuard], data: {roles: [RoleModel.Admin]} },
  { path: 'cart', component: CartComponent },
  { path: 'home/categoryItem/:category', component: CategoryItemComponent},
  {path: 'productViewDetails/:productId', component: ProductViewDetailsComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'orders', component: OrdersComponent},
  { path: 'forgotPassword', component: ForgotPasswordComponent},
  { path: 'search/:search', component: SearchComponent},
  { path: 'addAddress', component: AddAddressComponent},
  { path: 'selectAddress/:orderId', component: SelectAddressComponent},
  { path: 'editAddress/:addressId', component: EditAddressComponent},
  { path: '**', component: NotfoundComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
