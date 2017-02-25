import * as Rx from "@reactivex/rxjs";
import {angular} from "angular";

angular.module("core.state").factory(
    "TweetStateUpdates", 
    (
        TweetState,
        TweetEvents
    ) => {

        var subject = new Rx.BehaviorSubject(TweetState);

        TweetEvents.actions.clickPicture
            .subscribe(() => {
                TweetState.doSomething();
            });

        TweetEvents.results.getSentimentSuccess
            .subscribe((sentiment: Models.Sentiment) => {
                TweetState.setSentiment(sentiment);
                subject.next(TweetState);
            });

        TweetEvents.results.getSentimentError
            .subscribe((error: Models.Error) => {
                TweetState.setSentiment({});
                TweetState.setError(error);
                subject.next(TweetState);
            });
        
        return subject;
    }
);