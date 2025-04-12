import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
  base: "/test_wasm/", // GitHub Pages 배포 경로에 맞게 설정
  plugins: [solid()],
});
