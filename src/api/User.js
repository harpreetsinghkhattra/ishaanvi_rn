import { Socket } from './Socket';
import { Helper } from '../helper/Helper';
import { edit_user_profile } from './SocketUrls';

const RESPONSE = {
    success: {
        code: 1,
        message: "Success"
    }
}

var socket;
export class User {

    constructor(io) {
        socket = io;
    }

    static editUserSocketResponse = (cb) => {
        const { on } = edit_user_profile
        socket.once(on, cb);
    }

    static getSocketResponseOnce = (on, cb) => {
        socket.once(on, cb);
    }

    static getSocketResponse = (on, cb) => {
        socket.once(on, cb);
    }
}
