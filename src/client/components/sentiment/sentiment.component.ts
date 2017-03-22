import { Component, OnInit, OnDestroy } from '@angular/core';

import { TweetEvents } from "../../modules/core/events/TweetEvents";
import { TweetState } from "../../modules/core/state/TweetState";
import { TweetStateUpdates } from "../../modules/core/state/TweetStateUpdates";
import * as Models from '../../modules/core/models/Models';

@Component({
  moduleId: module.id,
  selector: 'sentiment',
  templateUrl: 'sentiment.component.html'
})
export class SentimentComponent implements OnInit, OnDestroy {

	text: string;
	sentiment: Models.Sentiment;
	
	constructor(
		private tweetEvents: TweetEvents,
		private tweetStateUpdates: TweetStateUpdates
    ) {}

	ngOnInit() {
		this.tweetStateUpdates.subject.subscribe(this.onTweetStateUpdate.bind(this));
		this.text = "my monkey is nice";
		this.tweetEvents.requests.getSentiment.next(this.text);
	}

	ngOnDestroy() {
		this.tweetStateUpdates.subject.unsubscribe();
	}

	onTweetStateUpdate(state: TweetState) {
		this.sentiment = state.sentiment;
		console.log(state);
	}
}
