import ioClient from 'socket.io-client';

const ENDPOINT = import.meta.env.VITE_UNSECURE_SECRET;

const socket = ioClient('https://bigtwo.pages.dev:8443');

export const io = socket;
