import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }

  displayImage:any ='';

  UploadImage(image:any){
    //this.spinner.show();
    this.http.post('https://localhost:44366/api/Image/UploadImage', image).subscribe(
      (result:any)=>{
      //this.spinner.hide();
      this.displayImage = result.imageName;
      this.toastr.success('Image Uploaded Successfully!');
      },
      err => {
        //this.spinner.hide();  
        this.toastr.error(err.message)
      })
  }


}

