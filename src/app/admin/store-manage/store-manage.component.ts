import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.service';
import { ImagesService } from 'src/app/services/images.service';
import { MarketService } from 'src/app/services/market.service';
import { ProductService } from 'src/app/services/product.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-store-manage',
  templateUrl: './store-manage.component.html',
  styleUrls: ['./store-manage.component.css']
})
export class StoreManageComponent implements OnInit {

  @ViewChild('CallCreate') CallCreate!: TemplateRef<any>
  @ViewChild('CallDelete') CallDelete!: TemplateRef<any>
  @ViewChild('callUpdate') callUpdate!: TemplateRef<any>

  @ViewChild('CallDeleteCategory') CallDeleteCategory!: TemplateRef<any>
  @ViewChild('callUpdateCategory') callUpdateCategory!: TemplateRef<any>


  

  @Input() id: number | undefined;
  @Input() storeName: string | undefined;
  @Input() storeDesc: string | undefined;
  @Input() currenT_DISCOUNT: number | undefined;
  @Input() categoryID: number | undefined;
  @Input() imagePath: string | undefined;


  
  constructor(public store: StoreService, public market: MarketService, public image:ImagesService , public product: ProductService, public category: CategoryService, private router: Router , private http: HttpClientModule  , public dialog: MatDialog , private toastr: ToastrService) { }

  
  ngOnInit(): void {
    let id: any = localStorage.getItem('AdminloadedMarketId');
    this.market.loadMarket(id);
  }

  loadStore(id: number){

    this.store.loadStore(id);
    localStorage.setItem('AdminloadedStoretId', id.toString());
    this.router.navigate(["Admin/Products"]); 
  }


  //////////// Create \\\\\\\\\\\


  createform: FormGroup = new FormGroup({

    storeName: new FormControl('', Validators.required),
    storeDesc: new FormControl('', Validators.required),
    currenT_DISCOUNT: new FormControl('', Validators.required),
    categoryID: new FormControl('', Validators.required),
    imagePath:  new FormControl('', [Validators.required]),

  });

  openCreate() {

    const dialogRef = this.dialog.open(this.CallCreate ,{
            width: '30%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  saveStore(){
    let body = this.createform.value;
    body.image_Path = this.image.displayImage;
    this.store.createStore(body);
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

          this.store.deleteStore(id);

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
    storeName: new FormControl('', [Validators.required]),
    storeDesc: new FormControl('', [Validators.required]),
    currenT_DISCOUNT: new FormControl('', [Validators.required]),
    categoryID: new FormControl('', [Validators.required]),
    imagePath:  new FormControl('', [Validators.required]),

  })

  previous_data: any = {}; // empty obj

  openUpdate(Newid: any , NewStoreName: any, NewStoreDesc: any, NewStoreType: any, NewCategoryId: any , NewimagePath: any) {

    this.previous_data = {

      id : Newid,
      storeName: NewStoreName,
      storeDesc: NewStoreDesc,
      currenT_DISCOUNT: NewStoreType,
      categoryID: NewCategoryId,
      imagePath: NewimagePath,

    }
    this.updateform.controls['id'].setValue(this.previous_data.id);

    this.dialog.open(this.callUpdate ,{
      width: '30%'
    });

  }

  
  updateStore() {
    let body = this.updateform.value;
    if(this.image.displayImage !=null && this.image.displayImage !='')
    body.image_Path = this.image.displayImage;
    else body.image_Path =this.updateform.controls['imagePath'].value
    this.store.updateStore(body);
    window.location.reload();
  }




  //////////// Delete Category \\\\\\\\\\\\\
  
  
  openDeleteCategory(id: number) {

    const dialogRef1 = this.dialog.open(this.CallDeleteCategory ,{

      width: '35%'
});

    dialogRef1.afterClosed().subscribe((result) => {

      if (result != undefined) {

        if (result == 'yes') {

          this.category.deleteCategory(id);

          window.location.reload();
          window.location.reload();
        }
        else if (result == 'no'){
          this.toastr.info("You Canceled the Delete");
        } 

      }  
       
      })
  }


  //////////// Edit Category \\\\\\\\\\\\\

  updateform1: FormGroup = new FormGroup({

    id: new FormControl('', [Validators.required]),
    categoryName: new FormControl('', [Validators.required]),
    categoryDesc: new FormControl('', [Validators.required]),

  })

  previous_data1: any = {}; // empty obj

  openUpdate1(Newid: any , NewCategoryName: any, NewCategoryDesc: any) {

    this.previous_data1 = {

      id : Newid,
      categoryName: NewCategoryName,
      categoryDesc: NewCategoryDesc,

    }
    this.updateform1.controls['id'].setValue(this.previous_data1.id);

    this.dialog.open(this.callUpdateCategory ,{
      width: '30%'
    });

  }

  
  updateStore1() {
    this.category.updateCategory(this.updateform1.value);
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
