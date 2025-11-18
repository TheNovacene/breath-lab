import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/breath-lab/", // important for GitHub Pages: /<repo-name>/
});
