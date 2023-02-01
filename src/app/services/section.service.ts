import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }



  Sections: any = [{}];




  /////////// Create Section \\\\\\\\\\\\

  createSection(body: any) {
    // 1- Show Spinner
     // this.spinner.show();
    // 2- http.Post(url)

    this.http.post("https://localhost:44366/api/Section", body).subscribe((result)=>{
    
     // this.spinner.hide();

    // 5- teturn Toastr
      this.toastr.warning('Section Created Succesfully.');

    }, err => {
      this.toastr.error(err.message, err.status)
    })
  }


  ////////////// Delete Section \\\\\\\\\\\\\\\

  deleteSections(id: number) {

    this.http.delete("https://localhost:44366/api/Section/delete/"+id).subscribe((resp) => {

      this.toastr.success('Section Deleted Successfully');

    }, err => {

      this.toastr.error(err.message, err.status)

    });
  }

   ///////////// Edit \\\\\\\\\\\\

   updateSection(body: any) {
    this.http.put('https://localhost:44366/api/Section', body).subscribe((res) => {

        this.toastr.success('Section Updated Successfully');

      }, err => {

        this.toastr.error(err.status, err.message);

      })
  }

}
