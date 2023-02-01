import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, public auth: AuthService, private toastr: ToastrService, public image:ImagesService) { }

  ngOnInit(): void {
  }

  emailFormControl = new FormControl('', [Validators.email, Validators.required])

  passFormControl = new FormControl('', [Validators.required])
  
  submit(){
    if (this.emailFormControl.invalid || this.passFormControl.invalid ) {
      return;
    }
    else{
    this.auth.Login(this.emailFormControl.value,this.passFormControl.value)
    }
  }

  profileForm: FormGroup = new FormGroup({

    fName: new FormControl('', [Validators.required]),
    lName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, (Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))]),
    password: new FormControl('', [Validators.required ,]),
    repassword: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10)]),
    image_path: new FormControl('', Validators.required), 
  })

  /* goToRegister(){
    this.router.navigateByUrl('/Register');
  } */


  signUp(){

  
  if (this.profileForm.invalid) {
    return;
  }
  else{

    let body = this.profileForm.value;
      body.image_path = this.image.displayImage;
      body.roleName = "User";
      body.phoneNumber = body.phoneNumber.toString(),
      body.phoneNumber = body.phoneNumber + "";

    this.auth.Register(body);
        window.location.reload();
  }

}

UploadImage(image:any){
  if(image.length === 0) return;
  let imageUploaded = <File>image[0];
  const formData = new FormData();
  formData.append('file',imageUploaded, imageUploaded.name);
  this.image.UploadImage(formData);
}


matchError(){


  if(this.profileForm.controls['password'].value ==  this.profileForm.controls['repassword'].value){
    this.profileForm.controls['repassword'].setErrors(null);

  }
  else{

    this.profileForm.controls['repassword'].setErrors({mismatch:true})

}

}

}
