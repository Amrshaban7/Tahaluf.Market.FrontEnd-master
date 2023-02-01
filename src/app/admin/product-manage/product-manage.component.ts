import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ImagesService } from 'src/app/services/images.service';
import { MarketService } from 'src/app/services/market.service';
import { ProductService } from 'src/app/services/product.service';
import { ProductsService } from 'src/app/services/products.service';
import { SectionService } from 'src/app/services/section.service';
import { StoreService } from 'src/app/services/store.service';


@Component({
  selector: 'app-product-manage',
  templateUrl: './product-manage.component.html',
  styleUrls: ['./product-manage.component.css']
})
export class ProductManageComponent implements OnInit {

  
  @ViewChild('CallDelete') CallDelete!: TemplateRef<any>
  @ViewChild('callUpdate') callUpdate!: TemplateRef<any>
  // Section
  @ViewChild('CallCreateSection') CallCreateSection!: TemplateRef<any>
  @ViewChild('CallDeleteSection') CallDeleteSection!: TemplateRef<any>
  @ViewChild('callUpdateSection') callUpdateSection!: TemplateRef<any>




  @Input() id: number | undefined;
  @Input() productName: string | undefined;
  @Input() productDesc: string | undefined;
  @Input() price: number | undefined;
  @Input() sectionID: number | undefined;

  //////////////////

  @Input() sectionName: string | undefined;
  @Input() sectionDesc: string | undefined;
  @Input() storeID: string | undefined;
  @Input() storeName: string | undefined;



  constructor(public store: StoreService, public product: ProductService, private router: Router , private http: HttpClientModule  , public dialog: MatDialog , private toastr: ToastrService , public section: SectionService, public image:ImagesService) { }


  ngOnInit(): void {
    let id: any = localStorage.getItem('AdminloadedStoretId');
    this.store.loadStore(id);
  }


// (keydown)="Search($event)"

   Search(event: any) {

    let productName = event.target.value
    if (productName !== "") {

      this.product.getAllProducts();
    }
    else {
      this.product.GetProductByName(productName);
    }
  }


  //////////// Create \\\\\\\\\\\

  
  createform: FormGroup = new FormGroup({

    productName: new FormControl('', [Validators.required]),
    productDesc: new FormControl('', [Validators.required]),
    price:       new FormControl('', [Validators.required]),
    sectionID:   new FormControl('', [Validators.required]),

  });


 
  saveProduct(){    
    let body = this.createform.value;
    body.image_Path = this.image.displayImage;
    this.product.createProduct(body);
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

          this.product.deleteProduct(id);

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

    id:          new FormControl('', [Validators.required]),
    productName: new FormControl('', [Validators.required]),
    productDesc: new FormControl('', [Validators.required]),
    price:       new FormControl('', [Validators.required]),
    sectionID:   new FormControl('', [Validators.required]),
    image_Path:   new FormControl('', [Validators.required]),

  })

  previous_data: any = {}; // empty obj

  openUpdate(Newid: any , NewProductName: any, NewProductDesc: any, NewProductType: any, NewsectionID: any, NewImage:any) {

    this.previous_data = {

      id : Newid,
      productName: NewProductName,
      productDesc: NewProductDesc,
      price: NewProductType,
      sectionID: NewsectionID,
      image_Path: NewImage
    }
    this.updateform.controls['id'].setValue(this.previous_data.id);

    this.dialog.open(this.callUpdate ,{
      width: '30%'
});

  }

  updateProduct() {
    let body = this.updateform.value;
    if(this.image.displayImage !=null && this.image.displayImage !='')
    body.image_Path = this.image.displayImage;
    else body.image_Path =this.updateform.controls['image_Path'].value
    this.product.updateProduct(body);
    window.location.reload();
  }


  //////////// Create Section \\\\\\\\\\\

  createform1: FormGroup = new FormGroup({

    sectionName: new FormControl('', Validators.required),
    sectionDesc: new FormControl('', Validators.required),
    storeID:     new FormControl('', Validators.required),

  });

  openCreateSection(id:any , storeN:any ) {

    this.storeID = id;
    this.storeName = storeN;

    const dialogRef = this.dialog.open(this.CallCreateSection ,{
            width: '30%'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  saveSection(){
    this.section.createSection(this.createform1.value);
    window.location.reload();
  }


  //////////// Delete Section \\\\\\\\\\\\\
  
  
  openDeleteSection(id: number) {

    const dialogRef1 = this.dialog.open(this.CallDeleteSection ,{

      width: '35%'
});

    dialogRef1.afterClosed().subscribe((result) => {

      if (result != undefined) {

        if (result == 'yes') {

          this.section.deleteSections(id);

          window.location.reload();
          window.location.reload();
        }
        else if (result == 'no'){
          this.toastr.info("You Canceled the Delete");
        } 

      }  
       
      })
  }
  
  
  //////////// Edit Section \\\\\\\\\\\\\

  updateform1: FormGroup = new FormGroup({

    id: new FormControl('', [Validators.required]),
    sectionName: new FormControl('', [Validators.required]),
    sectionDesc: new FormControl('', [Validators.required]),

  })

  previous_data1: any = {}; // empty obj

  openUpdate1(Newid: any , NewSectionName: any, NewSectionDesc: any) {

    this.previous_data1 = {

      id : Newid,
      sectionName: NewSectionName,
      sectionDesc: NewSectionDesc,
    }

    this.updateform1.controls['id'].setValue(this.previous_data1.id);

    this.dialog.open(this.callUpdateSection ,{
      width: '30%'
    });

  }
  
  updateSection1() {
    this.section.updateSection(this.updateform1.value);
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
