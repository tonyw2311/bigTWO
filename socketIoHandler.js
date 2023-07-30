import { Server } from 'socket.io';

export default function injectSocketIO(server) {
    const io = new Server(server);

    io.use((socket, next) => {
        const sessionID = socket.handshake.auth.sessionID;
        if (sessionID) {
            // find existing session
            const session = sessionStore.findSession(sessionID);
            if (session) {
                socket.sessionID = sessionID;
                socket.userID = session.userID;
                socket.username = session.username;
                return next();
            }
        }
        const username = socket.handshake.auth.username;
        if (!username) {
            return next(new Error("invalid username"));
        }
        // create new session
        socket.sessionID = randomId();
        socket.userID = randomId();
        socket.username = username;
        next();
    });

    io.on('connection', (socket) => {
        let username = `User ${Math.round(Math.random() * 999999)}`;
        
        socket.emit("session", {
            sessionID: socket.sessionID,
            userID: socket.userID,
        });

        socket.emit('name', username);

        socket.on('message', (message) => {
            io.emit('message', {
                from: username,
                message: message,
                time: new Date().toLocaleString()
            });
        });
    });

    console.log('SocketIO injected');
}