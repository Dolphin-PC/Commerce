import { defineConfig } from "cypress";

const baseUrl = "http://localhost:5173";

export default defineConfig({
  e2e: {
    baseUrl,
    viewportWidth: 1440,
    viewportHeight: 1000,
  },
});
