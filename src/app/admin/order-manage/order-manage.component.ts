import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrdersService } from 'src/app/services/orders.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-order-manage',
  templateUrl: './order-manage.component.html',
  styleUrls: ['./order-manage.component.css']
})
export class OrderManageComponent implements OnInit {

  constructor( public store: StoreService, public order: OrdersService ,  private router: Router , private http: HttpClientModule  , public dialog: MatDialog , private toastr: ToastrService) { }


  @ViewChild('callUpdate') callUpdate!: TemplateRef<any>





  ngOnInit(): void {

    this.order.GetCounts();

    var body:any = {};
    this.order.GetsumPrice(body);

    this.store.GetAllStore();


    var body:any = {};
    this.order.loadOrderDetailsSearch(body);

  }


  OrderFilter(event: any){

    let orderid: number = +event.target.value

    console.log("orderid = " + orderid)
    this.order.loadOrderDetails(orderid);

  }



  nStoreId = new FormControl('')
  nInStart = new FormControl('')
  nInEnd   = new FormControl('')



  Search(){



    let body = {

     StoreId : this.nStoreId.value,
     InStart : this.nInStart.value,
     InEnd : this.nInEnd.value

    }

    console.log("body = " + body);

    console.log("indate New = " + body.InStart);
    console.log("End date New = " + body.InEnd);
    console.log("Store Id New = " + body.StoreId);





    this.order.loadOrderDetailsSearch(body);


    this.order.GetsumPrice(body);

  }






   //////////// Edit \\\\\\\\\\\\\

   updateform: FormGroup = new FormGroup({

    Id: new FormControl('', [Validators.required]),
    orderStatus: new FormControl('', [Validators.required]),
    
  })

  
  previous_data: any = {}; // empty obj

  openUpdate(Newid: any , NeworderStatus:any , ) {

    this.previous_data = {

      Id : Newid,
      orderStatus : NeworderStatus,      
    }

    this.updateform.controls['Id'].setValue(this.previous_data.Id);

    this.dialog.open(this.callUpdate ,{

      width: '30%'
});

  }

  updateTestimonial() {

    this.order.updateOrder(this.updateform.value);
    window.location.reload();
  }

}
