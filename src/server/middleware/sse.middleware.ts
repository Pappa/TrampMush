import * as express from "express";
import { ServerConfig } from "../config/server.config";
import { ApiConfig } from "../config/api.config";
import { EventEmitter } from "events";
import { TwitterApi } from "../modules/twitterApi";

export class ServerSentEvents extends EventEmitter {

  twitterApi: TwitterApi;

  constructor() {
    super();
    return this;
  }

	public getTweetStream = (req: express.Request, res: express.Response, next: express.NextFunction) => {

    req.socket.setTimeout(1000 * 60 * 60);

    res.writeHead(200, ServerConfig.SSE_HEADERS);
    res.write('\n');

    this.connectToStream(res);
	}

  private sendEvent = (res: express.Response, tweet: any) => {
    res.write('event: message\n');
    res.write(`data: ${JSON.stringify(tweet)}\n\n`);
  }

  private connectToStream = (res: express.Response) => {
    this.twitterApi = new TwitterApi();
    this.twitterApi.connectToStream(
      ApiConfig.TWITTER_STREAM_URL, 
      ApiConfig.TWITTER_SEARCH_OPTIONS
    );
    //this.twitterApi.on('error', this.twitterApi.disconnect.bind(this.twitterApi));
    this.twitterApi.on('error', console.log.bind(console, "error"));
    this.twitterApi.on('tweet', this.sendEvent.bind(this, res));
  }

}