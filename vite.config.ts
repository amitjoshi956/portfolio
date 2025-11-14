import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const resolvedPath = (p: string) => path.resolve(__dirname, p);

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  resolve: {
    alias: {
      "@assets": resolvedPath("./src/assets"),
      "@components": resolvedPath("./src/components"),
      "@pages": resolvedPath("./src/pages"),
      "@config": resolvedPath("./src/config"),
      "@base": resolvedPath("./src/base"),
    },
  },
  server: {
    port: 3001,
  },
});
