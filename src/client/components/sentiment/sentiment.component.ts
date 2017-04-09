import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style } from '@angular/animations';

import { TweetEvents } from "../../modules/core/events/TweetEvents";
import { TweetState } from "../../modules/core/state/TweetState";
import { TweetStateUpdates } from "../../modules/core/state/TweetStateUpdates";
import * as Models from '../../modules/core/models/Models';

@Component({
	moduleId: module.id,
	selector: 'sentiment',
	templateUrl: 'sentiment.component.html',
	animations: [
		trigger('pulseState', [
			state('inactive', style({transform: 'translateX(0) scale(1)'})),
			state('active',   style({transform: 'translateX(0) scale(1.1)'}))
		])
	]
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
		if (state.tweet && this.text !== state.tweet.text) {
			this.text = state.tweet.text;
			this.tweetEvents.requests.getSentiment.next(this.text);
		}
	}

	setSentimentClass() {
		if (this.sentiment && this.sentiment.sentiment) {
			return "sentiment-" + this.sentiment.sentiment.toLowerCase();
		}
		return "sentiment-neutral";
	}
}
