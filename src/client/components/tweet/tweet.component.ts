import { Component, OnInit, OnDestroy } from '@angular/core';

import { TweetState } from "../../modules/core/state/TweetState";
import { TweetStateUpdates } from "../../modules/core/state/TweetStateUpdates";

@Component({
  moduleId: module.id,
  selector: 'tweet',
  templateUrl: 'tweet.component.html'
})
export class TweetComponent implements OnInit, OnDestroy {

	tweet: string;
	
	constructor(
		private tweetStateUpdates: TweetStateUpdates
	) {}

	ngOnInit() {
		this.tweetStateUpdates.subject.subscribe(this.onTweetStateUpdate.bind(this));
	}

	ngOnDestroy() {
		this.tweetStateUpdates.subject.unsubscribe();
	}

	onTweetStateUpdate(state: TweetState) {
		console.log(state.tweet);
		this.tweet = state.tweet;
	}
}
