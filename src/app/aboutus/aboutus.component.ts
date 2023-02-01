import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TestimonialService } from '../services/testimonial.service';
import { UserdataService } from '../services/userdata.service';
import { WebsitedataService } from '../services/websitedata.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {

  constructor(public websitedata:WebsitedataService, public testimonial: TestimonialService , public userData:UserdataService , private router: Router , private http: HttpClientModule  , public dialog: MatDialog , private toastr: ToastrService) { }

  ngOnInit(): void {
    this.websitedata.GetWebsiteData();
    this.testimonial.GetTestimonialByUser();
  }


  @Input() testemoniaL_BODY: string | undefined;


   //////////// Create \\\\\\\\\\\

  
   createform: FormGroup = new FormGroup({

    testemoniaL_BODY:   new FormControl('', [Validators.required , Validators.minLength(100)]),
  });

 

  saveTestimonial(){    

    if (this.createform.invalid) {
      return;
    }
    else{

      let user:any = localStorage.getItem('User');
      user = JSON.parse(user);
      let idd: number = +user.nameid;
      
      let body = this.createform.value;
      
      body.userId = idd;
      body.status = "Pending";

      this.testimonial.createTestimonial(body);


      window.location.reload();
    }

  }
 
  

  
}
