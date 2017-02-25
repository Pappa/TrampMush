import * as Rx from "@reactivex/rxjs";
import {angular} from "angular";

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

    static $inject = [
        "$http"
    ];

    constructor(
        private $http: ng.IHttpService
    ) { 
        this.initGetSentiment();
    }

    private initGetSentiment(): void {
        this.requests.getSentiment
        .flatMap((search: string) => {
            return Rx.Observable.fromPromise(
                this.$http({
                    url: 'https://community-sentiment.p.mashape.com/text/',
                    data: `txt=${search}`,
                    method: 'POST',
                    headers: {
                      "X-Mashape-Key": "v8g0kwCaRYmshfcFjZxZlsVFYmP2p1OcS7WjsntSZ9GWy7E4Pb",
                      "Content-Type": "application/x-www-form-urlencoded",
                      "Accept": "application/json"
                    }
                  })
            ).catch((response: Models.Response<Models.Error>): any => {
                this.responses.getSentimentError.onNext(response.data);
                return Rx.Observable.empty();
            })
        })
        .map((response: Models.Response<Models.Sentiment>): Models.Sentiment => {
            return response.data;
        })
        .subscribe((result) => {
            this.responses.getSentimentSuccess.onNext(result);
        });
    }


}

angular.module("tm.core.events")
    .service("TweetEvents", TweetEvents);