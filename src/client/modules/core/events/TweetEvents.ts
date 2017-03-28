import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs, Headers } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { Subscriber } from 'rxjs/Subscriber';
import * as Models from '../models/Models';
import { EventSourceUtil } from "../util/EventSourceUtil";
import { TweetUtil } from "../util/TweetUtil";

@Injectable()
export class TweetEvents {

    actions = {
        clickPicture: new Subject<void>()
    }

    requests = {
        getSentiment: new Subject<string>()
    }

    responses = {
        getSentimentSuccess: new Subject<Models.Sentiment>(),
        getSentimentError: new Subject<Models.Error>(),
        getTweetStreamSuccess: new Subject<Models.Tweet>()
    }

    constructor(
        private http: Http,
        private eventSourceUtil: EventSourceUtil,
        private tweetUtil: TweetUtil
    ) { 
        this.initGetSentiment();
        this.initGetTweetStream();
    }

    private initGetSentiment(): void {
        this.requests.getSentiment
        .concatMap((search: string) => {
            let headers = new Headers();
            headers.append("Content-Type", "application/x-www-form-urlencoded");
            headers.append("Accept", "application/json");
            return this.http.post(
                '/sentiment',
                `txt=${search}`,
                { headers: headers }
            ).catch((response: Response) => {
                this.responses.getSentimentError.next(response.json());
                return Observable.empty();
            })
        })
        .map((response: Response): Models.Sentiment => {
            return response.json().result;
        })
        .subscribe((result) => {
            this.responses.getSentimentSuccess.next(result);
        });
    }

    private initGetTweetStream(): void {
        this.eventSourceUtil.fromEventSource("/tweets")
        .filter(this.tweetUtil.filterUnwantedTweets)
        .throttleTime(30000)
        // TODO: tweet mapper
        //.map(this.tweetMapper.MessageEvent_Tweet)
        .subscribe(tweet => {
            this.responses.getTweetStreamSuccess.next(tweet);
        });
    }
}