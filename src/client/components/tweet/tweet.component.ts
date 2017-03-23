import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';

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
		private zone: NgZone,
		private tweetStateUpdates: TweetStateUpdates
	) {}

	ngOnInit() {
		this.tweetStateUpdates.subject.subscribe(this.onTweetStateUpdate.bind(this));
	}

	ngOnDestroy() {
		this.tweetStateUpdates.subject.unsubscribe();
	}

	onTweetStateUpdate(state: TweetState) {
		// TODO: investigate NgZone workaround
		// Should this be required, or is Angular
		// ignoring async events from an EventSource?
		this.zone.run(() => {
			this.tweet = state.tweet;
		});
	}
}
