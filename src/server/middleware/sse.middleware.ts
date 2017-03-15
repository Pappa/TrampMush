import * as express from "express";
import { Config } from "../config/server.config";

export class SSE {

	public static getTweetStream(req: express.Request, res: express.Response, next: express.NextFunction) {

      req.socket.setTimeout(1000 * 60 * 60);

      res.writeHead(200, Config.server.SSE_HEADERS);
      res.write('\n');

      setInterval(() => {
        var s = Math.random().toString();
        console.log(s);
        res.write('event: message\n');
        res.write('data: ' + s + '\n\n');
      }, 5000);

	}

}