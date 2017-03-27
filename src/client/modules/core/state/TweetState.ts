import { Injectable } from '@angular/core';
import * as Models from '../models/Models';

@Injectable()
export class TweetState {

    //tweet: Models.Tweet;
    tweet: any;
    sentiment: Models.Sentiment;
    error: Models.Error;

    constructor() {
    }

    public setTweet(tweet: any): void {
        this.tweet = tweet;
    }

    public setSentiment(sentiment: Models.Sentiment): void {
        this.sentiment = sentiment;
    }

    public setError(error: Models.Error): void {
        this.error = error;
    }

}