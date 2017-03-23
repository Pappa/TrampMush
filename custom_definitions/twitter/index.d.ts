interface twitter {
    get(url: any, params: any, callback: any): any;
    post(url: any, params: any, callback: any): any;
    stream(method: any, params: any, callback: any): any;
}

declare var twitter: {
    prototype: twitter;
    new (options: any): twitter;
}