import { NgModule }      from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent }  from '../../components/app/app.component';
import { SentimentComponent }  from '../../components/sentiment/sentiment.component';
import { TweetComponent }  from '../../components/tweet/tweet.component';
import { ImageComponent }  from '../../components/image/image.component';

import { CoreModule } from "../core/core.module";

@NgModule({
  imports: [
  	HttpModule,
  	BrowserModule,
    CoreModule,
    BrowserAnimationsModule
  ],
  declarations: [ 
  	AppComponent, 
  	SentimentComponent,
    TweetComponent,
    ImageComponent
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
