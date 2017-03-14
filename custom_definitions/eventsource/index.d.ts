declare enum ReadyState {
	CONNECTING = 0,
	OPEN,
	CLOSED
}

interface EventSourceConfig {
    withCredentials?: boolean;
}

interface EventSource extends EventTarget {
    readonly readyState: ReadyState;
    readonly url: string;
    readonly withCredentials: boolean;
    onopen: () => any;
    onmessage: (e: MessageEvent) => any;
    onerror: ErrorEventHandler;
    close: () => void;
}

declare var EventSource: {
    prototype: EventSource;
    new (url: string, configuration?: EventSourceConfig): EventSource;
}