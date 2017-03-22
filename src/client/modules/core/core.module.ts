import { NgModule }      from '@angular/core';

import { TweetState } from "./state/TweetState";
import { TweetStateUpdates } from "./state/TweetStateUpdates";
import { TweetEvents } from "./events/TweetEvents";
import { EventSourceUtil } from "./util/EventSourceUtil";

@NgModule({
  providers: [
	TweetState,
	TweetStateUpdates,
	TweetEvents,
	EventSourceUtil
  ]
})
export class CoreModule { }
