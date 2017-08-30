import { Injectable } from '@angular/core';
//import { IEmployee, IState } from '../models/interfaces';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class GetLocalJsonData {
    _baseUrl: string = 'assets/data/';
    //employees: IEmployee[];
    //states: IState[];
    data;
    constructor(private http: Http) { }

    getFile(filePath): Observable<any> {
            return this.http.get(this._baseUrl + filePath)
                .map((res: Response) => {
                    this.data = res.json();
                    return this.data;
                })
                .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}