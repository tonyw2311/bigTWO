import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	kit: {
		adapter: adapter()
	}
};

export default config;

/* import adapter from '@sveltejs/adapter-node';
import injectSocketIO from './socketIoHandler.js';

// @type {import('@sveltejs/kit').Config} 
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors

	kit: {
		adapter: adapter()
	},

	vite: {
		plugins: [
			{
				name: "sveltekit-socket-io",
				configureServer(server) {
					injectSocketIO(server.httpServer); // <- call the function here
				}
			}
		]
	}
};

export default config;
 */