import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService, private spinner:NgxSpinnerService) { }




  products: any = [{}];

  display_image: any;


  getAllProducts() {

    // 1- Show Spinner
    this.spinner.show();
    // 2- http.get(url)
    this.http.get('https://localhost:44366/api/Product').subscribe(
      (result) => {
        // 3- Store result in array of object
        this.products = result;
        // 4- hide Spinner
        /*         this.spinner.hide();
         */        // 5- teturn Toastr
         this.spinner.hide();
         this.toastr.success('Products Retrived.');


      }, err => {
        this.toastr.error(err.message, err.status)
      }

    )
  }


  GetProductByName(names: any) {

    this.spinner.show();
    this.http.get('https://localhost:44366/api/Product/GetProductByName/' + names).subscribe(
      (result) => {
        // 3- Store result in array of object
        this.products = result;
        // 4- hide Spinner
        /*         this.spinner.hide();
         */        // 5- teturn Toastr
         this.spinner.hide();
        this.toastr.success('Product Retrived.');


      }, err => {
        this.toastr.error(err.message, err.status)
      }

    )
  }



  








}
