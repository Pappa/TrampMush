import * as express from "express";
import * as request from "request";

export class Flickr {

	private readonly REST_API = "https://api.flickr.com/services/rest/";
	private readonly API_KEY = process.env.FLICKR_API_KEY;
	private readonly METHOD = "flickr.photos.search";
	private readonly OPTIONS = "&format=json&per_page=1&media=photos&extras=[url_m]";

	public getImage = (req: express.Request, res: express.Response, next: express.NextFunction) => {
	    let q = encodeURI(req.query.q);
	    let url = `${this.REST_API}?method=${this.METHOD}&api_key=${this.API_KEY}&text=${q}${this.OPTIONS}`;

	    request.get(url, (error: any, response: request.RequestResponse, body: any) => {
	      res.write(body);
	      res.end();
	    });
	}

}