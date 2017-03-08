import { NgModule }      from '@angular/core';

import { TweetState } from "./state/TweetState";
import { TweetStateUpdates } from "./state/TweetStateUpdates";
import { TweetEvents } from "./events/TweetEvents";

@NgModule({
  providers: [
  	TweetState, 
  	TweetStateUpdates, 
  	TweetEvents
  ]
})
export class CoreModule { }
