import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }



  /////////// Create Contact Us \\\\\\\\\\\\

  createContactUs(body: any) {

    // 1- Show Spinner
     // this.spinner.show();
    // 2- http.Post(url)
    this.http.post("https://localhost:44366/api/ContactUs", body).subscribe((result)=>{
    
     // this.spinner.hide();

     this.toastr.success('Your Message Send Successfully');


    // 5- teturn Toastr

    }, err => {
      this.toastr.error(err.message, err.status)
    })

  }


   ////////////// Delete Testimonial \\\\\\\\\\\\\\\

   deletecontactUs(id: number) {

    this.http.delete("https://localhost:44366/api/ContactUs/delete/"+id).subscribe((resp) => {

      this.toastr.success('Contact Us Message Deleted Successfully');

    }, err => {

      this.toastr.error(err.message, err.status)

    });
  }

  loadedContactUs: any = [{}];

  ///////////// Get Testimonial \\\\\\\\\\\\

  GetContactUs() {
    this.http.get("https://localhost:44366/api/ContactUs").subscribe((result) => {
          this.loadedContactUs = result;
        },
        err => {
          this.toastr.error(err.message);
        })
  }

  








  
}
