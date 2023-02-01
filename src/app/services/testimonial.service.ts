import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {
  [x: string]: any;

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }




   /////////// Create Testimonial \\\\\\\\\\\\

   createTestimonial(body: any) {

    // 1- Show Spinner
     // this.spinner.show();
    // 2- http.Post(url)
    this.http.post("https://localhost:44366/api/Testimonial", body).subscribe((result)=>{
    
     // this.spinner.hide();

    // 5- teturn Toastr
      this.toastr.success('Your Testimonial Send Succesfully.');

    }, err => {
      this.toastr.error(err.message, err.status)
    })

  }

   ////////////// Delete Testimonial \\\\\\\\\\\\\\\

   deleteTestimonial(id: number) {

    this.http.delete("https://localhost:44366/api/Testimonial/delete/"+id).subscribe((resp) => {

      this.toastr.success('Testimonial Deleted Successfully');

    }, err => {

      this.toastr.error(err.message, err.status)

    });
  }

  ///////////// Edit Testimonial \\\\\\\\\\\\

  updateTestimonial(body: any) {
    this.http.put('https://localhost:44366/api/Testimonial', body).subscribe((res) => {

        this.toastr.success('Testimonial Updated Successfully');

      }, err => {
        this.toastr.error(err.status, err.message);
      })
  }


  loadedTestimonialForUser:any = [{}];
  

  ///////////// Get Testimonial \\\\\\\\\\\\

  GetTestimonialByUser() {
    this.http.get("https://localhost:44366/api/Testimonial/GettestimonialByUser").subscribe((result) => {
          this.loadedTestimonialForUser = result;
        },
        err => {
          this.toastr.error(err.message);
        })
  }

  

   ///////////// Get First 6 Testimonials \\\\\\\\\\\\

   GetTestimonialByNumber() {
    this.http.get("https://localhost:44366/api/Testimonial/GettestimonialFirst6").subscribe((result) => {
          this.loadedTestimonialForUser = result;
        },
        err => {
          this.toastr.error(err.message);
        })
  }





  loadedTestimonial:any = [{}];
  
  ///////////// Get Testimonial By Id \\\\\\\\\\\\

  GetTestimonial() {
    this.http.get("https://localhost:44366/api/Testimonial").subscribe((result) => {

        this.loadedTestimonial = result;

      }, err => {
        this.toastr.error(err.status, err.message);
      })
  }

}
