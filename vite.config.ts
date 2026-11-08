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
      "@api": resolvedPath("./src/api"),
      "@controllers": resolvedPath("./src/controllers"),
      "@features": resolvedPath("./src/features"),
      "@widgets": resolvedPath("./src/widgets"),
      "@assets": resolvedPath("./src/assets"),
      "@components": resolvedPath("./src/components"),
      "@config": resolvedPath("./src/config"),
      "@common": resolvedPath("./src/common"),
    },
  },
  server: {
    port: 3001,
  },
});
