// @ts-nocheck
import { io } from 'socket.io-client';

const ENDPOINT = import.meta.env.VITE_UNSECURE_SECRET;

export const socket = io('https://bigtwo.pages.dev:8443', { transports: ['websocket', 'polling', 'flashsocket'] });

//export const io = socket;
