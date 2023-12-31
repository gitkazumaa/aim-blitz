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
				target: "https://aim-blitz-server.onrender.com/api",
				changeOrigin: true,
				rewrite: path => path.replace(/^\/api/, "/aim-blitz/api"),
			},
		},
	},
})
