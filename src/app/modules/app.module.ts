import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from '../components/app.component';

import { TweetState } from "../core/state/TweetState";
import { TweetStateUpdates } from "../core/state/TweetStateUpdates"
import { TweetEvents } from "../core/events/TweetEvents";

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent ],
  providers:    [ TweetState, TweetStateUpdates, TweetEvents ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
