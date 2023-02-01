import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PromocodesService {

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) 
  { }

  loadedPromoCodes:any=[{}];
  loadedSoonestPromoCode:any=[{}];

  GetAllPromoCodes(){

    this.http.get('https://localhost:44366/api/PromoCode/GetAllPromoCodes/').subscribe(
    (res)=>{
      this.loadedPromoCodes = res;
    },
    err => {
      this.toastr.error(err.message);  
    })

  }

  loadNearestEndPromoCode(){

    this.http.get('https://localhost:44366/api/PromoCode/GetNearestEndPromoCode/').subscribe(
    (res)=>{
      this.loadedSoonestPromoCode = res;
    },
    err => {
      this.toastr.error(err.message);  
    })

  }

  AddPromoCode(body: any){

    this.http.post('https://localhost:44366/api/PromoCode/AddPromoCode/',body).subscribe(
    (res)=>{
      this.toastr.success("Promo Code Added");  
    },
    err => {
      this.toastr.error(err.message);  
    })

  }

  DeletePromoCode(id: number){
    let body = {
    }

    this.http.post('https://localhost:44366/api/PromoCode/DeletePromoCode/' + id,body).subscribe(
    (res)=>{
      this.toastr.success("Promo Code Deleted");  
    },
    
    err => {
      this.toastr.error(err.message);  
    })

  }

}
