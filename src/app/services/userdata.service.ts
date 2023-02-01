import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Toast, ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  constructor(private http: HttpClient, public auth: AuthService, private toastr:ToastrService, private spinner:NgxSpinnerService) { }

  
  users:any=[{}]

  Admin:any=[{}]

  recentUsers:any=[{}]

  getAllUsers(){
    this.http.get('https://localhost:44366/api/UserData').subscribe(
      (result)=>{
      this.users = result;
      //this.toastr.success('Users Retrived.');
      },
      err => {
        this.toastr.error(err.message)
      })
    
  }

  getRecentUsers(){
    this.http.get('https://localhost:44366/api/UserData/GetRecent').subscribe(
      (result)=>{
      this.recentUsers = result;
      //this.toastr.success('Users Retrived.');
      },
      err => {
        this.toastr.error(err.message)
      })
    
  }

  GetUserDataById(id: number): any{
    this.http.get("https://localhost:44366/api/UserData/GetUserDataById/"+id).subscribe(
      (result)=>{
        return result
      },
      err => {
        this.toastr.error(err.message);
      })
    
  }


  GetUserDataByIdnew(id: number): any{
    this.http.get("https://localhost:44366/api/UserData/GetUserDataById/"+id).subscribe(
      (result)=>{
        this.Admin = result;
      },
      err => {
        this.toastr.error(err.message);
      })
    
  }

  UpdateUser(body: any) {
    this.http.put('https://localhost:44366/api/UserData', body).subscribe((res) => {
      this.toastr.success("User Updated Successfully!");
      }, 
      err => {
        this.toastr.error(err.message);
      })

  }


  ////////////// Delete Testimonial \\\\\\\\\\\\\\\

  deleteUser(id: number) {

    this.http.delete("https://localhost:44366/api/UserData/delete/"+id).subscribe((resp) => {

      this.toastr.success('User Deleted Successfully');

    }, err => {

      this.toastr.error(err.message, err.status)

    });
  }

   AddEmailToNewsletter(sendEmail: any){
    if(sendEmail != null){

    let body = {
      Email:sendEmail
    }
    this.spinner.show();
    this.http.post("https://localhost:44366/api/UserData/AddEmail/",body).subscribe(
      (result)=>{
        this.spinner.hide();
        if(result == true){
          this.toastr.success("Email Subscribed To Newsletter. 20% Discount Code Has Been Sent!");
        }
        else{
          this.toastr.warning("Email Already Subscribed To Newsletter!");
        }
      },
      err => {
        this.toastr.error(err.message);
      })
    
  }
  else
  this.toastr.info("Enter a Valid Email Address To Subscribe.");
}

}