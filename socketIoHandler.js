// Import the Server class from the 'socket.io' library
import { Server } from 'socket.io';

// Export a function that injects Socket.IO into the provided server instance
export default function injectSocketIO(server) {
    // Create a new instance of the Socket.IO server using the provided HTTP server
    const io = new Server(server);

    let nameArr = new Array();

    // Event listener for new connections to the main namespace
    io.on('connection', (socket) => {
        socket.emit('name', socket.id);
        let userName = [];
        io.on("name", (name) => {
            userName = name;

        })

        socket.on("disconnect", () => {
            nameArr = nameArr.filter(e => e.substr(0, 20) !== socket.id)
            console.info(`Client gone [id=${socket.id}]`);
        });

        // Event listener for 'groupID' message from a client
        socket.on('groupID', CODE => {
            // Check if the room with the given CODE exists
            let room = io.sockets.adapter.rooms.get(CODE)
            if (room) {
                // Check if the room is not full (max 4 clients)
                if (room.size < 4) {
                    socket.join(CODE); // Add the client to the room
                    io.to(CODE).emit('players', Array.from(room))
                } else {
                    let user = io.sockets.sockets.get(socket.id);
                    if (user) {
                        // If room is full, emit a message to the client
                        user.emit('groupID', 'Room is full');
                        io.to(CODE).emit('players', Array.from(room))
                    }
                }
            } else {
                socket.join(CODE); // Create the room and add the client to it
            }
        });

        socket.on('lessThanFive', data => {
            io.to(data.CODE).emit('lessThanFive', data.lessThanFivers)
        })

        socket.on('set-your-name', data => {
            nameArr.push(socket.id + data.name)
            console.log(data.username)
            io.to(data.CODE).emit('set-your-name', {
                username: data.username,
                arr: nameArr,
            })
        })

        let players;
        socket.on('playedCards', (data) => {
            players = Array.from(io.sockets.adapter.rooms.get(data.code))
            let currentIndex = players.indexOf(data.user);
            let nextIndex = ++currentIndex % players.length
            console.log(players)
            if (data.playedName) {
                io.to(data.code).emit('playedCards', { cards: data.cards, playerName: data.playedName, turn: players[nextIndex], skippedTurn: data.skippedTurn })
            }
            else { io.to(data.code).emit('playedCards', { cards: data.cards, playerName: data.user, turn: players[nextIndex], skippedTurn: data.skippedTurn }) }
        })

        /*         socket.on('isStarted', (data)=>{
                    io.to(data.CODE).emit('isStarted', )
                }) */
        socket.on('winner', (data) => {
            io.to(data.CODE).emit('winner', data.username);
        })

        socket.on('distributeCards', async (code) => {
            let players = Array.from(io.sockets.adapter.rooms.get(code))
            let distributedCards = await shuffle()
            io.to(code).emit('isStarted', true)
            io.to(code).emit('playedCards', {
                cards: null,
                turn: players[0]
            })

            for (let i = 0; i < Math.min(4, players.length); i++) {
                console.log(distributedCards)
                let user = io.sockets.sockets.get(players[i])
                if (user) {
                    user.emit('cards', distributedCards.splice(-13));
                }
            }
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
