import { Component, OnInit, OnDestroy } from '@angular/core';

import { ImageEvents } from "../../modules/core/events/ImageEvents";
import { TweetState } from "../../modules/core/state/TweetState";
import { ImageState } from "../../modules/core/state/ImageState";
import { TweetStateUpdates } from "../../modules/core/state/TweetStateUpdates";
import { ImageStateUpdates } from "../../modules/core/state/ImageStateUpdates";
import * as Models from '../../modules/core/models/Models';

@Component({
  moduleId: module.id,
  selector: 'image',
  templateUrl: 'image.component.html'
})
export class ImageComponent implements OnInit, OnDestroy {

	trimmedTweetText: string;
	image: Models.Image;
	
	constructor(
		private imageEvents: ImageEvents,
		private tweetStateUpdates: TweetStateUpdates,
		private imageStateUpdates: ImageStateUpdates
	) {}

	ngOnInit() {
		this.tweetStateUpdates.subject.subscribe(this.onTweetStateUpdate.bind(this));
		this.imageStateUpdates.subject.subscribe(this.onImageStateUpdate.bind(this));
	}

	ngOnDestroy() {
		this.tweetStateUpdates.subject.unsubscribe();
		this.imageStateUpdates.subject.unsubscribe();
	}

	onTweetStateUpdate(state: TweetState) {
		if (state.trimmedTweetText && this.trimmedTweetText !== state.trimmedTweetText) {
			this.trimmedTweetText = state.trimmedTweetText;
			this.imageEvents.requests.getImage.next(this.trimmedTweetText);
		}
	}

	onImageStateUpdate(state: ImageState) {
		this.image = state.image;
	}
}
