import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import {TweetState} from "./TweetState";
import {TweetEvents} from "../events/TweetEvents";
import * as Models from "../models/Models";

@Injectable()
export class TweetStateUpdates {

    subject: Rx.BehaviorSubject<TweetState>;
    tweetEvents: TweetEvents;
    tweetState: TweetState;

    constructor(
        tweetState: TweetState,
        tweetEvents: TweetEvents
    ) {

        this.subject = new Rx.BehaviorSubject(tweetState);

        this.tweetEvents.responses.getSentimentSuccess
            .subscribe((sentiment: Models.Sentiment) => {
                this.tweetState.setSentiment(sentiment);
                this.subject.next(this.tweetState);
            });

        this.tweetEvents.responses.getSentimentError
            .subscribe((error: Models.Error) => {
                this.tweetState.setSentiment(null);
                this.tweetState.setError(error);
                this.subject.next(this.tweetState);
            });

    }
}