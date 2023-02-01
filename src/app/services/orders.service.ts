import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chart, registerables, ChartType } from 'chart.js'
import { NgxSpinnerService } from 'ngx-spinner';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService , private spinner:NgxSpinnerService ) {

    Chart.register(...registerables);
  }


  loadedOrders: any = [{}];

  loadedRecentOrders:any =[{}];

  loadedOrderDetails:any ={};

  loadRecentOrders(){
    this.http.get("https://localhost:44366/api/Order/GetRecentOrders/").subscribe(
      (result)=>{
        this.loadedRecentOrders = result;
      },
      err => {
        this.toastr.error(err.message);
      })
    }

  loadOrdersByUserId(id: any) {
    this.http.get("https://localhost:44366/api/Order/GetOrdersByUserId/" + id).subscribe(
      (result) => {
        this.loadedOrders = result;
      },
      err => {
        this.toastr.error(err.message);
      })
  }

  loadOrderDetails(id: any) {
    this.http.get("https://localhost:44366/api/Order/GetOrderById/" + id).subscribe(
      (result) => {
        this.loadedOrderDetails = result;
      },
      err => {
        this.toastr.error(err.message);
      })
  }

  loadedOrdersSearch: any = [{}];

  loadOrderDetailsSearch(body: any) {

    let bodies: any = {};

    if (body.InStart != null && body.InStart != "") bodies.InStart = body.InStart;
    if (body.InEnd != null && body.InEnd != "") bodies.InEnd = body.InEnd;
    if (body.StoreId != null && body.StoreId != "") bodies.StoreId = +body.StoreId;
    
    this.spinner.show();
    this.http.post("https://localhost:44366/api/Order/SearchOrders/", bodies).subscribe(
      (result) => {
        this.loadedOrdersSearch = result;
        this.spinner.hide();
        this.toastr.success("search Order Details Loaded!");
      },
      err => {
        this.toastr.error(err.message);
      })
  }



  ///////////// Edit Testimonial \\\\\\\\\\\\

  updateOrder(body: any) {
    this.http.put('https://localhost:44366/api/Order', body).subscribe((res) => {

      this.toastr.success('Order Updated Successfully');

    }, err => {
      this.toastr.error(err.status, err.message);
    })
  }



  StartDate: any = 0;
  EndDate: any = 0;
  StoreName: any = 0;


  PriceSum: any = 0;

  GetsumPrice(body: any) {
     this.spinner.show();

    let bodies: any = {};

    if (body.InStart != null && body.InStart != "") bodies.InStart = body.InStart;
    if (body.InEnd != null && body.InEnd != "") bodies.InEnd = body.InEnd;
    if (body.StoreId != null && body.StoreId != "") bodies.StoreId = +body.StoreId;

    this.StartDate = body.InStart;
    this.EndDate = body.InEnd;
    this.StoreName = body.StoreId;


    this.http.post('https://localhost:44366/api/Order/GetAllOrdersPrice', bodies).subscribe(
      (result) => {
        // 3- Store result in array of object
        this.PriceSum = result;

         this.spinner.hide();
      }, err => {
        this.toastr.error(err.message, err.status)
      }
    )
  }



  Counts: any = [{}];

  GetCounts() {
     this.spinner.show();
    this.http.get('https://localhost:44366/api/Order/GetCounts').subscribe(
      (result) => {
        // 3- Store result in array of object
        this.Counts = result;

         this.spinner.hide();
      }, err => {
        this.toastr.error(err.message, err.status)
      }
    )
  }




  CountsOrders: any = [{}];

  GetCountsOrders(body: any) {


    let bodies: any = {};


    if (body.InStart != null && body.InStart != "") bodies.InStart = body.InStart;
    if (body.InEnd != null && body.InEnd != "") bodies.InEnd = body.InEnd;
    if (body.StoreId != null && body.StoreId != "") bodies.StoreId = +body.StoreId;

    this.spinner.show();
   this.http.post('https://localhost:44366/api/Order/GetAllOrdersNumberPending' , bodies).subscribe(
     (result) => {
       // 3- Store result in array of object
       this.CountsOrders = result;

        this.spinner.hide();
     }, err => {
       this.toastr.error(err.message, err.status)
     }
   )
 }



  //////////////////// Array Charts \\\\\\\\\\\\\\\\\\\\\\\\\

  arrayorders: any = [];
  arraysumprice: any = [];
  arraysumitems: any = [];
  chart: any = [];


  GetAllOrdersPrice() {
    this.spinner.show();
    this.http.get('https://localhost:44366/api/Order/GetAllOrdersArray').subscribe(
      (result) => {
        // 3- Store result in array of object
        this.arrayorders = result;

        console.log("array 1 service = " + result);

        



        ////////////////////\\\\\\\\\\\\\\\\\\\\\\\
        this.http.get('https://localhost:44366/api/Order/GetAllOrdersPriceArray').subscribe(
          (result) => {

            this.arraysumprice = result;

            /////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\
            this.http.get('https://localhost:44366/api/Order/GetAllOrdersproductsArray').subscribe(
              (result) => {
                // 3- Store result in array of object
                this.arraysumitems = result;



                // Chart
                this.chart = new Chart('canvas', {
                  type: 'line' as ChartType,
                  data: {
                    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    datasets: [
                      {
                        label: 'orders',
                        data: this.arrayorders,
                        borderWidth: 3,
                        fill: false,
                        tension: 0.1,
                        backgroundColor: 'rgba(93, 175, 89 , 0.1)',
                        borderColor: '#3e95cd',
                        pointBackgroundColor: 'rgb(93, 175, 89 , 0.1)',
                        hoverRadius: 8
                      },
                      {
                        label: 'sales',
                        data: this.arraysumprice,
                        borderWidth: 3,
                        fill: false,
                        tension: 0.3,
                        backgroundColor: 'rgba(221	,250,	218)',
                        borderColor: 'rgba(38, 194, 129)',
                        pointBackgroundColor: 'rgb(221	,250,	218, 0.1)',
                        hoverRadius: 8

                      },
                      {
                        label: 'items',
                        data: this.arraysumitems,
                        borderWidth: 3,
                        fill: false,
                        tension: 0.3,
                        backgroundColor: 'rgb(255,235,205)',
                        borderColor: 'rgba(255,192,203)',
                        pointBackgroundColor: 'rgb(255,235,205,0.1)',
                        hoverRadius: 8

                      },
                    ],
                  },
                  options: {
                    scales: {
                      y: {
                        stacked: true,
                        display: false,
                        beginAtZero: true,

/*                         max: Math.max(5000)    */      
                },
                     
                      scaleLabel: {

                        display: true,
                        title: {
                          display: true,
                           /* text: 'Sales In $',  */

                        },
                        max: 10000,
                        min: 0,
                        ticks: {
                          stepSize: 1000,

                          font: {
                            family: 'vazir',
                          }

                        },



                      },
                    },
                    
                  },

                });

               this.spinner.hide();

              }, err => {
                this.toastr.error(err.message, err.status)
              }
            )



          }, err => {
            this.toastr.error(err.message, err.status)
          }
        )



      }, err => {
        this.toastr.error(err.message, err.status)
      }


    )
  }


} 
