import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs, Headers } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';
import { Subscriber } from 'rxjs/Subscriber';
import * as Models from '../models/Models';

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
        getSentimentError: new Subject<Models.Error>()
    }

    constructor(
        private http: Http
    ) { 
        this.initGetSentiment();
        this.initGetTweetStream();
    }

    /*private fromEventSource(url: string, openObserver: Function | null): Observable {
      return new Observable(observer => {
        const open = new Subscriber(openObserver);
        const source = new EventSource(url);

        const onOpen = event => {
          open.next(event);
          open.complete();
        };

        const onError = event => {
          if (event.readyState === EventSource.CLOSED) {
            observer.complete();
          } else {
            observer.error(event);
          }
        };

        const onMessage = event => {
          observer.next(event.data);
        };

        source.addEventListener('open', onOpen, false);
        source.addEventListener('error', onError, false);
        source.addEventListener('message', onMessage, false);

        return () => {
          source.removeEventListener('open', onOpen, false);
          source.removeEventListener('error', onError, false);
          source.removeEventListener('message', onMessage, false);
          source.close();
        };
      });
    }*/

    private initGetSentiment(): void {
        this.requests.getSentiment
        .concatMap((search: string) => {
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
        var evtSource = new EventSource("/tweets");
        evtSource.onopen = (e: Event) => {
            console.log("open", e);
        }
        evtSource.onmessage = (e: MessageEvent) => {
            console.log("message", e);
        }
        evtSource.onerror = (e: Event) => {
            console.log("error", e);
        }
    }
}