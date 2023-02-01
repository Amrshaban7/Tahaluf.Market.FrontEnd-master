import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PromocodesService } from 'src/app/services/promocodes.service';

@Component({
  selector: 'app-promocode-manage',
  templateUrl: './promocode-manage.component.html',
  styleUrls: ['./promocode-manage.component.css']
})
export class PromocodeManageComponent implements OnInit {

  constructor(private router: Router , private http: HttpClientModule, private toastr: ToastrService , public promocode: PromocodesService) { }

  ngOnInit(): void {
    this.promocode.GetAllPromoCodes();


  }


  myDate = Date.now();



  myDate1? = new Date();



  addPromo: FormGroup = new FormGroup({

    Code: new FormControl('', Validators.required),
    Name: new FormControl('', Validators.required),
    Discount: new FormControl('', Validators.required),
    Start_Time: new FormControl('', Validators.required),
    End_Time: new FormControl('', Validators.required),
  });
  
  addPromoCode(){
    this.promocode.AddPromoCode(this.addPromo.value);
    window.location.reload()
  }

  deletePromoCode(id : number){
    this.promocode.DeletePromoCode(id);
    window.location.reload()
  }




}
