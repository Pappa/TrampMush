import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class EventSourceUtil {

	public fromEventSource(url: string, openObserver?: () => void): Observable<Event> {
		return new Observable<Event>((observer: Observer<Event>) => {
			const subscriber = new Subscriber(openObserver);
			const source = new EventSource(url);

			source.onopen = (e: Event) => {
				subscriber.next(e);
				subscriber.complete();
			};

			source.onmessage = (e: MessageEvent) => {
				observer.next(JSON.parse(e.data));
			};

			source.onerror = (e: Event) => {
				if (source.readyState === EventSource.CLOSED) {
					return observer.complete();
				}
				return observer.error(e);
			};

			return () => {
				source.close();
			};
		});
    }

}