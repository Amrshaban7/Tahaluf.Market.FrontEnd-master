import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ImagesService } from '../services/images.service';
import { OrdersService } from '../services/orders.service';
import { UserdataService } from '../services/userdata.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  constructor(public orders: OrdersService, public userdata:UserdataService, private router: Router, public auth: AuthService, public image:ImagesService) { }

  ngOnInit(): void {

    const token = localStorage.getItem('token')
    let user:any = localStorage.getItem('User');
    user = JSON.parse(user);
    let id: any = user.nameid;
    this.orders.loadOrdersByUserId(id)
    this.auth.SetUserDataById(user.nameid);
  }
  
  profileForm: FormGroup = new FormGroup({

    fName: new FormControl('', [Validators.required]),
    lName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required,Validators.email]),
    phoneNumber: new FormControl('', Validators.required),
    image_Path: new FormControl('', Validators.required),
  })

  tempData: any={};

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

  ViewDetails(OID : Number) {

    this.orders.loadOrderDetails(OID);
    localStorage.setItem('loadedOrderId', OID.toString());


    this.router.navigate(["OrderDetails"]);


  }

  UploadImage(image:any){
    if(image.length === 0) return;
    let imageUploaded = <File>image[0];
    const formData = new FormData();
    formData.append('file',imageUploaded, imageUploaded.name);
    this.image.UploadImage(formData);
  }
  
  LogOut(){
    localStorage.clear();
     this.router.navigate(["Account/Login"]); 
  }
  
}
