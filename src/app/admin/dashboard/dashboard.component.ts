import { Component, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ProductService } from 'src/app/services/product.service';
import {Chart , registerables, ChartType} from 'chart.js'
import { useAnimation } from '@angular/animations';
import { bindCallback } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { UserdataService } from 'src/app/services/userdata.service';
import { PromocodesService } from 'src/app/services/promocodes.service';
import { OrdersService } from 'src/app/services/orders.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StoreService } from 'src/app/services/store.service';
import { AuthService } from 'src/app/services/auth.service';
import jsPDF from 'jspdf';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  @ViewChild('CallCreate') CallCreate!: TemplateRef<any>


  constructor(public promocode: PromocodesService, public auth: AuthService , public store: StoreService, public order: OrdersService ,public product: ProductService , public userdata: UserdataService , private router: Router , private http: HttpClientModule  , public dialog: MatDialog , private toastr: ToastrService ) { 

    Chart.register(...registerables);
    
  }


/*   numberofusers:any = this.userdata.getAllUsers.length();
 */  
  
  chart: any = [];

  ngOnInit(): void {

    this.order.GetCounts();

    this.userdata.getRecentUsers();
    this.promocode.loadNearestEndPromoCode();
    this.order.loadRecentOrders();
    var body:any = {};
    this.order.GetsumPrice(body);
    this.order.GetAllOrdersPrice();
    
    const productnum: any = this.product.getAllProducts();

     // Show Chart Data

    this.store.GetAllStore();

    this.order.loadOrderDetailsSearch(body);
    
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



  print(): void {
    window.print()
}



myDate = new Date();




@ViewChild('content', { static: false }) el!: ElementRef;

makePdf() {

  let pdf = new jsPDF({
      orientation: 'p', 
      unit: 'px', 
      format: [1000, 1000]
      });
  
  pdf.html(this.el.nativeElement, {
    callback: (pdf) => {

      var width = pdf.internal.pageSize.getWidth();
      var height = pdf.internal.pageSize.getHeight();
      pdf.save("Report.pdf")
    }
  })
}


 

  

}
