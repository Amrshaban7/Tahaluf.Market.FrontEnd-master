import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserdataService } from './userdata.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,private router: Router,private toastr:ToastrService, private spinner:NgxSpinnerService) { }

  currentUserData : any = {};

  Login(email: any, pass: any){
    let body = {
      email: email.toString(),
      password: pass.toString()
    }
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    }

    this.spinner.show();
    this.http.post('https://localhost:44366/api/Login', body, requestOptions).subscribe((res)=>{
      const responce = {
        token: res.toString()
      }
      localStorage.setItem('token', responce.token); // ecoded token 
      let data: any = jwt_decode(responce.token); // decoded token
      console.log(data);
      localStorage.setItem('User', JSON.stringify({...data}) );

      this.spinner.hide();

      if(data.role == 'Admin'){
        this.router.navigate(['Admin/']);
        this.toastr.info("User Signed In As Admin!");
      }
      else if(data.role == 'User'){
        this.router.navigate(['']);
        this.toastr.info("User Signed In As Customer!");
      }

    },
    err => {
      this.toastr.error("Incorrect User Info!");    
    })

  }

  
  SetUserDataById(id: any){
    this.spinner.show();
   
    this.http.get("https://localhost:44366/api/UserData/GetUserDataById/"+id).subscribe(
      (result)=>{
        this.currentUserData = result;
        this.spinner.hide();
      },
      err => {
        this.toastr.error(err.message);
      })
    
  }


  Register(body: any){

   
    this.spinner.show();
    this.http.post('https://localhost:44366/api/Login/Register/',body).subscribe(
    (res)=>{
      this.spinner.hide();
      this.toastr.success("User Created");  
    },
    err => {
      this.toastr.error(err.message);  
    })

  }


}
