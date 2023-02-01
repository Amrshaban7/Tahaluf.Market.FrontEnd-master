import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MarketService } from 'src/app/services/market.service';
import { WebsitedataService } from 'src/app/services/websitedata.service';

@Component({
  selector: 'app-website-manage',
  templateUrl: './website-manage.component.html',
  styleUrls: ['./website-manage.component.css']
})
export class WebsiteManageComponent implements OnInit {

  constructor( private router: Router, private toastr: ToastrService, private http: HttpClientModule  , public dialog: MatDialog , public website: WebsitedataService) { }

  ngOnInit(): void {

    this.website.GetWebsiteData();
    
  }




  @Input() id: number | undefined;
  @Input() phoneNumber: string | undefined;
  @Input() hotline: string | undefined;
  @Input() email: string | undefined;
  @Input() aboutUsBody: string | undefined;
  @Input() aboutUsHead: string | undefined;
  @Input() websiteName: number | undefined;
  


  //////////// Update \\\\\\\\\\\\\

  updateform: FormGroup = new FormGroup({

    id: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    hotline: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    aboutUsBody: new FormControl('', [Validators.required]),
    aboutUsHead: new FormControl('', [Validators.required]),
    websiteName: new FormControl('', [Validators.required]),

  });

  openUpdate(Newid: any , NewphoneNumber: any, Newhotline: any, Newemail: any, NewaboutUsBody: any , newaboutUsHead:any , newwebsiteName:any) {

    this.previous_data = {

      id : Newid,
      phoneNumber: NewphoneNumber,
      hotline: Newhotline,
      email: Newemail,
      aboutUsBody: NewaboutUsBody,
      aboutUsHead: newaboutUsHead,
      websiteName: newwebsiteName

    }
    this.updateform.controls['id'].setValue(this.previous_data.id);

    let body = this.updateform.value;
    this.website.UpdateWebsiteData(body);
    window.location.reload();

  }

  previous_data: any = {}; // empty obj

  


}
