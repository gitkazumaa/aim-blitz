import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import { resolve } from "path"

// https://vitejs.dev/config/
export default defineConfig({
	base: "/aim-blitz/",
	plugins: [react()],
	resolve: {
		alias: {
			"@": resolve(__dirname, "./src"),
		},
	},
	server: {
		proxy: {
			"/api": {
				target: "http://localhost:4000",
			},
		},
	},
})
