import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService, private spinner:NgxSpinnerService) { }


  markets: any = [{}];

  nulle: any = [{}];

  display_image: any;

  selectedMarketId: number = 0;

  loadedStores:any=[{}];

  loadedMarketInfo: any ={};

  loadedMarketCategories: any ={};

  loadMarket(id: number){
    this.selectedMarketId = id;
    this.LoadMarketInfo(id);
    this.LoadMarketStores(id);
    this.LoadMarketCategories(id);
  }

  getAllmarkets() {

    // 1- Show Spinner
    this.spinner.show();
    // 2- http.get(url)
    this.http.get('https://localhost:44366/api/Market').subscribe(
      (result) => {
        // 3- Store result in array of object
        this.markets = result;
        // 4- hide Spinner
        this.spinner.hide();

      }, err => {
        this.toastr.error(err.message, err.status)
      }
    )
  }


  LoadMarketStores(id: any){
    this.spinner.show();
    this.http.get("https://localhost:44366/api/Store/GetStoresByMarketId/"+id).subscribe(
      (result)=>{
        this.selectedMarketId = id;
        this.loadedStores = result;
        this.LoadMarketInfo(id);
        this.spinner.hide();
      },
      err => {
        this.toastr.error(err.message);
      })
    
  }

  LoadMarketStoresByCategoryId(mid: number , id:number){
    this.spinner.show();

    let body = {
      MarketId : +mid,
      CategoryId : id
    }

    this.http.post("https://localhost:44366/api/Store/GetStoresByCategoryId/" , body).subscribe(
      (result)=>{
        this.selectedMarketId = id;
        this.loadedStores = [];
        this.loadedStores = result;
        this.LoadMarketInfo(id);
        this.spinner.hide();
      },
      err => {
        this.toastr.error(err.message);
      })
    
  }

  LoadMarketInfo(id: any){
    this.spinner.show();

    this.http.get("https://localhost:44366/api/Market/GetMarketById/"+id).subscribe(
      (result)=>{
        this.loadedMarketInfo = result;
        this.spinner.hide();
      },
      err => {
        this.toastr.error(err.message);
      })
  }

  LoadMarketCategories(id: any){
    this.http.get("https://localhost:44366/api/Category/GetCategoriesByMarketId/"+id).subscribe(
      (result)=>{
        this.loadedMarketCategories = result;
      },
      err => {
        this.toastr.error(err.message);
      })
  }



  /////////// Create Market \\\\\\\\\\\\

  createMarket(body: any) {

    // 1- Show Spinner
    this.spinner.show();

    this.http.post("https://localhost:44366/api/Market", body).subscribe((result)=>{
    
    this.spinner.hide();

    // 5- teturn Toastr
      this.toastr.success('Market Created Succesfully.');

    }, err => {
      this.toastr.error(err.message, err.status)
    })
  }



  ////////////// Delete Market \\\\\\\\\\\\\\\

  deleteMarket(id: number) {

    this.http.delete("https://localhost:44366/api/Market/delete/"+id).subscribe((resp) => {

      this.toastr.success('Market Deleted Successfully');

    }, err => {

      this.toastr.error(err.message, err.status)

    });
  }


  ///////////// Edit \\\\\\\\\\\\

  updateMarket(body: any) {
    this.spinner.show();
    body.imageName = this.display_image;
    this.http.put('https://localhost:44366/api/Market', body).subscribe((res) => {

      this.spinner.hide();

        this.toastr.success('Market Updated Successfully');

      }, err => {

        this.toastr.error(err.status, err.message);

      })
  }



}
