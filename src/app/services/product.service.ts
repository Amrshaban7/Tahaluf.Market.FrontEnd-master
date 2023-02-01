import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  loadedProduct:any={};

  loadedProductsfirst4:any=[{}];

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService, private spinner:NgxSpinnerService) { }

  LoadProduct(id: any){
    this.spinner.show();
    this.http.get("https://localhost:44366/api/Product/GetProductById/"+id).subscribe(
      (result)=>{

        this.loadedProduct = result;
        //START
        
        let sid: any = localStorage.getItem('loadedStoreId');
          let body = {
            sectionID : +this.loadedProduct.sectionId,
            StoreId: +sid,
          }
      
          this.spinner.show();
          this.http.post("https://localhost:44366/api/Product/GetProductsBySectionIdFirst4/" , body).subscribe(
            (result)=>{
              this.loadedProductsfirst4 = result;
              this.spinner.hide()
            },
            err => {
              this.toastr.error(err.message);
            }) 
        
        //END

        
        
        localStorage.setItem("loadedStoresection" , this.loadedProduct.sectionID.tostring());
        this.spinner.hide();
        this.toastr.success("Product Info Loaded!");
      },
      err => {
        this.toastr.error(err.message);
      })

  }
 
  /////////////////////// For Searching

  searchproducts: any = [{}];

  display_image: any;

  getAllProducts() {

   
    this.spinner.show();

    this.http.get('https://localhost:44366/api/Product').subscribe(
      (result) => {
        // 3- Store result in array of object
        this.searchproducts = result;

        this.spinner.hide();

      }, err => {
        this.toastr.error(err.message, err.status)
      }

    )
  }

  GetProductByName(event: any) {

    // 1- Show Spinner
    this.spinner.show();
    // 2- http.get(url)
    this.http.get("https://localhost:44366/api/Product/GetProductByName/" + event).subscribe(
      (result) => {
        // 3- Store result in array of object
        this.searchproducts = result;
        // 4- hide Spinner
       this.spinner.hide();
        this.toastr.success('Product Retrived.');


      }, err => {
        this.toastr.error(err.message, err.status)
      }

    )
  }

///////////////////////// For Admin Dasboard ///////////////////////// 


  


  /////////// Create Product \\\\\\\\\\\\

  createProduct(body: any) {

    // 1- Show Spinner
    this.spinner.show();
    // 2- http.Post(url)
    this.http.post("https://localhost:44366/api/Product", body).subscribe((result)=>{
    
     this.spinner.hide();

      this.toastr.success('Product Created Succesfully.');

    }, err => {
      this.toastr.error(err.message, err.status)
    })

  }

  ////////////// Delete Product \\\\\\\\\\\\\\\

  deleteProduct(id: number) {
    this.spinner.show();
    this.http.delete("https://localhost:44366/api/Product/delete/"+id).subscribe((resp) => {
      this.spinner.hide();
      this.toastr.success('Product Deleted Successfully');

    }, err => {

      this.toastr.error(err.message, err.status)

    });
  }

  ///////////// Edit Product \\\\\\\\\\\\

  updateProduct(body: any) {
    this.spinner.show();
    this.http.put('https://localhost:44366/api/Product', body).subscribe((res) => {
      this.spinner.hide();
        this.toastr.success('Product Updated Successfully');

      }, err => {
        this.toastr.error(err.status, err.message);
      })
  }




}
