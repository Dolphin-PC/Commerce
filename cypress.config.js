import { defineConfig } from "cypress";
var baseUrl = "http://localhost:5173";
export default defineConfig({
    e2e: {
        baseUrl: baseUrl,
        viewportWidth: 1440,
        viewportHeight: 1000,
    },
});
