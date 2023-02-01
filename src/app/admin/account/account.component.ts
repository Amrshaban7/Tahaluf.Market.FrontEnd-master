import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { ImagesService } from 'src/app/services/images.service';
import { UserdataService } from 'src/app/services/userdata.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  @ViewChild('CallCreate') CallCreate!: TemplateRef<any>




  constructor(  private router: Router , private http: HttpClientModule  , public dialog: MatDialog , public auth: AuthService, public userdata:UserdataService, private toastr: ToastrService, public image:ImagesService) { }

  adminAccount: any={};

  tempData: any={};

  ngOnInit(): void {


      let user:any = localStorage.getItem('User');
      user = JSON.parse(user);
      console.log(user.nameid);
      this.auth.SetUserDataById(user.nameid);

  }

  profileForm: FormGroup = new FormGroup({

    fName: new FormControl('', [Validators.required]),
    lName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required,Validators.email]),
    phoneNumber: new FormControl('', Validators.required),
    image_Path: new FormControl('', Validators.required),
  })

  UpdateUser() {


    this.tempData= this.auth.currentUserData;

    if(this.profileForm.controls['fName'].value!=null)
    this.tempData.fName = this.profileForm.controls['fName'].value;

    if(this.profileForm.controls['lName'].value!=null)
    this.tempData.lName = this.profileForm.controls['lName'].value;

    if(this.profileForm.controls['email'].value!=null)
    this.tempData.email = this.profileForm.controls['email'].value;

    if(this.profileForm.controls['phoneNumber'].value!=null)
    this.tempData.phoneNumber = this.profileForm.controls['phoneNumber'].value;

    if(this.profileForm.controls['image_Path'].value!=null){
      this.tempData.image_Path = this.image.displayImage;
  }

    this.userdata.UpdateUser(this.tempData);

    window.location.reload();
  }

  UploadImage(image:any){
    if(image.length === 0) return;
    let imageUploaded = <File>image[0];
    const formData = new FormData();
    formData.append('file',imageUploaded, imageUploaded.name);
    this.image.UploadImage(formData);
  }

  
  openCreate() {

    const dialogRef = this.dialog.open(this.CallCreate ,{

            width: '70%',
            height : '95%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }
  

}
