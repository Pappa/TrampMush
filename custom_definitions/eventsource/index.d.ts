declare enum ReadyState { CONNECTING = 0, OPEN = 1, CLOSED = 2 }

interface EventSourceConfig {
    withCredentials?: boolean;
}

interface EventSourceInstance extends EventTarget {
    readonly readyState: ReadyState;
    readonly url: string;
    readonly withCredentials: boolean;
    onopen: () => any;
    onmessage: (e: MessageEvent) => any;
    onerror: ErrorEventHandler;
    close: () => void;
}

export interface EventSource {
    new (url: string, configuration?: EventSourceConfig): EventSourceInstance;
}

/*declare var eventSource: EventSource;

export default eventSource;*/