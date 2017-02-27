import Rx from 'rxjs/Rx';
import {angular} from "angular";
import {TweetState} from "./TweetState"
import {TweetEvents} from "../events/TweetEvents"

export class TweetStateUpdates {

    subject: Rx.BehaviorSubject<TweetState>;
    TweetEvents: TweetEvents;
    TweetState: TweetState;

    constructor(
        TweetState: TweetState,
        TweetEvents: TweetEvents
    ) {

        this.subject = new Rx.BehaviorSubject(TweetState);

        this.TweetEvents.responses.getSentimentSuccess
            .subscribe((sentiment: Models.Sentiment) => {
                this.TweetState.setSentiment(sentiment);
                this.subject.next(this.TweetState);
            });

        this.TweetEvents.responses.getSentimentError
            .subscribe((error: Models.Error) => {
                this.TweetState.setSentiment(null);
                this.TweetState.setError(error);
                this.subject.next(this.TweetState);
            });

    }
}

angular.module("state")
    .service("TweetStateUpdates", TweetStateUpdates);