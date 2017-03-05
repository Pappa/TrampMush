import { NgModule }      from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from '../components/app/app.component';
import { SentimentComponent }  from '../components/sentiment/sentiment.component';

import { TweetState } from "../core/state/TweetState";
import { TweetStateUpdates } from "../core/state/TweetStateUpdates";
import { TweetEvents } from "../core/events/TweetEvents";

@NgModule({
  imports: [
  	HttpModule,
  	BrowserModule
  ],
  declarations: [ 
  	AppComponent, 
  	SentimentComponent 
  ],
  providers: [
  	TweetState, 
  	TweetStateUpdates, 
  	TweetEvents
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
