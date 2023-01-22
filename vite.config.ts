import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
const pkg = require('./package.json');

const config: UserConfig = {
	base: "/duo-bypass/",
	plugins: [sveltekit()],
  ssr: {
    noExternal: Object.keys(pkg.dependencies || {})
  },
};

export default config;
