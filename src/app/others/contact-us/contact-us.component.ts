import { Component, OnInit,HostBinding } from '@angular/core';
import { FormGroup, FormBuilder, Validators, EmailValidator  } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Headers, Http } from '@angular/http';
import { fadeInAnimation } from '../../animations';

import 'rxjs/add/operator/toPromise';

export class ContactUs {

    constructor(
        public firstName: string = '',
        public lastName: string = '',
        public emailId: string = '',
        public phone: number = null,
        public queryFor: string = '',
        public query: string = ''
    ) {  }

}
export class NewsLetter {

    constructor(
        public name: string = '',
        public email: string = '',
        public type="What's the Buzz?",
        public tnc:boolean = true
    ) {  }

}
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
   animations: [fadeInAnimation]
})
export class ContactUsComponent implements OnInit {
    private headers = new Headers({'Content-Type': 'x-www-form-urlencoded'});
    submitted = false;
    nsSubmitted = false;
    model;
    nsModel;
    submitEr:boolean = false;
    nsSubmitEr:boolean = false;
    successMsg;
    isLoading=false;
      @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'relative';
  constructor(private http: Http) { }

  ngOnInit() {
      this.model = new ContactUs();
      this.nsModel = new NewsLetter();
  }
    submitForm(isValid){
        if(isValid){
            this.isLoading = true;
            this.http.get(environment.apiHost+'/api/web/contactform',{params:this.model})
                .subscribe((response) => {
                    this.isLoading = false;
                    this.submitted = true;
                    let data = response.json();
                    this.submitEr = !data.result;
                   // if(data.result){
                        this.successMsg = data.message;
                    //}
                });
        }
    }
    submitNewsLetter(isValid){
        this.nsSubmitted=false;
        if(isValid){
            this.isLoading = true;
            this.http.post(environment.apiHost+'/api/web/newsletter',this.nsModel)
                .subscribe((response) => {
                    this.nsSubmitted = true;
                    this.isLoading = false;
                    let data = response.json();
                    this.nsSubmitEr = !data.result;
                    //if(data.result){
                        this.successMsg = data.message;
                    //}

                    //this.nsModel = new NewsLetter();
                });
        }
    }
}
