import EventEmitter from "events";


enum WebSocketReadyState {
    CONNECTING = 0,
    OPEN = 1,
    CLOSING = 2,
    CLOSED = 3
}

export enum SocketEvent {
    INIT = 'reload-chat',
    APPOINTMENT_READY = 'joined',
    EPISODE_CLOSED = 'episode-closed',
    MESSAGE_RECEIVED = 'chat-message',
}

export interface ISocketMessage {
    id: any;
    episode_id: number,
    object_type: 'message' | string,
    object_id: string,
    object_time: string,
    display_time: string,
    sub_type: null,
    to: number, // episode id
    from: number, // user id
    sender_id: number, // user id
    payload_type: 'text' | string,
    payload: string | any,
}

export class SocketMessage implements ISocketMessage {
    id: any;
    episode: any;
    status: any;
    episode_id: any;
    object_type: any;
    object_id: any;
    payload_type: any;
    sender_id!: number;
    payload: any;
    object_time: any;
    display_time: any;
    sub_type: null = null;
    to!: number;
    from!: number;

    constructor(data: any) {
        Object.assign(this, data);
    }

    public isEventEpisodeClosed(episodeId?:number) {
        return (
            this.episode
            && Object.keys(this.episode).length > 0
            && this.episode.id
            && this.episode_id === (episodeId ?? this.episode_id)
            && this.status === 'closed'
        );
    }

    public isEventEpisodeChat(episodeId?: number) {
        let destination = (episodeId ?? this.episode_id);
        return (
            this.episode_id === destination
            && this.object_type
            && this.object_type === 'message'
            && this.payload_type === 'text'
        );
    }

    public isEventDoctorJoined(episodeId?: number) {
        return (
            this.episode_id === (episodeId ?? this.episode_id)
            && this.object_type
            && this.object_type === 'message'
            && this.payload_type === 'json'
            && this.payload
            && this.payload._
            && this.payload._.body
            && this.payload._.body.key === 'appointments_others_isready'
        );
    }
}

export class SocketService<T = SocketMessage> {

    private _socket!: WebSocket;
    public eventEmitter: EventEmitter = new EventEmitter();

    public onMessage?: (message: T) => void;

    public messages: SocketMessage[] = [];
    private _queue: SocketMessage[] = [];

    private _keepAliveInterval: any;

    constructor(accessToken: string) {
        this.init(accessToken);
    }

    public init(accessToken: string) {
        const socketUrl = `${process.env.REACT_APP_MYDOC_SOCKET_URL}/${accessToken}`;
        this._socket = new WebSocket(socketUrl);

        this._socket.onerror = (event: any) => {
            console.log('SocketService error:', event);
        }

        // set connection open handler to keep alive and process user message queue
        this._socket.onopen = (event: any) => {
            this._initKeepAliveInterval(accessToken);
            this._processQueue();
        };

        // set message handler
        this._socket.onmessage = (event: any) => {

            // TODO: Fix the socket server.
            // This message processing is wrapped in setTimeout() because
            // the socket server is sending 2 onmessage event for each message.
            // By adding 1000ms delay, we can drop the duplicate event.
            setTimeout((socket) => {
                const newMessage = new SocketMessage(JSON.parse(event.data));

                // remove new message from send queue
                socket._queue = socket._queue.filter(pending => pending.object_id !== newMessage.object_id);

                // find whether the message already exists
                const exists = socket.messages.find(message => message.object_id === newMessage.object_id);

                if (!exists) {
                    console.log('SocketService::SocketMessage', newMessage.payload);
                    socket.messages.push(newMessage);
                    socket.messages = socket.messages.sort((a, b) => a.id - b.id);
                    socket.onMessage && socket.onMessage(newMessage as any as T);
                    socket.eventEmitter.emit(SocketEvent.MESSAGE_RECEIVED, newMessage as any as T);
                }
            }, 1000, this);
        };

        // set close handler
        this._socket.onclose = (event: any) => {
            // TODO: Do something
        };
    }

    public sendMessage(accessToken: string, episodeId: number, episodeChatId: string, fromUserId: number, fromChatId: string, message: string): void {
        const toMessage = {
            episode_id: episodeId,
            object_type: 'message',
            object_id: this.UUID(),
            object_time: new Date(),
            display_time: new Date(),
            sub_type: null,
            to: episodeChatId,
            from: fromChatId,
            sender_id: fromUserId,
            payload_type: 'text',
            payload: message,
        };
        if (!(this._socket.readyState === WebSocketReadyState.OPEN)) {
            if ([WebSocketReadyState.CLOSING, WebSocketReadyState.CLOSED].includes(this._socket.readyState)) {
                this.init(accessToken);
            }
        }
        const socketMessage = new SocketMessage(toMessage);
        this._queue.push(socketMessage);
        this._socket.send(JSON.stringify(toMessage));
    }

    public UUID(): string {
        let dt = new Date().getTime();
        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
            /[xy]/g,
            (c) => {
                // tslint:disable-next-line: no-bitwise
                const r = (dt + Math.random() * 16) % 16 | 0;
                dt = Math.floor(dt / 16);
                // tslint:disable-next-line: triple-equals // tslint:disable-next-line: no-bitwise
                return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
            }
        );
        return uuid;
    }

    private _initKeepAliveInterval(accessToken: string): void {

        // clear existing interval
        if (this._keepAliveInterval) clearInterval(this._keepAliveInterval);

        // set up new interval
        this._keepAliveInterval = setInterval(() => {
            if ([WebSocketReadyState.CLOSING, WebSocketReadyState.CLOSED].includes(this._socket.readyState)) {
                this.init(accessToken);
            } else if (this._socket.readyState === WebSocketReadyState.OPEN) {
                this._socket.send('');
            }
        }, 40000);
    }

    private _processQueue() {
        this._queue.forEach((message) => {
            this._socket.send(JSON.stringify(message));
        });
    }

    /**
     * fetchLatestMessage
     */
    // public fetchLatestMessage(episodeId) {
    //     const fetchPayload = {
    //         'exhaustive?': false,
    //         fetch_object: episodeId,
    //         fetch_type: "more",
    //         object_id: this.create_UUID(),
    //         object_type: "fetch",
    //         page: 1,
    //     };
    //     this.socket.send(JSON.stringify(fetchPayload));
    // }
}
