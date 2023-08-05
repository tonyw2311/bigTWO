import { Server } from 'socket.io';

export default function injectSocketIO(server) {
    const io = new Server(server);
    let sequenceNumberByClient = new Array();

    /*     io.use((socket, next) => {
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
        }); */

    io.on('connection', (socket) => {
        let username = `User ${Math.round(Math.random() * 999999)}`;

        socket.join(socket.id);
        sequenceNumberByClient.push(socket.id);
        console.log(sequenceNumberByClient)
        socket.on("disconnect", () => {
            sequenceNumberByClient.pop(socket.id)
            console.info(`Client gone [id=${socket.id}]`);
        });

        /*         socket.emit("session", {
                    sessionID: socket.sessionID,
                    userID: socket.userID,
                }); */

        socket.emit('name', socket.id);
        socket.emit('playedCards', {
            cards: 'none',
            turn: sequenceNumberByClient[0]
        })

        socket.on('message', (message) => {
            io.emit('message', {
                from: username,
                message: message,
                time: new Date().toLocaleString()
            });
        });

        socket.on('playedCards', (card) => {
            console.log(card)
            io.emit('playedCards', { cards: card, turn: sequenceNumberByClient[0] })
        })

        let distributedCards;
        socket.on('distributeCards', async (cards) => {
            distributedCards = await shuffle()
            for (let i = 0; i < sequenceNumberByClient.length; i++) {
                //socket.broadcast.to(sequenceNumberByClient[i]).emit('cards', distributedCards.splice(-13));
                console.log(distributedCards)
                io.to(`${sequenceNumberByClient[i]}`).emit('cards', distributedCards.splice(-13));
                //io.emit('cards', distributedCards.splice(-13))
            }
            //io.emit('distributedCards', distributedCards)

        })
    });

    console.log('SocketIO injected');
}

async function shuffle() {
    const array = [
        '1_spades',
        '2_spades',
        '3_spades',
        '4_spades',
        '5_spades',
        '6_spades',
        '7_spades',
        '8_spades',
        '9_spades',
        '10_spades',
        '11_spades',
        '12_spades',
        '13_spades',

        '1_hearts',
        '2_hearts',
        '3_hearts',
        '4_hearts',
        '5_hearts',
        '6_hearts',
        '7_hearts',
        '8_hearts',
        '9_hearts',
        '10_hearts',
        '11_hearts',
        '12_hearts',
        '13_hearts',

        '1_clubs',
        '2_clubs',
        '3_clubs',
        '4_clubs',
        '5_clubs',
        '6_clubs',
        '7_clubs',
        '8_clubs',
        '9_clubs',
        '10_clubs',
        '11_clubs',
        '12_clubs',
        '13_clubs',

        '1_diamonds',
        '2_diamonds',
        '3_diamonds',
        '4_diamonds',
        '5_diamonds',
        '6_diamonds',
        '7_diamonds',
        '8_diamonds',
        '9_diamonds',
        '10_diamonds',
        '11_diamonds',
        '12_diamonds',
        '13_diamonds',
    ]
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}
