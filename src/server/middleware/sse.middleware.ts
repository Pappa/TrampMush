import * as express from "express";
import { ServerConfig } from "../config/server.config";
import { ApiConfig } from "../config/api.config";
import { EventEmitter } from "events";

export class ServerSentEvents extends EventEmitter {

  constructor() {
    super();
    return this;
  }

	public getTweetStream = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    req.socket.setTimeout(1000 * 60 * 60);

    res.writeHead(200, ServerConfig.SSE_HEADERS);
    res.write('\n');

    this.on('message', this.sendEvent.bind(this, res));

    this.tempGenerateTweets();
	}

  private sendEvent = (res: express.Response, event: any) => {
    res.write('event: message\n');
    res.write(`data: ${event}\n\n`);
  }

  private tempGenerateTweets = () => {
    setInterval(() => {
      var event = Math.random().toString(36).substring(7);
      this.emit('message', event);
    }, 10000);
  }

}