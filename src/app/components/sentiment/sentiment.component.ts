import { Component, OnInit, OnDestroy } from '@angular/core';

import { TweetEvents } from "../../core/events/TweetEvents";
import * as Models from '../../core/models/Models';

@Component({
  moduleId: module.id,
  selector: 'sentiment',
  templateUrl: 'sentiment.component.html'
})
export class SentimentComponent implements OnInit, OnDestroy {

	text: string;
	sentiment: Models.Sentiment;
	
	constructor(private tweetEvents: TweetEvents) {}

	ngOnInit() {
		this.tweetEvents.responses.getSentimentSuccess.subscribe(this.onSentiment.bind(this));
		this.tweetEvents.responses.getSentimentError.subscribe(this.onSentimentError.bind(this));
		this.text = "my monkey is nice";
		this.tweetEvents.requests.getSentiment.next(this.text);
	}

	ngOnDestroy() {
		this.tweetEvents.responses.getSentimentSuccess.unsubscribe();
		this.tweetEvents.responses.getSentimentSuccess.subscribe();
	}

	onSentiment(sentiment: Models.Sentiment) {
		this.sentiment = sentiment;
	}

	onSentimentError(error: Models.Error) {
		console.log("onSentimentError", error);
	}
}
