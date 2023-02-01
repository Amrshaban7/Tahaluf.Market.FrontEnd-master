import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }




   categories: any = [{}];


   // ==> Not Used !!!
  getAllCategory() {

    // 1- Show Spinner
    /*  this.spinner.show(); */
    // 2- http.get(url)
    this.http.get('https://localhost:44366/api/Category').subscribe(
      (result) => {
        // 3- Store result in array of object
        this.categories = result;
        // 4- hide Spinner
        /*         this.spinner.hide();
         */        // 5- teturn Toastr

      }, err => {
        this.toastr.error(err.message, err.status)
      }
    )
  }


  /////////// Create Category \\\\\\\\\\\\

  createCategory(body: any) {
    // 1- Show Spinner
     // this.spinner.show();
    // 2- http.Post(url)

    this.http.post("https://localhost:44366/api/Category", body).subscribe((result)=>{
    
     // this.spinner.hide();

    // 5- teturn Toastr
      this.toastr.warning('Category Created Succesfully.');

    }, err => {
      this.toastr.error(err.message, err.status)
    })
  }


  ////////////// Delete Category \\\\\\\\\\\\\\\

  deleteCategory(id: number) {

    this.http.delete("https://localhost:44366/api/Category/delete/"+id).subscribe((resp) => {

      this.toastr.success('Category Deleted Successfully');

    }, err => {

      this.toastr.error(err.message, err.status)

    });
  }

  ///////////// Edit \\\\\\\\\\\\

  updateCategory(body: any) {
    this.http.put('https://localhost:44366/api/Category', body).subscribe((res) => {

        this.toastr.success('Category Updated Successfully');

      }, err => {

        this.toastr.error(err.status, err.message);

      })
  }







}
