import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserdataService } from 'src/app/services/userdata.service';

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.css']
})
export class UserManageComponent implements OnInit {


  @ViewChild('CallDelete') CallDelete!: TemplateRef<any>


  
  constructor(public userservice: UserdataService , private router: Router , private http: HttpClientModule  , public dialog: MatDialog , private toastr: ToastrService) { }


  ngOnInit(): void {
    this.userservice.getAllUsers();
  }

  
  //////////// Delete \\\\\\\\\\\\\
  
  
  openDelete(id: number) {

    const dialogRef1 = this.dialog.open(this.CallDelete ,{

      width: '35%'
});

    dialogRef1.afterClosed().subscribe((result) => {

      if (result != undefined) {

        if (result == 'yes') {

          this.userservice.deleteUser(id);

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
