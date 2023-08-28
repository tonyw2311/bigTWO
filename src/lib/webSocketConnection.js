import ioClient from 'socket.io-client';

const ENDPOINT = import.meta.env.VITE_UNSECURE_SECRET;

const socket = ioClient('wss://bigtwo.pages.dev:8443', { transports: ['websocket', 'polling', 'flashsocket'] });

export const io = socket;
