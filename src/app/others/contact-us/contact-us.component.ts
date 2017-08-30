import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, EmailValidator } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

export class ContactUs {

    constructor(
        public firstName: string = '',
        public lastName: string = '',
        public emailId: string = '',
        public phone: string = '',
        public queryFor: string = '',
        public query: string = ''
        //public alterEgo?: string
    ) {  }

}
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
    private headers = new Headers({'Content-Type': 'x-www-form-urlencoded'});
    submitted = false;
    model;
    successMsg;
  constructor(private http: Http) { }

  ngOnInit() {
      this.model = new ContactUs();
  }
    submitForm(isValid){
        if(isValid){
            this.http.get(environment.apiHost+'/api/web/contactform',{params:this.model})
                .subscribe((response) => {
                    this.submitted = true;
                    if(response){
                        this.successMsg = response.json().message;
                    }
                });
        }
    }
}
