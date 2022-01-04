export default class Log {
    token: string;
    constructor(token: string);
    track(event_name: string, params: any, callback: any): void;
    request(url: string, callback: any): void;
}
