import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { RoleModel, UserLoginModel, UserTokenModel } from '../services/utils.service';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  private userSubject: BehaviorSubject<UserTokenModel | null>;
  public user: Observable<UserTokenModel | null>;

  constructor(
    private router: Router,
    private http: HttpClient,
    private loginService: LoginService
  ) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('token')!));
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  // login(username: string, password: string) {
  //   return this.http.post<any>(`localhttp://localhost:8080/users/authenticate`, { username, password })
  //     .pipe(map(user => {
  //       // store user details and jwt token in local storage to keep user logged in between page refreshes
  //       localStorage.setItem('user', JSON.stringify(user));
  //       this.userSubject.next(user);
  //       return user;
  //     }));
  // }

  login(userLoginModel: UserLoginModel) {
    this.loginService.login(userLoginModel).subscribe((data: any) => {
      console.log(data);

    let userData: any = {};      

      if (data.result !== "failure") {
        if(data.email==="admin@gmail.com"){
          userData= {
            id: data.id,
            email: data.email,
            role: RoleModel.Admin,
            token: data.id
          }
          localStorage.removeItem("token");
          localStorage.setItem("token", JSON.stringify(userData));
        }
        else{
          userData= {
            id: data.id,
            email: data.email,
            role: RoleModel.User,
            token: data.id
          }
          localStorage.removeItem("token");
          localStorage.setItem("token", JSON.stringify(userData));
        }
        this.userSubject.next(userData);
        return userData;
      }
    }
    )
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    this.userSubject.next(null);
    window.location.reload();
  }
  

  isLoggedin(){
    return !!localStorage.getItem('token');
  }
}
