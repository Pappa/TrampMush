import * as bodyParser from "body-parser";
import * as methodOverride from "method-override";
import * as express from "express";
import * as path from "path";
import { SSE } from "./middleware/sse.middleware";

export class Server {

  public app: express.Application;

  public static bootstrap(): Server {
    return new Server();
  }

  constructor() {
    this.app = express();

    this.config();
    this.routes();
    this.api();
  }

  private api() {
    // Tweets SSE endpoint
    this.app.get('/tweets', SSE.getTweetStream);
  }

  private config() {
    // static paths
    this.app.use(express.static(path.join(__dirname, "../client")));
    this.app.use("/node_modules", express.static(path.join(__dirname, "../../node_modules")));

    // middleware
    this.app.use(bodyParser.json());
    this.app.use(methodOverride());
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));

    // 404
    this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
        err.status = 404;
        next(err);
    });
  }

  private routes() {
    let router: express.Router;
    router = express.Router();
    this.app.use(router);
  }

}