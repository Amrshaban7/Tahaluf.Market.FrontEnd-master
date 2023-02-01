import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class WebsitedataService {

  constructor(private http: HttpClient,private spinner:NgxSpinnerService,private toastr:ToastrService) { }

  websiteData: any = {};

  GetWebsiteData(): any{
    this.spinner.show();
    this.http.get("https://localhost:44366/api/WebsiteData/GetWebsiteData/").subscribe(
      (result)=>{
        this.websiteData = result;
        this.spinner.hide();
      },
      err => {
        this.toastr.error(err.message);
      })
    
  }

  UpdateWebsiteData(body: any): any{
    this.spinner.show();
    this.http.put("https://localhost:44366/api/WebsiteData/UpdateWebsiteData/",body).subscribe(
      (result)=>{
        this.spinner.hide();
      },
      err => {
        this.toastr.error(err.message);
      })
    
  }

}
