import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from '../services/contact.service';
import { WebsitedataService } from '../services/websitedata.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

  constructor(public websitedata:WebsitedataService, public contact: ContactService , private router: Router , private http: HttpClientModule  , public dialog: MatDialog , private toastr: ToastrService) { }


  ngOnInit(): void {

    this.websitedata.GetWebsiteData();
  }



  currentDate() {
    const currentDate = new Date();
    return currentDate.toISOString().substring(0,10);
  }


  //////////// Create \\\\\\\\\\\

  
  createform: FormGroup = new FormGroup({

    fullname: new FormControl('', [Validators.required]),
    email: new FormControl('' , [Validators.required, (Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))]),
    subject:       new FormControl('', [Validators.required]),
    message:   new FormControl('', [Validators.required , Validators.minLength(30)]),


  });


 
  saveProduct(){    

    if (this.createform.invalid) {
      return;
    }
    else{
      this.contact.createContactUs(this.createform.value);
      window.location.reload();
    }

  }




}
