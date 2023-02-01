import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-manage',
  templateUrl: './contact-manage.component.html',
  styleUrls: ['./contact-manage.component.css']
})
export class ContactManageComponent implements OnInit {


  @ViewChild('CallDelete') CallDelete!: TemplateRef<any>


  
  constructor( public contact: ContactService , private router: Router , private http: HttpClientModule  , public dialog: MatDialog , private toastr: ToastrService) { }

  ngOnInit(): void {

    this.contact.GetContactUs(); 
  }





  //////////// Delete \\\\\\\\\\\\\
  
  
  openDelete(id: number) {

    const dialogRef1 = this.dialog.open(this.CallDelete ,{

      width: '35%'
});

    dialogRef1.afterClosed().subscribe((result) => {

      if (result != undefined) {

        if (result == 'yes') {

          this.contact.deletecontactUs(id);

          window.location.reload();
          window.location.reload();

        }
        else if (result == 'no'){
          this.toastr.info("You Canceled the Delete");
        } 

      }  
       
      })
  }

}
