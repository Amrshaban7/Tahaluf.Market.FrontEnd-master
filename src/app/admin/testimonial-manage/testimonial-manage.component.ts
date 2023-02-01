import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TestimonialService } from 'src/app/services/testimonial.service';
import { UserdataService } from 'src/app/services/userdata.service';

@Component({
  selector: 'app-testimonial-manage',
  templateUrl: './testimonial-manage.component.html',
  styleUrls: ['./testimonial-manage.component.css']
})
export class TestimonialManageComponent implements OnInit {

  @ViewChild('CallDelete') CallDelete!: TemplateRef<any>
  @ViewChild('callUpdate') callUpdate!: TemplateRef<any>

  
  constructor( public testimonial: TestimonialService , public userData:UserdataService , private router: Router , private http: HttpClientModule  , public dialog: MatDialog , private toastr: ToastrService) { }

  ngOnInit(): void {

    this.testimonial.GetTestimonialByUser();

  }


  

  @Input() testimonialId: number | undefined;
  @Input() testemoniaL_BODY: string | undefined;
  @Input() status: string | undefined;
  @Input() fName: string | undefined;
  @Input() lName: string | undefined;
  @Input() roleName: string | undefined;
  @Input() imagePath: string | undefined;

  

  //////////// Delete \\\\\\\\\\\\\
  
  
  openDelete(id: number) {

    const dialogRef1 = this.dialog.open(this.CallDelete ,{

      width: '35%'
});

    dialogRef1.afterClosed().subscribe((result) => {

      if (result != undefined) {

        if (result == 'yes') {

          this.testimonial.deleteTestimonial(id);

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
    fName: new FormControl('', [Validators.required]),
    lName: new FormControl('', [Validators.required]),
    testemoniaL_BODY: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    roleName: new FormControl('', [Validators.required]),
    userId: new FormControl('', [Validators.required]),


  })

  
  previous_data: any = {}; // empty obj

  openUpdate(Newid: any , NewfName:any , NewlName:any , NewtestemoniaL_BODY:any , Newstatus: any , NewroleName :any , NewuserId :any ) {

    this.previous_data = {

      id : Newid,
      fName : NewfName,
      lName : NewlName,
      testemoniaL_BODY : NewtestemoniaL_BODY,
      status: Newstatus,
      roleName : NewroleName,
      userId : NewuserId

    }

    this.updateform.controls['id'].setValue(this.previous_data.id);

    this.dialog.open(this.callUpdate ,{

      width: '30%'
});

  }

  updateTestimonial() {

    this.testimonial.updateTestimonial(this.updateform.value);
    window.location.reload();
  }

  

}
