export = twitter;

declare class twitter {
    constructor(options: any);

    get(url: any, params: any, callback: any): any;

    post(url: any, params: any, callback: any): any;

    stream(method: any, params: any, callback: any): any;

}