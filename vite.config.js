import { sveltekit } from '@sveltejs/kit/vite';
import { webSocketServer } from './webSocket.js';

/** @type {import('vite').UserConfig} */
const config = {
	server: {
		port: 8443
	},
	preview: {
		port: 8443
	},
	plugins: [sveltekit(), webSocketServer]
};
export default config