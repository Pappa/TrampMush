import { Injectable } from '@angular/core';
import * as Models from '../models/Models';

@Injectable()
export class TweetUtil {

	public filterUnwantedTweets = (tweet: Models.Tweet): boolean => {
    	if (!tweet || !tweet.text) {
    		return false;
    	}
		const MIN_TWEET_SIZE = 10;
		let trimmedTweetText = this.trimTweetText(tweet.text);
		return trimmedTweetText.length >= MIN_TWEET_SIZE;
    }

    public trimTweetText = (text: string): string => {
    	if (!text) {
    		return '';
    	}
    	let rt = /^RT/;
		let handle = /@[a-z0-9]+/gi;
		let http = /http[^ ]+/g;
		return text.replace(http, '').replace(rt, '').replace(handle, '');
	}

}