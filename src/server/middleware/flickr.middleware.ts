import * as express from "express";
import * as request from "request";

export class Flickr {

	private readonly REST_API = "https://api.flickr.com/services/rest/";
	private readonly API_KEY = process.env.FLICKR_API_KEY;
	private readonly METHOD = "flickr.photos.search";
	private readonly OPTIONS = "&format=json&per_page=1&media=photos&extras=url_m&nojsoncallback=1";

	public getImage = (req: express.Request, res: express.Response, next: express.NextFunction) => {
	    let q = encodeURI(req.query.q);
	    let url = `${this.REST_API}?method=${this.METHOD}&api_key=${this.API_KEY}&text=${q}${this.OPTIONS}`;

	    request.get(url, (error: any, response: request.RequestResponse, body: any) => {
	    	let flickerResponse = JSON.parse(response.body);
	    	let url = (flickerResponse.photos.photo[0] && flickerResponse.photos.photo[0].url_m) ? flickerResponse.photos.photo[0].url_m : null;
	    	let result = {
	    		url: url
	    	};
	      res.write(JSON.stringify(result));
	      res.end();
	    });
	}

}