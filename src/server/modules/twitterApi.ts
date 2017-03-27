import { Twitter } from 'twitter';
import { EventEmitter } from "events";

export class TwitterApi extends EventEmitter {

	private client: Twitter;
	private stream: any;

	constructor() {
		super();
		this.client = new Twitter({
			consumer_key: <string>process.env.TWITTER_CONSUMER_KEY,
			consumer_secret: <string>process.env.TWITTER_CONSUMER_SECRET,
			access_token_key: <string>process.env.TWITTER_ACCESS_TOKEN_KEY,
			access_token_secret: <string>process.env.TWITTER_ACCESS_TOKEN_SECRET
		});
		return this;
	}

	connectToStream = (path: string, params: any) => {
		this.client.stream(path, params, (stream: any) => {
			this.stream = stream;
			this.stream.on('data', this.emit.bind(this, 'tweet'));
			this.stream.on('error', this.emit.bind(this, 'error'));
		});
	}

	disconnect = () => {
		this.stream.destroy();
	}

}