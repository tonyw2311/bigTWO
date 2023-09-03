import ioClient from 'socket.io-client';

const ENDPOINT = import.meta.env.VITE_UNSECURE_SECRET;

//const socket = ioClient(ENDPOINT);

const socket = ioClient('https://quilled-handsomely-botany.glitch.me');

export const io = socket;
