import { Injectable } from '@angular/core';
import * as Models from '../models/Models';

@Injectable()
export class TweetState {

    tweets: Models.Tweet[];
    sentiment: Models.Sentiment;
    error: Models.Error;

    constructor() {
    }

    public setTweets(tweets: Models.Tweet[]): void {
        this.tweets = tweets;
    }

    public setSentiment(sentiment: Models.Sentiment): void {
        this.sentiment = sentiment;
    }

    public setError(error: Models.Error): void {
        this.error = error;
    }

}