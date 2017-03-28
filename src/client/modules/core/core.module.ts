import { NgModule }      from '@angular/core';

import { TweetState } from "./state/TweetState";
import { TweetStateUpdates } from "./state/TweetStateUpdates";
import { TweetEvents } from "./events/TweetEvents";

import { GiphyState } from "./state/GiphyState";
import { GiphyStateUpdates } from "./state/GiphyStateUpdates";
import { GiphyEvents } from "./events/GiphyEvents";

import { EventSourceUtil } from "./util/EventSourceUtil";
import { TweetUtil } from "./util/TweetUtil";

@NgModule({
  providers: [
	TweetState,
	TweetStateUpdates,
	TweetEvents,
	GiphyState,
	GiphyStateUpdates,
	GiphyEvents,
	EventSourceUtil,
	TweetUtil
  ]
})
export class CoreModule { }
