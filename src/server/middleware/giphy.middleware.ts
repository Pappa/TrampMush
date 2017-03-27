import * as express from "express";
import * as request from "request";

export class Giphy {

	public getGif = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    var q = encodeURI(req.query.q);
    var url = `http://api.giphy.com/v1/gifs/search?q=${q}&api_key=${process.env.GIPHY_API_KEY}`;

    request.get(url, (error: any, response: request.RequestResponse, body: any) => {
      res.write(body);
      res.end();
    });

	}

}