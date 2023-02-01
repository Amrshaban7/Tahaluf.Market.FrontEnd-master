import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.service';
import { MarketService } from 'src/app/services/market.service';
import { StoreService } from 'src/app/services/store.service';
import {MatSelectModule} from '@angular/material/select';
import { ImagesService } from 'src/app/services/images.service';


@Component({
  selector: 'app-market-manage',
  templateUrl: './market-manage.component.html',
  styleUrls: ['./market-manage.component.css']
})
export class MarketManageComponent implements OnInit {


  @ViewChild('CallCreate') CallCreate!: TemplateRef<any>
  @ViewChild('CallDelete') CallDelete!: TemplateRef<any>
  @ViewChild('callUpdate') callUpdate!: TemplateRef<any>

  @ViewChild('CallCreateCategory') CallCreateCategory!: TemplateRef<any>





  @Input() id: number | undefined;
  @Input() marketName: string | undefined;
  @Input() marketDesc: string | undefined;
  @Input() marketType: string | undefined;
  @Input() location: string | undefined;
  @Input() lng: number | undefined;
  @Input() lat: number | undefined;
  @Input() image_Path: string | undefined;

  //////////////////

  @Input() categoryName: string | undefined;
  @Input() categoryDesc: string | undefined;
  @Input() marketID: string | undefined;

  
  constructor( private router: Router, private toastr: ToastrService, public market: MarketService, public store: StoreService , public category: CategoryService , private http: HttpClientModule  , public dialog: MatDialog , public image:ImagesService) { }


  ngOnInit(): void {
  this.market.getAllmarkets();
  let id: any = localStorage.getItem('AdminloadedMarketId');
    this.market.loadMarket(id);
  }

  loadMarket(id: number){

    this.market.loadMarket(id);
    localStorage.setItem('AdminloadedMarketId', id.toString());
    this.router.navigate(["Admin/Stores"]);
  }


  

  //////////// Create \\\\\\\\\\\


  createform: FormGroup = new FormGroup({

    marketName: new FormControl('', [Validators.required]),
    marketDesc: new FormControl('', [Validators.required]),
    marketType: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    lng: new FormControl('', [Validators.required]),
    lat: new FormControl('', [Validators.required]),
    image_Path:  new FormControl('', [Validators.required]),
  });

  openCreate() {

    const dialogRef = this.dialog.open(this.CallCreate ,{

            width: '30%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  saveMarket(){
    let body = this.createform.value;
    body.image_Path = this.image.displayImage;
    this.market.createMarket(body);
    window.location.reload();

  }



  //////////// Delete \\\\\\\\\\\\\
  
  
  openDelete(id: number) {

    const dialogRef1 = this.dialog.open(this.CallDelete ,{

      width: '35%'
});

    dialogRef1.afterClosed().subscribe((result) => {

      if (result != undefined) {

        if (result == 'yes') {

          this.market.deleteMarket(id);

          window.location.reload();
          window.location.reload();


        }
        else if (result == 'no'){
        
          this.toastr.info("You Canceled the Delete");
        } 

      }  
       
      })
  }


  //////////// Edit \\\\\\\\\\\\\

  updateform: FormGroup = new FormGroup({

    id: new FormControl('', [Validators.required]),
    marketName: new FormControl('', [Validators.required]),
    marketDesc: new FormControl('', [Validators.required]),
    marketType: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    lng: new FormControl('', [Validators.required]),
    lat: new FormControl('', [Validators.required]),
    image_Path:  new FormControl('', [Validators.required]),

  })

  previous_data: any = {}; // empty obj

  openUpdate(Newid: any , NewmarketName: any, NewmarketDesc: any, NewmarketType: any, Newlocation: any , NewImage: any , newlng:any , newlat:any) {

    this.previous_data = {

      id : Newid,
      marketName: NewmarketName,
      marketDesc: NewmarketDesc,
      marketType: NewmarketType,
      location: Newlocation,
      image_Path: NewImage,
      lng: newlng,
      lat:newlat

    }
    this.updateform.controls['id'].setValue(this.previous_data.id);

    this.dialog.open(this.callUpdate ,{
      width: '30%'
});

  }

  updateMarket() {

    let body = this.updateform.value;
    if(this.image.displayImage !=null && this.image.displayImage !='')
    body.image_Path = this.image.displayImage;
    else body.image_Path =this.updateform.controls['image_Path'].value
    this.market.updateMarket(body);
    window.location.reload();
  }

  
  //////////// Create Category \\\\\\\\\\\


  createform1: FormGroup = new FormGroup({

    categoryName: new FormControl('', [Validators.required]),
    categoryDesc: new FormControl('', [Validators.required]),
    marketID:   new FormControl('', [Validators.required]),

  });

  openCreateCategory(id: any , marketN: any ) {

    this.marketID =id;
    this.marketName = marketN;

    const dialogRef = this.dialog.open(this.CallCreateCategory ,{
            width: '30%'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
     
    });
  }

  saveCategory(){

    this.category.createCategory(this.createform1.value);
    window.location.reload();
   }


   UploadImage(image:any){
    if(image.length === 0) return;
    let imageUploaded = <File>image[0];
    const formData = new FormData();
    formData.append('file',imageUploaded, imageUploaded.name);
    this.image.UploadImage(formData);
  }


}
