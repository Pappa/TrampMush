import { Injectable } from '@angular/core';
import * as Models from '../models/Models';

@Injectable()
export class GiphyState {

    giphy: Models.Giphy;

    constructor() {
    }

    public setGiphy(giphy: Models.Giphy): void {
        this.giphy = giphy;
    }

}