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
	}

	ngOnDestroy() {
		this.tweetStateUpdates.subject.unsubscribe();
	}

	onTweetStateUpdate(state: TweetState) {
		this.sentiment = state.sentiment;
		if (this.text !== state.tweet) {
			this.text = state.tweet;
			this.tweetEvents.requests.getSentiment.next(this.text);
		}
	}
}
