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
    object_time: Date,
    display_time: Date,
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
    sender_id: any;
    payload: any;
    object_time!: Date;
    display_time!: Date;
    sub_type: null = null;
    to!: number;
    from!: number;

    constructor(data: any) {
        Object.assign(this, data);
    }

    public isEventEpisodeClosed(episodeId:number) {
        return this.episode
            && Object.keys(this.episode).length > 0
            && this.episode.id
            && this.episode.id === episodeId
            && this.status === 'closed';
    }

    public isEventEpisodeChat(episodeId: number) {
        return this.episode_id === episodeId &&
        this.object_type &&
        this.object_type === 'message' &&
        this.payload_type === 'text'
    }

    public isEventDoctorJoined(episodeId: number) {
        return this.episode_id === episodeId &&
            this.object_type &&
            this.object_type === 'message' &&
            this.payload_type === 'json' &&
            this.payload &&
            this.payload._ &&
            this.payload._.body &&
            this.payload._.body.key === 'appointments_others_isready'
    }

}

export class SocketService {

    private _socket!: WebSocket;
    public eventEmitter: EventEmitter = new EventEmitter();
    public messages: SocketMessage[] = [];
    private _queue: SocketMessage[] = [];
    public episodeId!: number;
    public doctorEpisodeId!: number;

    private _keepAliveInterval: any;

    constructor(accessToken: string, episodeId: number, doctorEpisodeId: number) {
        // do nothing
        this.episodeId = episodeId;
        this.doctorEpisodeId = doctorEpisodeId;
        this.init(accessToken);
    }

    public init(accessToken: string) {
        const socketUrl = `${process.env.REACT_APP_MYDOC_SOCKET_URL}/${accessToken}`;
        this._socket = new WebSocket(socketUrl);
        this._socket.onopen = (event: any) => {
            console.log('socket-open');
            this._initKeepAliveInterval(accessToken);
            this._processQueue();
            if (this.messages.length > 0) {
                this.eventEmitter.emit(SocketEvent.INIT);
            }
        };
        this._socket.onmessage = (event: any) => {
            const newMessage = new SocketMessage(JSON.parse(event.data));
            if (newMessage.isEventDoctorJoined(this.doctorEpisodeId))
                this.eventEmitter.emit(SocketEvent.APPOINTMENT_READY, newMessage);

            if (newMessage.isEventEpisodeClosed(this.episodeId))
                this.eventEmitter.emit(SocketEvent.EPISODE_CLOSED, newMessage);

            if (newMessage.isEventEpisodeChat(this.episodeId)) {
                // remove new message from send queue
                this._queue = this._queue.filter(pending => pending.object_id !== newMessage.object_id);

                const found = this.messages.find(message => message.object_id === newMessage.object_id);

                if (!found) {
                    this.messages.push(newMessage);
                    this.messages = this.messages.sort((a, b) => a.id - b.id);
                    this.eventEmitter.emit(SocketEvent.MESSAGE_RECEIVED, newMessage);
                }
            }

        };
        this._socket.onclose = (event: any) => {
            console.log('websocket closed successfully');
        };
    }

    public sendMessage(accessToken: string, episodeId: number, episodeChatId: number, fromUserId: number, fromChatId: number, message: string): void {
        const toMessage = new SocketMessage({
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
        });
        if (!(this._socket.readyState === WebSocketReadyState.OPEN)) {
            if ([WebSocketReadyState.CLOSING, WebSocketReadyState.CLOSED].includes(this._socket.readyState)) {
                this.init(accessToken);
            }
        }
        this.messages.push(toMessage);
        this._queue.push(toMessage);
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
                return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
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
        }, 10000);
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
