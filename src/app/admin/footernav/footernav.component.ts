import { Component, OnInit } from '@angular/core';
import { WebsitedataService } from 'src/app/services/websitedata.service';

@Component({
  selector: 'app-footernav',
  templateUrl: './footernav.component.html',
  styleUrls: ['./footernav.component.css']
})
export class FooternavComponent implements OnInit {

  constructor(public websitedata:WebsitedataService) { }
  Date:Date= new Date();
  ngOnInit(): void {
      this.websitedata.GetWebsiteData();
  }

}
