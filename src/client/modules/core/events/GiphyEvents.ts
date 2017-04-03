import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';
import * as Models from '../models/Models';

@Injectable()
export class GiphyEvents {

    requests = {
        getGiphy: new Subject<string>()
    }

    responses = {
        getGiphySuccess: new Subject<Models.Giphy>(),
        getGiphyError: new Subject<Models.Error>()
    }

    constructor(
        private http: Http
    ) { 
        this.initGetGiphy();
    }

    private initGetGiphy(): void {
        this.requests.getGiphy
        .concatMap((search: string) => {
            return this.http.get(`/giphy?q=${search}`)
                .catch((response: Response) => {
                    this.responses.getGiphyError.next(response.json());
                    return Observable.empty();
                })
        })
        .map((response: Response): Models.Giphy[] => {
            return response.json().data
                .filter((giphy: Models.Giphy): boolean => {
                    let fixedWidth = giphy.images.fixed_width;
                    return fixedWidth.width >= fixedWidth.height;
                });
        })
        .subscribe((result: Models.Giphy[]) => {
            this.responses.getGiphySuccess.next(result[0]);
        });
    }
}