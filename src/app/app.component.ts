import { Component, ElementRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {Chart , registerables} from 'chart.js'
import { ProductService } from './services/product.service';
import jsPDF from 'jspdf';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Tahaluf.Market';

  constructor( public product: ProductService  ){

    Chart.register(...registerables)
  }

  @ViewChild('content', { static: false }) el!: ElementRef;


  makePdf() {
    let pdf = new jsPDF()
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save("sample.pdf")
      }
    })
  }



}

