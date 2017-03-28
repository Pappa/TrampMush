import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { GiphyState } from "./GiphyState";
import { GiphyEvents } from "../events/GiphyEvents";
import * as Models from "../models/Models";

@Injectable()
export class GiphyStateUpdates {

    public subject: BehaviorSubject<GiphyState>;

    constructor(
        private giphyState: GiphyState,
        private giphyEvents: GiphyEvents
    ) {

        this.subject = new BehaviorSubject(giphyState);

        this.giphyEvents.responses.getGiphySuccess
            .subscribe((giphy: Models.Giphy) => {
                this.giphyState.setGiphy(giphy);
                this.subject.next(this.giphyState);
            });

        this.giphyEvents.responses.getGiphyError
            .subscribe((error: Models.Error) => {
                this.giphyState.setGiphy(null);
                this.subject.next(null);
            });

    }
}