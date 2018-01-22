import { Component, OnInit, Input, ViewChild,ElementRef  } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ModalDirective } from 'ngx-bootstrap/modal';

declare let jsPDF;
declare let html2pdf;
@Component({
  selector: 'app-prod-header',
  templateUrl: './prod-header.component.html',
  styleUrls: ['./prod-header.component.scss']
})
export class ProdHeaderComponent implements OnInit {
@ViewChild('prdData') el: ElementRef;
@Input() productData = null;
@Input() breadcrumb = null;
@Input() currentURL = null;
@Input() specifications = null;


    buyFormSubmitted=false;

@ViewChild('buyOnlineModal') public buyOnlineModal:ModalDirective;
bgImgNum =0;
    req;
    reader;
  constructor() { }

  ngOnInit() {
      if(this.productData)
      this.bgImgNum = this.productData.id % 3;
  }
    openForm(){
        this.buyFormSubmitted = false;
        this.buyOnlineModal.show();
    }
    saveAsPDF3(){
        if(jsPDF) {
            let self = this;
            let pdf = new jsPDF('l', 'pt', 'a4');
            let elementHandler = {
                '#ignorePDF': function (element, renderer) {
                    return true;
                }
            };
            let margins = {
                top: 20,
                bottom: 60,
                left: 40,
                width: 522
            };
            pdf.fromHTML(
                this.el.nativeElement,
                margins.left, // x coord
                margins.top, { // y coord
                    'width': margins.width, // max width of content on PDF
                    'elementHandlers': elementHandler
                },

                function (dispose) {
                    // dispose: object with X, Y of the last line add to the PDF
                    //          this allow the insertion of new lines after html
                   // pdf.text(self.productData.name,450,80);
                   // pdf.text(self.productData.price,450,120);
                    var col = ["Specs", "Values"];
                    var rows = [];

                    for(var key of self.specifications){
                        var temp = [key.type, key.description];
                        rows.push(temp);
                    }

                    pdf.autoTable(col, rows,{startY:dispose.y+10});

                    pdf.save(self.productData.name+'.pdf');

                }, margins);


        }

        }
    saveAsPDF1(){
        if(jsPDF) {
            let self = this;
            let pdf = new jsPDF('l', 'pt', 'a4');
            let elementHandler = {
                '#ignorePDF': function (element, renderer) {
                    return true;
                }
            };
            let margins = {
                top: 80,
                bottom: 60,
                left: 40,
                width: 522
            };
            pdf.addHTML(
                this.el.nativeElement,
                margins.left, // x coord
                margins.top, { // y coord
                    'width': margins.width, // max width of content on PDF
                    'elementHandlers': elementHandler
                },

                function (dispose) {
                    // dispose: object with X, Y of the last line add to the PDF
                    //          this allow the insertion of new lines after html
                    var col = ["Details", "Values"];
                    var rows = [];

                    for(var key of self.specifications){
                        var temp = [key.type, key.description];
                        rows.push(temp);
                    }

                    pdf.autoTable(col, rows,{startY:dispose.y+10});

                    pdf.save(self.productData.name+'.pdf');

                }, margins);


        }

    }

    saveAsPDF() {
        if(jsPDF && html2pdf) {
            let self = this;
            html2pdf(this.el.nativeElement, {
                margin: 3,
                filename: self.productData.name+'.pdf',
                image: {type: 'jpeg', quality: 1},
                html2canvas: {dpi: 192, letterRendering: true},
                jsPDF: {unit: 'pt', format: 'a4', orientation: 'portrait'}
            });
        }

    }

    pdfRocket() {
        var self = this;

       // self.save = savePdf;
        self.req = new XMLHttpRequest();

        var url = "http://api.html2pdfrocket.com/pdf";
        var apiKey = "edb0c941-ad82-41fd-91b5-10ea113316bb";

        // Additional parameters can be added here
        var data = "apikey=" + apiKey + "&value=" + encodeURIComponent(this.el.nativeElement.innerHTML);

        self.req.onload = function(event) {
            self.reader = new FileReader();

            self.reader.addEventListener("loadend", function() {

                // Open in new tab
                window.open(self.reader.result, "_blank");

                // return data URI
                return self.reader.result;
            });

            self.reader.readAsDataURL(self.req.response);
        };

        self.req.open("POST", url, true);
        self.req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        self.req.responseType = "blob";

        self.req.send(data);
    }
}
