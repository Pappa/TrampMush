import { NgModule }      from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from '../../components/app/app.component';
import { SentimentComponent }  from '../../components/sentiment/sentiment.component';
import { TweetComponent }  from '../../components/tweet/tweet.component';
import { GiphyComponent }  from '../../components/giphy/giphy.component';

import { CoreModule } from "../core/core.module";

@NgModule({
  imports: [
  	HttpModule,
  	BrowserModule,
    CoreModule
  ],
  declarations: [ 
  	AppComponent, 
  	SentimentComponent,
    TweetComponent,
    GiphyComponent
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
