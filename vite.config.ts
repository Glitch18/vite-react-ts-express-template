import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const serverPort = process.env.PORT ? +process.env.PORT : 8080;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: `http://localhost:${serverPort}`,
        changeOrigin: true,
      },
    },
    host: '0.0.0.0', // Listen on all network interfaces. Delete these two line if running on local. Only required for dev
    port: 5173,
  },
});