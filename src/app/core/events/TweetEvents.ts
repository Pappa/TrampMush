import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs, Headers } from '@angular/http';
import * as Rx from 'rxjs/Rx';
import * as Models from '../models/Models';

@Injectable()
export class TweetEvents {

    actions = {
        clickPicture: new Rx.Subject<void>()
    }

    requests = {
        getSentiment: new Rx.Subject<string>()
    }

    responses = {
        getSentimentSuccess: new Rx.Subject<Models.Sentiment>(),
        getSentimentError: new Rx.Subject<Models.Error>()
    }

    constructor(
        private http: Http
    ) { 
        this.initGetSentiment();
    }

    private initGetSentiment(): void {
        this.requests.getSentiment
        .flatMap((search: string) => {
            let headers = new Headers();
            headers.append("X-Mashape-Key", "v8g0kwCaRYmshfcFjZxZlsVFYmP2p1OcS7WjsntSZ9GWy7E4Pb");
            headers.append("Content-Type", "application/x-www-form-urlencoded");
            headers.append("Accept", "application/json");
            return this.http.post(
                'https://community-sentiment.p.mashape.com/text/',
                `txt=${search}`,
                { headers: headers }
            ).catch((response: Response) => {
                this.responses.getSentimentError.next(response.json());
                return Rx.Observable.empty();
            })
        })
        .map((response: Response): Models.Sentiment => {
            return response.json().result;
        })
        .subscribe((result) => {
            this.responses.getSentimentSuccess.next(result);
        });
    }
}