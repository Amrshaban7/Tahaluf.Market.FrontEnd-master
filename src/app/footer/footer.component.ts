import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserdataService } from '../services/userdata.service';
import { WebsitedataService } from '../services/websitedata.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public websitedata:WebsitedataService,public userdata:UserdataService, private router: Router,private toastr:ToastrService) { }

  emailBox = new FormControl('',[Validators.required,Validators.email]);

  submitEmail(){
  if(this.emailBox.valid && this.emailBox.value!=''){
    this.userdata.AddEmailToNewsletter(this.emailBox.value)
  }
  else
    this.toastr.info("Enter a Valid Email Address To Subscribe.");
  }
   Date:Date= new Date();
  ngOnInit(): void {
    this.websitedata.GetWebsiteData();
  }

}
