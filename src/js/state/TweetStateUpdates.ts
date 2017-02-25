
module TM.Core.State {
    angular.module("tm.core.state").factory(
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
                subject.onNext(TweetState);
            });

            TweetEvents.results.getSentimentError
            .subscribe((error: Models.Error) => {
                TweetState.setSentiment({});
                TweetState.setError(error);
                subject.onNext(TweetState);
            });
            
            return subject;
        }
    );
}