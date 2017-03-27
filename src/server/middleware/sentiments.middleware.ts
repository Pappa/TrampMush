import * as express from "express";
import * as request from "request";
import { ServerConfig } from "../config/server.config";
import { ApiConfig } from "../config/api.config";

export class Sentiments {

	public getSentiment = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    var options = {
      url: "https://community-sentiment.p.mashape.com/text/",
      headers: {
        "X-Mashape-Key": process.env.MASHAPE_API_KEY,
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json"
      },
      body: `txt=${req.body.txt}`
    };

    request.post(options, (error: any, response: request.RequestResponse, body: any) => {
      res.write(body);
      res.end();
    });

	}

}