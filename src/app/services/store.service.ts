import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService , private spinner:NgxSpinnerService) { }

  selectedStoreId: number = 0;

  loadedProducts:any=[{}];

  loadedStoreInfo: any ={};

  loadedStoreSection: any ={};

  recentProducts:any=[{}];

  biggestDiscountStore:any={};

  biggestDiscountProducts:any=[{}];

  loadStore(id: number){
    this.selectedStoreId = id;
    this.LoadStoreInfo(id);
    this.LoadStoreProducts(id);
    this.LoadStoreSections(id);
  }


  LoadStoreProducts(id: any){
    this.spinner.show();
    this.http.get("https://localhost:44366/api/Product/GetProductsByStoreId/"+id).subscribe(
      (result)=>{
        this.selectedStoreId = id;
        this.loadedProducts = result;
        this.LoadStoreInfo(id);
        this.spinner.hide()
      },
      err => {
        this.toastr.error(err.message);
      })
    
  }

  loadStoreProductsBySectionId(sid : any,id: any){
    let body = {
      StoreId : +sid,
      SectionId : id
    }
    this.spinner.show();
    this.http.post("https://localhost:44366/api/Product/GetProductsBySectionId/",body).subscribe(
      (result)=>{
        this.selectedStoreId = id;
        this.loadedProducts = [];
        this.loadedProducts = result;
        this.LoadStoreInfo(id);
        this.spinner.hide()
      },
      err => {
        this.toastr.error(err.message);
      })
    
  }

  LoadStoreInfo(id: any){
    this.spinner.show();

    this.http.get("https://localhost:44366/api/Store/GetStoreById/"+id).subscribe(
      (result)=>{
        this.loadedStoreInfo = result;
        this.spinner.hide();
      },
      err => {
        this.toastr.error(err.message);
      })

  }

  LoadStoreSections(id: any){
    this.spinner.show();
    this.http.get("https://localhost:44366/api/Section/GetSectionsByStoreId/"+id).subscribe(
      (result)=>{
        this.loadedStoreSection = result;
        this.spinner.hide()
      },
      err => {
        this.toastr.error(err.message);
      })
    
  }



  allstores: any = [{}];

  GetAllStore(){
    this.spinner.show();
    this.http.get("https://localhost:44366/api/Store").subscribe(
      (result)=>{
        this.allstores = result;
        this.spinner.hide()
      },
      err => {
        this.toastr.error(err.message);
      })
    
  }

  GetRecentProducts(){
    this.spinner.show();
    this.http.get("https://localhost:44366/api/Product/GetRecentProducts/").subscribe(
      (result)=>{
        this.recentProducts = result;
        this.spinner.hide()
      },
      err => {
        this.toastr.error(err.message);
      })
    
  }


  ///////////////////////// For Admin Dasboard ///////////////////////// 


  


  /////////// Create Store \\\\\\\\\\\\

  createStore(body: any) {

    // 1- Show Spinner
     this.spinner.show();
    // 2- http.Post(url)
    this.spinner.show();
    this.http.post("https://localhost:44366/api/Store", body).subscribe((result)=>{
    
     this.spinner.hide();

    // 5- teturn Toastr
    this.spinner.hide()
      this.toastr.success('Store Created Succesfully.');

    }, err => {
      this.toastr.error(err.message, err.status)
    })

  }

   ////////////// Delete Store \\\\\\\\\\\\\\\

   deleteStore(id: number) {
    this.spinner.show();
    this.http.delete("https://localhost:44366/api/Store/delete/"+id).subscribe((resp) => {
      this.spinner.hide()
      this.toastr.success('Store Deleted Successfully');

    }, err => {

      this.toastr.error(err.message, err.status)

    });
  }

  ///////////// Edit \\\\\\\\\\\\

  updateStore(body: any) {
    this.spinner.show();
    this.http.put('https://localhost:44366/api/Store', body).subscribe((res) => {
      this.spinner.hide()
        this.toastr.success('Store Updated Successfully');

      }, err => {
        this.toastr.error(err.status, err.message);
      })
  }

  GetBiggestDiscount() {
    this.spinner.show();
    this.http.get('https://localhost:44366/api/Store/GetBiggestDiscount/').subscribe((res) => {
      this.biggestDiscountStore = res;
    
      this.http.get('https://localhost:44366/api/Product/GetDiscountStoreItems/'+this.biggestDiscountStore.storeId).subscribe((result) => {
        this.biggestDiscountProducts = result;
        }, err => {
          this.toastr.error(err.status, err.message);
        })

      this.spinner.hide()
      }, err => {
        this.toastr.error(err.status, err.message);
      })
  }




}
