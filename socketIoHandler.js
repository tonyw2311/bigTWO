// Import the Server class from the 'socket.io' library
import { Server } from 'socket.io';

// Export a function that injects Socket.IO into the provided server instance
export default function injectSocketIO(server) {
    // Create a new instance of the Socket.IO server using the provided HTTP server
    const io = new Server(server);
    // Initialize an array to store sequence numbers associated with clients
    let sequenceNumberByClient = new Array();

    // Event listener for new connections to the main namespace
    io.on('connection', (socket) => {
        // Add the client's socket ID to the sequenceNumberByClient array
        sequenceNumberByClient.push(socket.id);
        console.log(sequenceNumberByClient);

        // Event listener for when a client disconnects
        socket.on("disconnect", () => {
            // Remove the client's socket ID from the sequenceNumberByClient array
            sequenceNumberByClient.pop(socket.id);
            console.info(`Client gone [id=${socket.id}]`);
        });

        // Event listener for 'groupID' message from a client
        socket.on('groupID', CODE => {
            // Check if the room with the given CODE exists
            if (io.sockets.adapter.rooms.get(CODE)) {
                // Check if the room is not full (max 4 clients)
                if (io.sockets.adapter.rooms.get(CODE).size < 4) {
                    socket.join(CODE); // Add the client to the room
                } else {
                    let user = io.sockets.sockets.get(socket.id);
                    if (user) {
                        // If room is full, emit a message to the client
                        user.emit('groupID', 'Room is full');
                    }
                }
            } else {
                socket.join(CODE); // Create the room and add the client to it
            }
        });


    socket.emit('name', socket.id);
    socket.emit('playedCards', {
        cards: 'none',
        turn: sequenceNumberByClient[0]
    })

    socket.on('playedCards', (data) => {
        let players = Array.from(io.sockets.adapter.rooms.get(data.code))
        let currentIndex = players.indexOf(data.user);
        let nextIndex = ++currentIndex % players.length
        console.log(players)
        io.to(data.code).emit('playedCards', { cards: data.cards, turn: players[nextIndex] })
    })

    let distributedCards;
    let players;
    socket.on('distributeCards', async (code) => {
        distributedCards = await shuffle()
        players = Array.from(io.sockets.adapter.rooms.get(code))
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
