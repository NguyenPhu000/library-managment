import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    server: {
      host: "localhost",
      port: env.VITE_PORT || 5137,
      strictPort: true,
      proxy: {
        "/api": {
          target: "http://localhost:8081",
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
